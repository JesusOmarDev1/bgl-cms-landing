import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

// Types for better type safety
interface ExtractedContent {
  content: any
  heroImage: any
  publishedAt: string | Date | null
  brand?: string | null
  model?: string | null
  stock?: string | null
}

interface PopulatedCategory {
  id: string | number
  title: string
}

interface RichTextNode {
  children?: RichTextNode[]
  text?: string
  type?: string
}

interface RichTextRoot {
  root?: {
    children?: RichTextNode[]
  }
}

// Constants moved outside function for better performance
const FIELD_MAPPINGS = {
  content: ['content', 'description', 'bio', 'summary', 'excerpt', 'brand', 'model', 'stock'],
  image: ['heroImage', 'image', 'logo', 'thumbnail', 'photo'],
  date: ['publishedAt', 'createdAt', 'updatedAt', 'date'],
} as const

// Cache for category lookups to reduce database queries
const categoryCache = new Map<string | number, PopulatedCategory | null>()

// Optimized text extraction with memoization
const extractTextFromRichText = (() => {
  const cache = new WeakMap<RichTextRoot, string>()

  return function (richText: RichTextRoot): string {
    if (!richText?.root?.children) return ''

    // Check cache first
    if (cache.has(richText)) {
      return cache.get(richText)!
    }

    const extractText = (nodes: RichTextNode[]): string => {
      return nodes
        .map((node) => {
          if (node.children?.length) {
            return extractText(node.children)
          }
          return node.text || ''
        })
        .join('')
    }

    const result = extractText(richText.root.children).trim()
    cache.set(richText, result)
    return result
  }
})()

// Optimized field finder with early return
const findFieldValue = (doc: any, fields: readonly string[]): any => {
  for (const field of fields) {
    const value = doc[field]
    if (value !== undefined && value !== null) {
      return value
    }
  }
  return null
}

// Create structured content helper
const createStructuredContent = (text: string) => ({
  root: {
    children: [
      {
        children: [{ text, type: 'text' }],
        type: 'paragraph',
      },
    ],
    type: 'root',
  },
})

// Optimized content extraction
const extractContent = (doc: any, collection: string): ExtractedContent => {
  // Special handling for products collection
  if (collection === 'products' && doc.hero?.richText) {
    const combinedText = extractTextFromRichText(doc.hero)

    return {
      content: combinedText ? createStructuredContent(combinedText) : null,
      heroImage: null,
      publishedAt: doc.publishedAt || doc.createdAt,
      brand: doc.brand || null,
      model: doc.model || null,
      stock: doc.stock || null,
    }
  }

  // Generic field extraction for other collections
  return {
    content: findFieldValue(doc, FIELD_MAPPINGS.content),
    heroImage: findFieldValue(doc, FIELD_MAPPINGS.image),
    publishedAt: findFieldValue(doc, FIELD_MAPPINGS.date),
  }
}

// Optimized category population with caching and batch processing
const populateCategories = async (categories: any[], req: any): Promise<PopulatedCategory[]> => {
  if (!categories?.length) return []

  const result: PopulatedCategory[] = []
  const uncachedIds: (string | number)[] = []

  // First pass: collect already populated categories and identify uncached IDs
  for (const category of categories) {
    if (!category) continue

    if (typeof category === 'object' && category.id && category.title) {
      result.push(category)
      continue
    }

    const id = typeof category === 'object' ? category.id : category
    if (categoryCache.has(id)) {
      const cached = categoryCache.get(id)
      if (cached) result.push(cached)
    } else {
      uncachedIds.push(id)
    }
  }

  // Batch fetch uncached categories
  if (uncachedIds.length > 0) {
    try {
      const docs = await req.payload.find({
        collection: 'categories',
        where: {
          id: { in: uncachedIds },
        },
        limit: uncachedIds.length,
        depth: 0,
        select: { id: true, title: true },
        req,
      })

      // Cache results and add to result
      for (const doc of docs.docs) {
        const category = { id: doc.id, title: doc.title }
        categoryCache.set(doc.id, category)
        result.push(category)
      }

      // Cache null results for missing categories
      const foundIds = new Set(docs.docs.map((doc: any) => doc.id))
      for (const id of uncachedIds) {
        if (!foundIds.has(id)) {
          categoryCache.set(id, null)
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return result
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, categories, title, meta } = originalDoc

  // Extract content based on collection type
  const extractedContent = extractContent(originalDoc, collection)

  // Build base document
  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    ...extractedContent,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  // Populate categories efficiently
  if (categories?.length > 0) {
    const populatedCategories = await populateCategories(categories, req)
    modifiedDoc.categories = populatedCategories.map((category) => ({
      relationTo: 'categories',
      categoryID: String(category.id),
      title: category.title,
    }))
  }

  return modifiedDoc
}

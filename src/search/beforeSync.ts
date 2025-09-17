import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  // Dynamic content extraction function
  const extractContent = (doc: any, collection: string) => {
    // Define possible field names for different content types
    const contentFields = ['content', 'description', 'bio', 'summary', 'excerpt']
    const imageFields = ['heroImage', 'image', 'logo', 'thumbnail', 'photo']
    const dateFields = ['publishedAt', 'createdAt', 'updatedAt', 'date']

    // Special handling for pages collection with complex layout
    if (collection === 'products' && doc.hero) {
      const hero = doc.hero

      let combinedText = ''
      let heroImage: any = null

      // Extract text from hero
      if (hero?.richText) {
        combinedText += extractTextFromRichText(hero.richText) + ' '
      }

      // Create structured content if we have text
      const content = combinedText.trim()
        ? {
            root: {
              children: [
                {
                  children: [
                    {
                      text: combinedText.trim(),
                      type: 'text',
                    },
                  ],
                  type: 'paragraph',
                },
              ],
              type: 'root',
            },
          }
        : null

      return {
        content,
        heroImage,
        publishedAt: doc.publishedAt || doc.createdAt,
      }
    }

    // Dynamic field extraction for any collection
    const findField = (fields: string[]) => {
      for (const field of fields) {
        if (doc[field] !== undefined && doc[field] !== null) {
          return doc[field]
        }
      }
      return null
    }

    return {
      content: findField(contentFields),
      heroImage: findField(imageFields),
      publishedAt: findField(dateFields),
    }
  }

  // Helper function to extract text from rich text structure
  function extractTextFromRichText(richText: any): string {
    if (!richText || !richText.root || !richText.root.children) return ''

    return richText.root.children
      .map((child: any) => {
        if (child.children && Array.isArray(child.children)) {
          return child.children.map((grandchild: any) => grandchild.text || '').join('')
        }
        return child.text || ''
      })
      .join(' ')
      .trim()
  }

  // Extract content based on collection type
  const { content, heroImage, publishedAt } = extractContent(originalDoc, collection)

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    content,
    heroImage,
    publishedAt,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}

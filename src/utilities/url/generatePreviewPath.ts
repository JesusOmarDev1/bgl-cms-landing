/**
 * Generate preview paths for different collections
 */
import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  products: '/products',
  services: '/services',
  manuals: '/manuals',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

/**
 * Generate a preview path for a given collection and slug
 * @param collection - The collection name
 * @param slug - The document slug
 * @returns The preview URL
 */
export const generatePreviewPath = ({ collection, slug }: Props): string => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}

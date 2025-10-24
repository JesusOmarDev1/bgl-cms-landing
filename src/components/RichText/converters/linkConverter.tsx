import { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import { LinkJSXConverter } from '@payloadcms/richtext-lexical/react'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!

  if (typeof value !== 'object') {
    throw new Error('Valor esperado para ser un objeto')
  }

  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

export const linkConverter = LinkJSXConverter({ internalDocToHref })

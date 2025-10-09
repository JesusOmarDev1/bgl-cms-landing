import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Manual } from '../../../payload-types'

export const revalidateManual: CollectionAfterChangeHook<Manual> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/manuals/${doc.slug}`

      payload.logger.info(`Revalidando manual: ${path}`)

      revalidatePath(path)
      revalidateTag('manuals-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/manuals/${previousDoc.slug}`

      payload.logger.info(`Revalidando manual antiguo: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('manuals-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Manual> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/manuals/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('manuals-sitemap')
  }

  return doc
}

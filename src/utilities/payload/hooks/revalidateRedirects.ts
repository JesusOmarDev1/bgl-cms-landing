import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

/**
 * Hook to revalidate redirects cache after changes
 */
export const revalidateRedirects: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  revalidateTag('redirects')

  return doc
}

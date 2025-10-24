import type { Metadata } from 'next'
import { getServerSideURL } from '../url'
import { APP_DESCRIPTION, APP_NAME } from '../config/app'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: APP_DESCRIPTION,
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
      width: 1200,
      height: 630,
    },
    {
      url: `${getServerSideURL()}/website-template-OG.png`,
      width: 1200,
      height: 630,
    },
  ],
  siteName: APP_NAME,
  title: APP_NAME,
}

/**
 * Merge custom OpenGraph data with defaults
 * @param og - Custom OpenGraph data
 * @returns Merged OpenGraph configuration
 */
export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

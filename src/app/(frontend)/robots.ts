import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const url = getServerSideURL()
  return {
    rules: [
      {
        userAgent: 'GoogleBot',
        allow: '/',
        disallow: ['/admin', '/api', '/graphql'],
      },
      {
        userAgent: ['AhrefsBot', 'BingBot'],
        disallow: ['/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/_next', '/graphql'],
      },
    ],
    sitemap: [
      `${url}/sitemap.xml`,
      `${url}/pages-sitemap.xml`,
      `${url}/posts-sitemap.xml`,
      `${url}/products-sitemap.xml`,
      `${url}/services-sitemap.xml`,
      `${url}/manuals-sitemap.xml`,
    ],
  }
}

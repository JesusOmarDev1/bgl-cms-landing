import type { Config } from 'payload'
import { APP_DESCRIPTION, APP_SHORT_NAME } from './app'

export const adminMetadata: NonNullable<NonNullable<Config['admin']>['meta']> = {
  title: 'Panel de Control',
  creator: 'BGL BASCULAS INDUSTRIALES',
  description: APP_DESCRIPTION,
  keywords: [],
  appleWebApp: {
    capable: true,
    title: APP_SHORT_NAME,
  },
  titleSuffix: ' | BGL BASCULAS INDUSTRIALES',
  applicationName: APP_SHORT_NAME,
  category: 'web application',
  generator: 'Next.js',
  icons: [
    // Light mode icons
    {
      url: '/favicon-light.ico',
      rel: 'icon',
      sizes: '32x32',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicon-light.svg',
      rel: 'icon',
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/favicon-light.png',
      rel: 'icon',
      sizes: 'any',
      media: '(prefers-color-scheme: light)',
    },
    // Dark mode icons
    {
      url: '/favicon-dark.ico',
      rel: 'icon',
      sizes: '32x32',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/favicon-dark.svg',
      rel: 'icon',
      type: 'image/svg+xml',
      media: '(prefers-color-scheme: dark)',
    },
    {
      url: '/favicon-dark.png',
      rel: 'icon',
      sizes: 'any',
      media: '(prefers-color-scheme: dark)',
    },
    // Apple touch icon
    {
      url: '/favicon-light.png',
      rel: 'apple-touch-icon',
      sizes: 'any',
    },
  ],
}

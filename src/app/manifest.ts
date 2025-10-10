import type { MetadataRoute } from 'next'
import { APP_NAME, APP_DESCRIPTION, APP_SHORT_NAME } from '@/utilities/app'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    orientation: 'natural',
    icons: [
      // Light mode icons
      {
        src: '/pwa/icon-192x192-light.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/icon-512x512-light.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // Dark mode icons
      {
        src: '/pwa/icon-192x192-dark.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/icon-512x512-dark.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      // Monochrome icon for dark mode themes
      {
        src: '/favicon-dark.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'monochrome',
      },
    ],
  }
}

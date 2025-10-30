import { withPayload } from '@payloadcms/next/withPayload'
import { createSecureHeaders } from 'next-secure-headers'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      'motion',
      'next-share',
      'qrcode',
      'media-chrome',
      'next-view-transitions',
      'gsap',
      'three',
      'next-share',
      'leaflet',
      'next-secure-headers',
    ],
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
    domains: ['*.r2.cloudflarestorage.com', '*.r2.dev'],
    unoptimized: isDev ? true : false,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Exclude Sharp from webpack processing
    webpackConfig.externals = webpackConfig.externals || []
    webpackConfig.externals.push('sharp')

    return webpackConfig
  },
  turbopack: {
    resolveExtensions: ['.cjs', '.js', '.mjs', '.ts', '.tsx'],
  },
  reactStrictMode: true,
  redirects,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          // Disable the global frameGuard to allow specific rules for /admin
          frameGuard: false,
          // More permissive CSP for development, stricter for production
          contentSecurityPolicy: isDev
            ? false
            : {
                directives: {
                  defaultSrc: ["'self'"],
                  styleSrc: ["'self'", "'unsafe-inline'"],
                  scriptSrc: [
                    "'self'",
                    "'unsafe-eval'", // Required for some libraries and dev tools
                    "'unsafe-inline'",
                    'https://cdn.jsdelivr.net',
                    'https://unpkg.com',
                    'https://esm.sh',
                    // Add specific domains for libraries that might need eval
                    'https://www.googletagmanager.com',
                    'https://www.google-analytics.com',
                    // Development specific - Next.js HMR and dev tools
                    ...(isDev
                      ? [
                          "'unsafe-eval'",
                          "'unsafe-inline'",
                          'http://localhost:*',
                          'ws://localhost:*',
                          'webpack://',
                          'data:',
                          'blob:',
                          // Allow eval for development debugging
                          "'wasm-unsafe-eval'",
                        ]
                      : []),
                  ],
                  imgSrc: [
                    "'self'",
                    'data:',
                    'https:',
                    'blob:',
                    'https://*.cloudflare.com',
                    'https://*.r2.cloudflarestorage.com',
                    'https://*.r2.dev',
                  ],
                  connectSrc: [
                    "'self'",
                    'https:',
                    'wss:',
                    'ws:',
                    // Development specific
                    ...(isDev
                      ? ['http://localhost:*', 'ws://localhost:*', 'wss://localhost:*']
                      : []),
                  ],
                  fontSrc: ["'self'", 'https:', 'data:'],
                  objectSrc: ["'none'"],
                  mediaSrc: [
                    "'self'",
                    'https://*.r2.cloudflarestorage.com',
                    'https://*.r2.dev',
                    'blob:',
                    'data:',
                  ],
                  workerSrc: ["'self'", 'blob:'],
                  childSrc: ["'self'", 'blob:'],
                  frameSrc: ["'self'", 'blob:', 'data:'],
                  formAction: ["'self'"],
                },
              },

          xssProtection: 'sanitize',
          referrerPolicy: 'strict-origin-when-cross-origin',
          xContentTypeOptions: 'nosniff',
          strictTransportSecurity: isDev ? false : 'max-age=31536000; includeSubDomains; preload',
          permissionsPolicy: {
            camera: [],
            microphone: [],
            geolocation: [],
            payment: [],
            usb: [],
          },
          crossOriginEmbedderPolicy: false,
          crossOriginOpenerPolicy: 'same-origin',
          crossOriginResourcePolicy: 'same-origin',
        }),
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

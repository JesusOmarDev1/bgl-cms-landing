import { withPayload } from '@payloadcms/next/withPayload'
import { createSecureHeaders } from 'next-secure-headers'
import { isProd } from '@/utilities/payload/isProd'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

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
    unoptimized: isProd ? false : true,
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
          contentSecurityPolicy: isProd
            ? {
                directives: {
                  defaultSrc: ["'self'"],
                  styleSrc: ["'self'", "'unsafe-inline'"],
                  scriptSrc: [
                    "'self'",
                    'https://cdn.jsdelivr.net',
                    'https://unpkg.com',
                    'https://maps.googleapis.com',
                    'https://www.googletagmanager.com',
                    'https://www.google-analytics.com',
                  ],
                  imgSrc: [
                    "'self'",
                    'data:',
                    'https:',
                    'blob:',
                    'https://*.cloudflare.com',
                    'https://*.r2.cloudflarestorage.com',
                    'https://*.r2.dev',
                    'https://*.tile.openstreetmap.org',
                    'https://maps.googleapis.com',
                    'https://maps.gstatic.com',
                  ],
                  connectSrc: ["'self'", 'https:', 'wss:', 'https://maps.googleapis.com'],
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
              }
            : {
                directives: {
                  defaultSrc: ["'self'"],
                  styleSrc: ["'self'", "'unsafe-inline'"],
                  scriptSrc: [
                    "'self'",
                    "'unsafe-eval'", // Required for development tools
                    "'unsafe-inline'",
                    'https://cdn.jsdelivr.net',
                    'https://unpkg.com',
                    'https://esm.sh',
                    'https://maps.googleapis.com',
                    'https://www.googletagmanager.com',
                    'https://www.google-analytics.com',
                    'http://localhost:*',
                    'ws://localhost:*',
                    'webpack://',
                    'data:',
                    'blob:',
                    "'wasm-unsafe-eval'",
                  ],
                  imgSrc: [
                    "'self'",
                    'data:',
                    'https:',
                    'blob:',
                    'https://*.cloudflare.com',
                    'https://*.r2.cloudflarestorage.com',
                    'https://*.r2.dev',
                    'https://*.tile.openstreetmap.org',
                    'https://maps.googleapis.com',
                    'https://maps.gstatic.com',
                  ],
                  connectSrc: [
                    "'self'",
                    'https:',
                    'wss:',
                    'ws:',
                    'http://localhost:*',
                    'ws://localhost:*',
                    'wss://localhost:*',
                    'https://maps.googleapis.com',
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
          strictTransportSecurity: !isProd ? false : 'max-age=31536000; includeSubDomains; preload',
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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'bgl-basculas-industriales',
  project: 'bgl-cms-landing',

  // Only print logs for uploading source maps in production and CI
  silent: !isProd && !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Keep Sentry logger statements in production for monitoring
  disableLogger: !isProd,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false,
})

import { withPayload } from '@payloadcms/next/withPayload'
import { createSecureHeaders } from 'next-secure-headers'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    domains: ['*.r2.cloudflarestorage.com', '*.r2.dev'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

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
          // Keep your other existing security policies here
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              scriptSrc: [
                "'self'",
                "'unsafe-eval'",
                "'unsafe-inline'",
                'https://cdn.jsdelivr.net',
                'https://unpkg.com',
                'https://esm.sh',
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
              connectSrc: ["'self'", 'https:', 'wss:'],
              fontSrc: ["'self'", 'https:', 'data:'],
              objectSrc: ["'none'"],
              mediaSrc: ["'self'"],
              workerSrc: ["'self'", 'blob:'],
              childSrc: ["'self'", 'blob:'],
              frameSrc: [
                "'self'",
                'https://www.youtube.com',
                'https://youtube.com',
                'https://.r2.cloudflarestorage.com',
                'https://.r2.dev',
              ],
              formAction: ["'self'"],
              upgradeInsecureRequests: [],
            },
          },

          xssProtection: 'sanitize',
          referrerPolicy: 'strict-origin-when-cross-origin',
          xContentTypeOptions: 'nosniff',
          strictTransportSecurity: 'max-age=31536000; includeSubDomains; preload',
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
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; img-src 'self' data: https: blob: https://*.cloudflare.com https://*.r2.cloudflarestorage.com https://*.r2.dev; connect-src 'self' https: wss:; font-src 'self' https: data:; worker-src 'self' blob:; child-src 'self' blob:; object-src 'none'; media-src 'self'; frame-src 'self' https://www.youtube.com https://youtube.com; form-action 'self'; upgrade-insecure-requests;",
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

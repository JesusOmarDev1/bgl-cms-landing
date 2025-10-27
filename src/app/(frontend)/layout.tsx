import type { Metadata } from 'next'

import React from 'react'

import { Header } from '@/globals/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { ViewTransitions } from 'next-view-transitions'
import '@/styles/globals.css'

import { Chatbot } from '@/globals/Chatbot'
import { Footer } from '@/globals/Footer'
import { Coupons } from '@/globals/Coupons'
import { getServerSideURL } from '@/utilities/url/utils'
import { mergeOpenGraph } from '@/utilities/meta/mergeOpenGraph'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="es-MX" suppressHydrationWarning>
        <head>
          <InitTheme />
          <link
            href="/favicon-light.ico"
            rel="icon"
            sizes="32x32"
            media="(prefers-color-scheme: light)"
          />
          <link
            href="/favicon-light.svg"
            rel="icon"
            type="image/svg+xml"
            media="(prefers-color-scheme: light)"
          />
          <link
            href="favicon-light.png"
            rel="icon"
            sizes="any"
            media="(prefers-color-scheme: light)"
          />
          <link
            href="/favicon-dark.ico"
            rel="icon"
            sizes="32x32"
            media="(prefers-color-scheme: dark)"
          />
          <link
            href="/favicon-dark.svg"
            rel="icon"
            type="image/svg+xml"
            media="(prefers-color-scheme: dark)"
          />
          <link
            href="favicon-dark.png"
            rel="icon"
            sizes="any"
            media="(prefers-color-scheme: dark)"
          />
        </head>
        <body>
          <Providers>
            <Header />
            <div className="mt-36">{children}</div>
            <Chatbot />
            <Coupons />
            <Footer />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: 'BGL BASCULAS INDUSTRIALES',
  },
}

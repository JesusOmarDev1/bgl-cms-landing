import type { Metadata } from 'next'

import React from 'react'

import { Header } from '@/globals/Header'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { ViewTransitions } from 'next-view-transitions'
import { getServerSideURL } from '@/utilities/getURL'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ChatbotWrapper } from '@/globals/Chatbot/ChatbotWidget/ChatbotWrapper'
import { Footer } from '@/globals/Footer'
import { Coupons } from '@/globals/Coupons'
import { Announcements } from '@/globals/Announcements'

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
            <Announcements />
            <Toaster position="bottom-right" richColors closeButton />
            <div className="mt-24">{children}</div>
            <ChatbotWrapper />
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

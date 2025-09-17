import type { Metadata } from 'next'

import React from 'react'

import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { ViewTransitions } from 'next-view-transitions'
import { getServerSideURL } from '@/utilities/getURL'
import '@/styles/globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="es-MX" suppressHydrationWarning>
        <head>
          <InitTheme />
          <link href="/favicon.ico" rel="icon" sizes="32x32" />
          <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        </head>
        <body>
          <Providers>
            <Header />
            <div className="mt-24">{children}</div>
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

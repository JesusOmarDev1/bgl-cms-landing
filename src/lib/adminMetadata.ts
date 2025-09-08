import type { Config } from 'payload'

export const adminMetadata: NonNullable<NonNullable<Config['admin']>['meta']> = {
  title: 'Panel de Control',
  creator: 'BGL BASCULAS INDUSTRIALES',
  description:
    'Sistema de gestión de contenidos (CMS) corporativo desarrollado específicamente para BGL BASCULAS INDUSTRIALES, empresa líder en soluciones de pesaje industrial y básculas de alta precisión.',
  keywords: [],
  appleWebApp: {
    capable: true,
    title: 'CMS',
  },
  titleSuffix: ' - BGL BASCULAS INDUSTRIALES',
  applicationName: 'BGL BASCULAS INDUSTRIALES',
  category: 'web application',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

import type { Metadata } from 'next'

interface Props {
  title: string
}

export default function generalMetadata({ title }: Props): Metadata {
  return {
    title: {
      absolute: title,
      default: 'BGL BASCULAS INDUSTRIALES',
      template: '%s | BGL BASCULAS INDUSTRIALES',
    },
    creator: 'BGL BASCULAS INDUSTRIALES',
    description:
      '¿Problemas con tu báscula? Servicio técnico especializado, rápido y confiable. Venta, renta e instalación.',
    keywords: [
      'básculas industriales',
      'báscula industrial',
      'basculas comerciales',
      'basculas industriales precio',
      'venta de básculas industriales',
      'báscula camionera',
      'báscula para montacargas',
      'calibración de básculas',
      'calibración acreditada básculas',
      'certificación de básculas',
      'verificación de básculas',
      'holograma PROFECO básculas',
      'norma NOM 010 SCFI básculas',
      'báscula de grúa',
      'báscula de piso industrial',
      'báscula ganadera',
      'báscula para ganado',
      'báscula de tolva',
      'báscula ferrocarrilera',
      'báscula portátil industrial',
      'báscula de acero inoxidable',
      'báscula etiquetadora',
      'báscula para almacén',
      'báscula para consultorio médico',
      'báscula para carro revolvedor',
      'báscula de patín hidráulico',
      'sistema de pesaje industrial',
      'pesas patrón para básculas',
      'marco de precisión para basculas',
      'ISO 9001 básculas industriales',
      'certificación OEMA básculas',
      'normativa mexicana básculas',
      'básculas industriales CDMX',
      'calibración de básculas Estado de México',
      'venta de básculas industriales Guadalajara',
      'básculas industriales Monterrey',
      'basculas para puebla',
    ],
    appleWebApp: {
      capable: true,
      title: 'BGL BASCULAS INDUSTRIALES',
    },
    applicationName: 'BGL BASCULAS INDUSTRIALES',
    category: 'web application',
    generator: 'Next.js',
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-touch-icon.png',
    },
  }
}

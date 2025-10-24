import type { Field } from 'payload'

export const sidebarFields: Field[] = [
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
    },
    label: {
      en: 'Published Date',
      es: 'Fecha de Publicación',
    },
  },
]

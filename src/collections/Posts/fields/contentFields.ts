import type { Field } from 'payload'

export const contentFields: Field[] = [
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: {
      en: 'Hero Image',
      es: 'Imagen de Portada',
    },
    required: true,
  },
  {
    name: 'content',
    type: 'richText',
    label: {
      en: 'Content',
      es: 'Contenido',
    },
    required: true,
  },
]

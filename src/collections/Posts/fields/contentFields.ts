import type { Field } from 'payload'
import { contentLexicalEditor } from '@/fields/contentLexical'

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
    editor: contentLexicalEditor,
    label: {
      en: 'Content',
      es: 'Contenido',
    },
    required: true,
  },
]

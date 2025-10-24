import type { Field } from 'payload'
import { contentLexicalEditor } from '@/fields/contentLexical'

export const generalFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    label: {
      en: 'Title',
      es: 'Título',
    },
  },
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
    name: 'relatedServices',
    type: 'relationship',
    label: {
      en: 'Related Services',
      es: 'Servicios Relacionados',
    },
    admin: {
      position: 'sidebar',
    },
    filterOptions: ({ id }) => {
      return {
        id: {
          not_in: [id],
        },
      }
    },
    hasMany: true,
    relationTo: 'services',
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

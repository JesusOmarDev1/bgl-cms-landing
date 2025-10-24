import type { Field } from 'payload'
import { contentLexicalEditor } from '@/fields/contentLexical'

export const generalFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    label: {
      en: 'Title',
      es: 'Título',
    },
    required: true,
  },
  {
    name: 'companyName',
    type: 'text',
    label: {
      en: 'Company Name',
      es: 'Razón Social',
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
  },
  {
    name: 'brands',
    type: 'relationship',
    relationTo: 'brands',
    label: {
      en: 'Brands',
      es: 'Marcas',
    },
    hasMany: true,
  },
  {
    name: 'content',
    type: 'richText',
    editor: contentLexicalEditor,
    label: {
      en: 'Content',
      es: 'Contenido',
    },
  },
]

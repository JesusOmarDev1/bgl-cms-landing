import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Tags: CollectionConfig = {
  slug: 'tags',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Tag',
      es: 'Etiqueta',
    },
    plural: {
      en: 'Tags',
      es: 'Etiquetas',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'createdAt'],
    description: 'Administra las etiquetas del sitio: crea, edita y elimina etiquetas',
  },
  fields: [
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
      name: 'subtags',
      type: 'array',
      label: {
        en: 'Subtags',
        es: 'Subetiquetas',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Title',
            es: 'Título',
          },
          required: true,
        },
      ],
    },
    ...slugField(),
  ],
}

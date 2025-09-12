import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Categories: CollectionConfig = {
  slug: 'categories',
  trash: true,
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Category',
      es: 'Categoría',
    },
    plural: {
      en: 'Categories',
      es: 'Categorías',
    },
  },
  defaultPopulate: {
    title: true,
    subcategories: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'createdAt'],
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
      name: 'subcategories',
      type: 'array',
      label: {
        en: 'Subcategories',
        es: 'Subcategorías',
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

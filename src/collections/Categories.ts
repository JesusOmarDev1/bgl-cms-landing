import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
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
  admin: {
    useAsTitle: 'title',
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
    ...slugField(),
  ],
}

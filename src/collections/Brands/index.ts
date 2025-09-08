import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Brands: CollectionConfig = {
  slug: 'brands',
  trash: true,
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Brand',
      es: 'Marca',
    },
    plural: {
      en: 'Brands',
      es: 'Marcas',
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

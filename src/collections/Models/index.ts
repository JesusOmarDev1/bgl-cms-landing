import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Models: CollectionConfig = {
  slug: 'models',
  trash: true,
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Model',
      es: 'Modelo',
    },
    plural: {
      en: 'Models',
      es: 'Modelos',
    },
  },
  admin: {
    useAsTitle: 'title',
    group: 'Utilidades',
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
      name: 'brand',
      type: 'relationship',
      label: {
        en: 'Brand',
        es: 'Marca',
      },
      relationTo: 'brands',
      required: true,
    },
    ...slugField(),
  ],
}

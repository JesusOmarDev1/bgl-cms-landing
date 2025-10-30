import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { isAdminOrEditorOrTechnician } from '@/access/isAdminOrEditorOrTechnician'

export const Models: CollectionConfig = {
  slug: 'models',
  trash: true,
  indexes: [
    // Index for brand-based filtering (most critical - used in Products collection)
    {
      fields: ['brand'],
    },
    // Compound index for brand and title (filtering models by brand and sorting)
    {
      fields: ['brand', 'title'],
    },
    // Index for model lookups by title (used in admin UI and search)
    {
      fields: ['title'],
    },
    // Index for slug-based queries (for potential model pages)
    {
      fields: ['slug'],
    },
    // Compound index for sorting and filtering by creation date
    {
      fields: ['createdAt', 'title'],
    },
    // Index for trash functionality (deletedAt field from trash: true)
    {
      fields: ['deletedAt', 'title'],
    },
    // Compound index for brand and slug (hierarchical URL structure)
    {
      fields: ['brand', 'slug'],
    },
  ],
  access: {
    read: anyone,
    create: isAdminOrEditorOrTechnician,
    update: isAdminOrEditorOrTechnician,
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

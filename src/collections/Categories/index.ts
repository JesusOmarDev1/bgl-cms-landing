import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { colorPickerField } from '@/fields/colorPicker'
import { isAdminOrEditorOrTechnician } from '@/access/isAdminOrEditorOrTechnician'

export const Categories: CollectionConfig = {
  slug: 'categories',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
    // Index for category lookups by title (used in admin UI and search)
    {
      fields: ['title'],
    },
    // Index for slug-based queries (for category pages)
    {
      fields: ['slug'],
    },
    // Index for hierarchical queries (parent-child relationships)
    {
      fields: ['parent'],
    },
    // Compound index for sorting and filtering by creation date
    {
      fields: ['createdAt', 'title'],
    },
    // Index for trash functionality (deletedAt field from trash: true)
    {
      fields: ['deletedAt', 'title'],
    },
    // Compound index for hierarchical sorting (parent categories first, then by title)
    {
      fields: ['parent', 'title'],
    },
  ],
  defaultSort: 'createdAt',
  access: {
    read: anyone,
    create: isAdminOrEditorOrTechnician,
    update: isAdminOrEditorOrTechnician,
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
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'parent', 'createdAt'],
    useAsTitle: 'title',
    description: 'Administra las categorías del sitio: crea, edita y elimina categorías',
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
    colorPickerField({
      name: 'brandColor',
      label: {
        en: 'Brand Color',
        es: 'Color de Marca',
      },
      defaultValue: '#000000',
      admin: {
        description: 'Color principal de la marca para elementos destacados y temas',
      },
    }),
    ...slugField(),
  ],
}

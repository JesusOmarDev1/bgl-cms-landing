import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { colorPickerField } from '@/fields/colorPicker'

export const Categories: CollectionConfig = {
  slug: 'categories',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  defaultSort: 'createdAt',
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

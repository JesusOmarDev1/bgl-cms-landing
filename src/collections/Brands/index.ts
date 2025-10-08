import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Brands: CollectionConfig = {
  slug: 'brands',
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
  defaultPopulate: {
    title: true,
    slug: true,
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
    defaultColumns: ['title', 'slug', 'createdAt'],
    description: 'Administra las marcas del sitio: crea, edita y elimina marcas',
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
      name: 'heroImage',
      label: {
        en: 'Hero Image',
        es: 'Imagen de Portada',
      },
      admin: {
        description:
          'La imagen debe de tener la extension .svg para tener la mejor calidad posible',
      },
      type: 'upload',
      relationTo: 'media',
    },
    ...slugField(),
  ],
}

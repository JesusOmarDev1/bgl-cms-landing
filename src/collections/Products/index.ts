import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { MediaBlock } from '../../blocks/MediaBlock/config'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: {
      en: 'Product',
      es: 'Producto',
    },
    plural: {
      en: 'Products',
      es: 'Productos',
    },
  },
  defaultPopulate: {
    name: true,
    slug: true,
    price: true,
    tags: true,
  },
  admin: {
    defaultColumns: ['heroImage', 'name', 'price', 'tags', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
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
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: {
        en: 'Price (MXN)',
        es: 'Precio (MXN)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      localized: true,
      required: true,
      label: {
        en: 'Description',
        es: 'Descripción',
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

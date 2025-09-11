import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Media: CollectionConfig = {
  slug: 'media',
  trash: true,
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Media',
      es: 'Almacenamiento',
    },
    plural: {
      en: 'Media',
      es: 'Almacenamiento',
    },
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'caption', 'createdAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: {
        en: 'Alt Text',
        es: 'Texto Alternativo',
      },
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      label: {
        en: 'Caption',
        es: 'Subtítulo',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    adminThumbnail: 'small',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}

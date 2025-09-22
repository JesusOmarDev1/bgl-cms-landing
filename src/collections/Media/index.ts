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
  indexes: [
    {
      fields: ['alt'],
    },
  ],
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  labels: {
    singular: {
      en: 'Media',
      es: 'Archivo',
    },
    plural: {
      en: 'Media',
      es: 'Archivos',
    },
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'content', 'createdAt'],
    description: 'Administra los archivos del sitio: crea, edita y elimina archivos',
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
      name: 'content',
      type: 'richText',
      label: {
        en: 'Content',
        es: 'Contenido',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    displayPreview: true,
    formatOptions: {
      format: 'webp',
      options: {
        quality: 70,
        effort: 6,
        lossless: false,
        nearLossless: false,
        smartSubsample: true,
        alphaQuality: 100,
        force: true,
      },
    },
    imageSizes: [
      // Thumbnail - Small square for listings and grids
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        crop: 'center',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 70,
            effort: 6,
            force: true,
          },
        },
      },
      // Small - For mobile devices and small cards
      {
        name: 'small',
        width: 640,
        height: 360,
        crop: 'center',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 70,
            effort: 6,
            force: true,
          },
        },
      },
      // Medium - For medium-sized displays and cards
      {
        name: 'medium',
        width: 1024,
        height: 576,
        fit: 'inside',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 70,
            effort: 6,
            force: true,
          },
        },
      },
      // Large - For large displays and full-width content
      {
        name: 'large',
        width: 1600,
        height: 900,
        fit: 'inside',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 75,
            effort: 6,
            force: true,
          },
        },
      },
      // OG Image - Perfect for social sharing
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
        position: 'center',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 70,
            effort: 6,
            force: true,
          },
        },
      },
    ],
  },
}

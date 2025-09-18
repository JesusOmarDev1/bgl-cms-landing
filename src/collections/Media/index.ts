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
    mimeTypes: ['image/*', 'video/*'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    // Configuración global para convertir automáticamente a WebP
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
        effort: 4, // Mejor compresión (0-6, más alto = mejor compresión)
        lossless: false,
        nearLossless: false,
        smartSubsample: true, // Mejor calidad en bordes
        alphaQuality: 100, // Calidad del canal alpha
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
      },
      // Small - For mobile devices and small cards
      {
        name: 'small',
        width: 640,
        height: 360,
        crop: 'center',
        position: 'center',
      },
      // Medium - For medium-sized displays and cards
      {
        name: 'medium',
        width: 1024,
        height: 576,
        fit: 'inside',
        position: 'center',
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
            quality: 80,
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
      },
    ],
  },
}

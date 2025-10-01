import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { contentLexicalEditor } from '@/fields/contentLexical'

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
    group: 'Contenido',
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
      editor: contentLexicalEditor,
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'video/mp4'],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: false,
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

import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/url'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProducts'
import { validateProduct } from './hooks/validateProduct'
import { generalFields } from './fields/generalFields'
import { pricingFields } from './fields/pricingFields'
import { technicalDetailsFields } from './fields/technicalDetailsFields'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Products: CollectionConfig = {
  slug: 'products',
  trash: true,

  // 🚀 Performance: Indexes estratégicos optimizados
  indexes: [
    // Índices únicos y de búsqueda principal
    {
      fields: ['slug'],
      unique: true, // Slug debe ser único
    },

    // Índices compuestos para consultas comunes
    {
      fields: ['_status', 'publishedAt'], // Para listados de productos publicados ordenados
    },
    {
      fields: ['brand', 'type'], // Para filtros combinados marca + tipo
    },

    {
      fields: ['stock', '_status'], // Para productos en stock y publicados
    },

    // Índices para búsquedas y filtros específicos
    {
      fields: ['title'], // Para búsquedas por título (text search)
    },
    {
      fields: ['model'], // Para filtros por modelo
    },
    {
      fields: ['total'], // Para ordenamiento por precio
    },
    {
      fields: ['createdAt'], // Para ordenamiento por fecha de creación
    },

    // Índice para búsquedas de texto completo (si se usa)
    {
      fields: ['title'], // Para búsquedas por título
    },
  ],

  defaultSort: '-publishedAt', // Más recientes primero

  // 🔐 Access Control
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },

  // 🎯 Labels multiidioma
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

  // 🚀 Performance: DefaultPopulate optimizado
  defaultPopulate: {
    title: true,
    excerpt: true,
    slug: true,
    total: true,
    stock: true,
    heroImage: true,
    publishedAt: true,
    // Relaciones específicas
    brand: {
      title: true,
      heroImage: true,
    },
    model: {
      title: true,
    },
    categories: {
      title: true,
      slug: true,
    },
    // SEO básico
    meta: {
      title: true,
      description: true,
      image: true,
    },
  },

  // 🎨 Admin UI
  admin: {
    defaultColumns: ['heroImage', 'title', 'total', 'stock', 'categories', 'publishedAt'],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    livePreview: {
      url: ({ data, req: _req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
        })
        return path
      },
    },
    useAsTitle: 'title',
    description: 'Administra los productos del sitio: crea, edita y elimina artículos',
    group: 'Contenido',
  },

  // 📊 Fields organizados en tabs
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'General Information',
            es: 'Información General',
          },
          fields: generalFields,
        },
        {
          label: {
            en: 'Pricing',
            es: 'Precios',
          },
          fields: pricingFields,
        },
        {
          label: {
            en: 'Technical Details',
            es: 'Detalles Técnicos',
          },
          fields: technicalDetailsFields,
        },
        {
          name: 'meta',
          label: {
            en: 'SEO & Metadata',
            es: 'SEO y Metadatos',
          },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: {
                  en: 'Title for SEO',
                  es: 'Título para SEO',
                },
              },
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                label: {
                  en: 'Image for SEO',
                  es: 'Imagen para SEO',
                },
              },
            }),

            MetaDescriptionField({
              overrides: {
                label: {
                  en: 'Description for SEO',
                  es: 'Descripción para SEO',
                },
              },
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    // Campos del sidebar
    {
      name: 'publishedAt',
      label: {
        en: 'Published Date',
        es: 'Fecha de Publicación',
      },
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },

    ...slugField(),
  ],

  // 🔄 Hooks
  hooks: {
    beforeValidate: [validateProduct],
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDelete],
  },

  // 🔄 Versioning optimizado
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

import type { CollectionConfig } from 'payload'

import { revalidateDelete, revalidateManual } from './hooks/revalidateManuals'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { generatePreviewPath } from '@/utilities/url/generatePreviewPath'
import { isAdminOrEditorOrTechnician } from '@/access/isAdminOrEditorOrTechnician'

export const Manuals: CollectionConfig<'manuals'> = {
  slug: 'manuals',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
    // Index for manual lookups by title (used in admin UI and search)
    {
      fields: ['title'],
    },
    // Index for slug-based queries (for manual detail pages)
    {
      fields: ['slug'],
    },
    // Index for published status filtering (draft/published)
    {
      fields: ['_status'],
    },
    // Compound index for published manuals sorted by publication date
    {
      fields: ['_status', 'publishedAt'],
    },
    // Compound index for published manuals sorted by title
    {
      fields: ['_status', 'title'],
    },
    // Index for publication date sorting (chronological listing)
    {
      fields: ['publishedAt'],
    },
    // Compound index for sorting and filtering by creation date
    {
      fields: ['createdAt', 'title'],
    },
    // Index for trash functionality (deletedAt field from trash: true)
    {
      fields: ['deletedAt', 'title'],
    },
    // Compound index for sitemap generation (published manuals by update date)
    {
      fields: ['_status', 'updatedAt'],
    },
  ],
  labels: {
    singular: {
      en: 'Manual',
      es: 'Manual',
    },
    plural: {
      en: 'Manuals',
      es: 'Manuales',
    },
  },
  defaultSort: 'createdAt',
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditorOrTechnician,
    update: isAdminOrEditorOrTechnician,
    delete: isAdmin,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['heroImage', 'title', 'slug', 'updatedAt', 'publishedAt'],
    livePreview: {
      url: ({ data, req: _req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'manuals',
        })

        return path
      },
    },
    preview: (data, { req: _req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'manuals',
      }),
    useAsTitle: 'title',
    description: 'Administra las publicaciones del blog: crea, edita y elimina artículos',
    group: 'Contenido',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        es: 'Título',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Hero Image',
                es: 'Imagen de Portada',
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
              required: true,
            },
          ],
          label: {
            en: 'Manual Content',
            es: 'Contenido del Manual',
          },
        },
        {
          fields: [
            {
              name: 'relatedManuals',
              type: 'relationship',
              label: {
                en: 'Related Manuals',
                es: 'Manuales Relacionados',
              },
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'manuals',
            },
            {
              name: 'categories',
              type: 'relationship',
              label: {
                en: 'Categories',
                es: 'Categorías',
              },
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
          label: {
            en: 'Manual Details',
            es: 'Detalles del Manual',
          },
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
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
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
  hooks: {
    afterChange: [revalidateManual],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

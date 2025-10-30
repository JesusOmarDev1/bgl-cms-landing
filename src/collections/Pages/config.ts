import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/utilities/payload/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/url/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { layoutFields } from './fields/layoutFields'
import { sidebarFields } from './fields/sidebarFields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
    // Index for page lookups by title (used in admin UI and search)
    {
      fields: ['title'],
    },
    // Index for slug-based queries (critical for frontend routing)
    {
      fields: ['slug'],
    },
    // Index for published status filtering (draft/published)
    {
      fields: ['_status'],
    },
    // Compound index for published pages sorted by publication date
    {
      fields: ['_status', 'publishedAt'],
    },
    // Compound index for published pages sorted by title
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
    // Compound index for sitemap generation (published pages by update date)
    {
      fields: ['_status', 'updatedAt'],
    },
  ],
  defaultSort: 'createdAt',
  labels: {
    singular: {
      en: 'Page',
      es: 'Página',
    },
    plural: {
      en: 'Pages',
      es: 'Páginas',
    },
  },
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
    readVersions: isAdminOrEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt', 'publishedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return path
      },
    },
    preview: (data) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      }),
    useAsTitle: 'title',
    description: 'Administra las páginas del sitio: crea, edita y elimina páginas',
    group: 'Contenido',
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
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          label: {
            en: 'Content',
            es: 'Contenido',
          },
          fields: layoutFields,
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
    ...slugField(),
    ...sidebarFields,
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 300,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

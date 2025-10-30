import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '@/utilities/url/generatePreviewPath'
import { revalidateProduct, revalidateDelete } from '../Products/hooks/revalidateProducts'
import { generalFields } from './fields/generalFields'
import { pricingFields } from './fields/pricingFields'

export const Services: CollectionConfig = {
  slug: 'services',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
    // Index for service lookups by title (used in admin UI and search)
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
    // Compound index for published services sorted by publication date
    {
      fields: ['_status', 'publishedAt'],
    },
    // Compound index for published services sorted by title
    {
      fields: ['_status', 'title'],
    },
    // Index for publication date sorting (chronological listing)
    {
      fields: ['publishedAt'],
    },
    // Index for price-based sorting (service pricing)
    {
      fields: ['total'],
    },
    // Compound index for published services sorted by price
    {
      fields: ['_status', 'total'],
    },
    // Compound index for sorting and filtering by creation date
    {
      fields: ['createdAt', 'title'],
    },
    // Index for trash functionality (deletedAt field from trash: true)
    {
      fields: ['deletedAt', 'title'],
    },
    // Compound index for sitemap generation (published services by update date)
    {
      fields: ['_status', 'updatedAt'],
    },
  ],
  defaultSort: 'createdAt',
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  labels: {
    singular: {
      en: 'Service',
      es: 'Servicio',
    },
    plural: {
      en: 'Services',
      es: 'Servicios',
    },
  },
  defaultPopulate: {
    title: true,
    slug: true,
    total: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['heroImage', 'title', 'total', 'createdAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
        })

        return path
      },
    },
    useAsTitle: 'title',
    description: 'Administra los servicios del sitio: crea, edita y elimina servicios',
    group: 'Contenido',
  },
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
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField(),
    ...pricingFields,
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

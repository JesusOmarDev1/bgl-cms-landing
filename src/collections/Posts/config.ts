import type { CollectionConfig } from 'payload'

import { generatePreviewPath } from '@/utilities/url'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { contentFields } from './fields/contentFields'
import { relationshipFields } from './fields/relationshipFields'
import { sidebarFields } from './fields/sidebarFields'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  defaultSort: 'createdAt',
  labels: {
    singular: {
      en: 'Post',
      es: 'Publicación',
    },
    plural: {
      en: 'Posts',
      es: 'Publicaciones',
    },
  },
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
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
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
        })

        return path
      },
    },
    preview: (data) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
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
          fields: contentFields,
          label: {
            en: 'Post Content',
            es: 'Contenido de la Publicación',
          },
        },
        {
          fields: relationshipFields,
          label: {
            en: 'Post Details',
            es: 'Detalles de la Publicación',
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
              hasGenerateFn: true,
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
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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

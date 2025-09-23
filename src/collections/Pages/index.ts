import type { CollectionConfig } from 'payload'

import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
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
import { FAQ } from '@/blocks/FAQ/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
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
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
    description: 'Administra las páginas del sitio: crea, edita y elimina páginas',
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
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, FAQ],
              required: true,
              label: {
                en: 'Layout',
                es: 'Diseño de Página',
              },
            },
          ],
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
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Published Date',
        es: 'Fecha de Publicación',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
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

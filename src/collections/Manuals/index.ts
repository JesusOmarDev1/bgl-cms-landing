import type { CollectionConfig } from 'payload'

import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidateManual } from './hooks/revalidateManuals'

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
import { contentLexicalEditor } from '@/fields/contentLexical'

export const Manuals: CollectionConfig<'manuals'> = {
  slug: 'manuals',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  defaultSort: 'createdAt',
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
              editor: contentLexicalEditor,
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
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  TextStateFeature,
  UnorderedListFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
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
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
    description: 'Administra las publicaciones del blog: crea, edita y elimina artículos',
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
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    AlignFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                    HorizontalRuleFeature(),
                    InlineToolbarFeature(),
                    TextStateFeature({
                      state: {
                        color: {
                          'bg-red': {
                            css: {
                              'background-color': 'red',
                              color: 'white',
                            },
                            label: 'Rojo',
                          },
                          'bg-orange': {
                            css: {
                              'background-color': 'orange',
                              color: 'white',
                            },
                            label: 'Naranja',
                          },
                          'bg-yellow': {
                            css: {
                              'background-color': 'yellow',
                              color: 'black',
                            },
                            label: 'Amarillo',
                          },
                          'bg-green': {
                            css: {
                              'background-color': 'green',
                              color: 'white',
                            },
                            label: 'Verde',
                          },
                          'bg-blue': {
                            css: {
                              'background-color': 'blue',
                              color: 'white',
                            },
                            label: 'Azul',
                          },
                          'bg-purple': {
                            css: {
                              'background-color': 'purple',
                              color: 'white',
                            },
                            label: 'Morado',
                          },
                          'bg-pink': {
                            css: {
                              'background-color': 'pink',
                              color: 'black',
                            },
                            label: 'Rosa',
                          },
                          'bg-gray': {
                            css: {
                              'background-color': 'gray',
                              color: 'white',
                            },
                            label: 'Gris',
                          },
                          'bg-black': {
                            css: {
                              'background-color': 'black',
                              color: 'white',
                            },
                            label: 'Negro',
                          },
                          'bg-white': {
                            css: {
                              'background-color': 'white',
                              color: 'black',
                            },
                            label: 'Blanco',
                          },
                          'text-red': {
                            css: {
                              color: 'red',
                            },
                            label: 'Rojo',
                          },
                          'text-orange': {
                            css: {
                              color: 'orange',
                            },
                            label: 'Naranja',
                          },
                          'text-yellow': {
                            css: {
                              color: 'yellow',
                            },
                            label: 'Amarillo',
                          },
                          'text-green': {
                            css: {
                              color: 'green',
                            },
                            label: 'Verde',
                          },
                          'text-blue': {
                            css: {
                              color: 'blue',
                            },
                            label: 'Azul',
                          },
                          'text-purple': {
                            css: {
                              color: 'purple',
                            },
                            label: 'Púrpura',
                          },
                          'text-pink': {
                            css: {
                              color: 'pink',
                            },
                            label: 'Rosa',
                          },
                        },
                        // Estados de subrayado
                        underline: {
                          solid: {
                            label: 'Sólido',
                            css: {
                              'text-decoration': 'underline',
                              'text-underline-offset': '4px',
                            },
                          },
                          'yellow-dashed': {
                            label: 'Amarillo Punteado',
                            css: {
                              'text-decoration': 'underline dashed',
                              'text-decoration-color': 'light-dark(#EAB308,yellow)',
                              'text-underline-offset': '4px',
                            },
                          },
                          'blue-wavy': {
                            label: 'Azul Ondulado',
                            css: {
                              'text-decoration': 'underline wavy',
                              'text-decoration-color': 'light-dark(#3B82F6,#60A5FA)',
                              'text-underline-offset': '4px',
                            },
                          },
                          'red-double': {
                            label: 'Rojo Doble',
                            css: {
                              'text-decoration': 'underline double',
                              'text-decoration-color': 'light-dark(#EF4444,#F87171)',
                              'text-underline-offset': '4px',
                            },
                          },
                        },
                        // Estados de resaltado
                        highlight: {
                          yellow: {
                            label: 'Amarillo',
                            css: {
                              'background-color': 'light-dark(#FEF08A,#CA8A04)',
                              color: 'light-dark(#713F12,#FEF3C7)',
                              padding: '2px 4px',
                              'border-radius': '3px',
                            },
                          },
                          green: {
                            label: 'Verde',
                            css: {
                              'background-color': 'light-dark(#BBF7D0,#15803D)',
                              color: 'light-dark(#14532D,#DCFCE7)',
                              padding: '2px 4px',
                              'border-radius': '3px',
                            },
                          },
                          blue: {
                            label: 'Azul',
                            css: {
                              'background-color': 'light-dark(#BFDBFE,#1D4ED8)',
                              color: 'light-dark(#1E3A8A,#DBEAFE)',
                              padding: '2px 4px',
                              'border-radius': '3px',
                            },
                          },
                          pink: {
                            label: 'Rosa',
                            css: {
                              'background-color': 'light-dark(#FBCFE8,#BE185D)',
                              color: 'light-dark(#831843,#FCE7F3)',
                              padding: '2px 4px',
                              'border-radius': '3px',
                            },
                          },
                        },
                      },
                    }),
                    UploadFeature(),
                    ChecklistFeature(),
                    BlockquoteFeature(),
                  ]
                },
              }),
              label: {
                en: 'Media block',
                es: 'Bloque de Medias',
              },
              required: true,
            },
          ],
          label: {
            en: 'Post Content',
            es: 'Contenido de la Publicación',
          },
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              label: {
                en: 'Related Posts',
                es: 'Publicaciones Relacionadas',
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
              relationTo: 'posts',
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
    {
      name: 'authors',
      label: {
        en: 'Authors',
        es: 'Autores',
      },
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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

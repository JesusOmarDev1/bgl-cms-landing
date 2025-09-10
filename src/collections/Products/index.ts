import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  TextStateFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { MediaBlock } from '../../blocks/MediaBlock/config'
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
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProducts'

export const Products: CollectionConfig = {
  slug: 'products',
  trash: true,
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
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
  defaultPopulate: {
    title: true,
    slug: true,
    total: true,
    tags: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['heroImage', 'title', 'total', 'tags', 'createdAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req,
        })

        return path
      },
    },
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
            {
              name: 'brand',
              type: 'relationship',
              label: {
                en: 'Brand',
                es: 'Marca',
              },
              relationTo: 'brands',
              required: true,
            },
            {
              name: 'model',
              type: 'relationship',
              label: {
                en: 'Model',
                es: 'Modelo',
              },
              relationTo: 'models',
              required: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              label: {
                en: 'Tags',
                es: 'Etiquetas',
              },
              relationTo: 'tags',
              hasMany: true,
              admin: {
                position: 'sidebar',
              },
            },
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
              name: 'stock',
              type: 'number',
              min: 0,
              label: {
                en: 'Stock',
                es: 'Stock',
              },
              required: true,
            },
            {
              name: 'subTotal',
              type: 'number',
              min: 0,
              label: {
                en: 'Subtotal (MXN)',
                es: 'Subtotal (MXN)',
              },
              required: true,
            },
            {
              name: 'iva',
              type: 'number',
              min: 0,
              label: {
                en: 'IVA (MXN)',
                es: 'IVA (MXN)',
              },
              required: true,
            },
            {
              name: 'total',
              type: 'number',
              min: 0,
              label: {
                en: 'Total (MXN)',
                es: 'Total (MXN)',
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
                    BlocksFeature({ blocks: [MediaBlock] }),
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
                  ]
                },
              }),
              label: {
                en: 'Content',
                es: 'Contenido',
              },
              required: true,
            },
          ],
        },
        {
          label: {
            en: 'Technical Specifications',
            es: 'Especificaciones técnicas',
          },
          fields: [
            {
              name: 'maxCapacity',
              type: 'number',
              min: 0,
              label: {
                en: 'Max Capacity',
                es: 'Capacidad Máxima',
              },
            },
            {
              name: 'minDivision',
              type: 'number',
              min: 0,
              label: {
                en: 'Min Division',
                es: 'División Mínima',
              },
            },
            {
              name: 'material',
              type: 'text',
              label: {
                en: 'Material',
                es: 'Material',
              },
            },
            {
              name: 'voltage',
              type: 'text',
              label: {
                en: 'Voltage',
                es: 'Voltaje',
              },
            },
            {
              name: 'class',
              type: 'text',
              label: {
                en: 'Class',
                es: 'Clase',
              },
            },
          ],
        },
        {
          label: {
            en: 'Product Dimensions',
            es: 'Dimensiones del Producto',
          },
          fields: [],
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
    afterChange: [revalidateProduct],
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

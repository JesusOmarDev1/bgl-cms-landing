import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
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
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  labels: {
    singular: {
      en: 'Supplier',
      es: 'Proveedor',
    },
    plural: {
      en: 'Suppliers',
      es: 'Proveedores',
    },
  },
  defaultPopulate: {
    title: true,
    companyName: true,
    credit: true,
    discount: true,
    heroImage: true,
    createdAt: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['heroImage', 'title', 'credit', 'discount', 'createdAt'],
    description: 'Administra los proveedores del sitio: crea, edita y elimina proveedores',
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
              label: {
                en: 'Title',
                es: 'Título',
              },
              required: true,
            },
            {
              name: 'companyName',
              type: 'text',
              label: {
                en: 'Company Name',
                es: 'Razon Social',
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
            },
            {
              name: 'brands',
              type: 'relationship',
              relationTo: 'brands',
              label: {
                en: 'Brands',
                es: 'Marcas',
              },
            },
            {
              name: 'products',
              type: 'relationship',
              relationTo: 'products',
              label: {
                en: 'Products',
                es: 'Productos',
              },
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
            },
          ],
        },
        {
          label: {
            en: 'Contact Information',
            es: 'Informacion de Contacto',
          },
          fields: [
            {
              name: 'contact',
              type: 'text',
              label: {
                en: 'Contact',
                es: 'Contacto',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: {
                en: 'Email',
                es: 'Correo Electrónico',
              },
            },
            {
              name: 'phone',
              type: 'text',
              label: {
                en: 'Phone',
                es: 'Teléfono',
              },
            },
            {
              name: 'address',
              type: 'text',
              label: {
                en: 'Address',
                es: 'Dirección',
              },
            },
            {
              name: 'website',
              type: 'text',
              label: {
                en: 'Website',
                es: 'Sitio Web',
              },
            },
          ],
        },
      ],
    },
    ...slugField(),
    {
      name: 'credit',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Credit',
        es: 'Crédito',
      },
    },
    {
      name: 'discount',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
      label: {
        en: 'Discount',
        es: 'Descuento',
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}

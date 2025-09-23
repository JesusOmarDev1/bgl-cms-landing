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
import { contentLexicalEditor } from '@/fields/contentLexical'

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
              editor: contentLexicalEditor,
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

import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { contentLexicalEditor } from '@/fields/contentLexical'
import { TelephoneField } from '@/fields/telephone'

export const Clients: CollectionConfig = {
  slug: 'clients',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  defaultSort: 'createdAt',
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  labels: {
    singular: {
      en: 'Client',
      es: 'Cliente',
    },
    plural: {
      en: 'Clients',
      es: 'Clientes',
    },
  },
  defaultPopulate: {
    title: true,
    companyName: true,
    heroImage: true,
    createdAt: true,
  },
  admin: {
    defaultColumns: ['heroImage', 'title', 'createdAt'],
    useAsTitle: 'title',
    description: 'Administra los clientes del sitio: crea, edita y elimina clientes',
    group: 'Control Interno',
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
            ...TelephoneField({
              name: 'phone',
              label: {
                en: 'Phone',
                es: 'Teléfono',
              },
            }),
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
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}

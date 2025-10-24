import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { generalFields } from './fields/generalFields'
import { contactFields } from './fields/contactFields'
import { sidebarFields } from './fields/sidebarFields'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  access: {
    read: isAdminOrEditor,
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
          fields: generalFields,
        },
        {
          label: {
            en: 'Contact Information',
            es: 'Información de Contacto',
          },
          fields: contactFields,
        },
      ],
    },
    ...slugField(),
    ...sidebarFields,
  ],
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}

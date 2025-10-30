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
    // Index for supplier lookups by title (used in admin UI and search)
    {
      fields: ['title'],
    },
    // Index for slug-based queries (for potential supplier pages)
    {
      fields: ['slug'],
    },
    // Index for company name searches and sorting
    {
      fields: ['companyName'],
    },
    // Compound index for company name and title (business directory functionality)
    {
      fields: ['companyName', 'title'],
    },
    // Index for credit-based queries (business management)
    {
      fields: ['credit'],
    },
    // Index for discount-based queries (business management)
    {
      fields: ['discount'],
    },
    // Compound index for credit and discount (supplier terms management)
    {
      fields: ['credit', 'discount'],
    },
    // Index for published status filtering (draft/published)
    {
      fields: ['_status'],
    },
    // Compound index for published suppliers sorted by title
    {
      fields: ['_status', 'title'],
    },
    // Compound index for sorting and filtering by creation date
    {
      fields: ['createdAt', 'title'],
    },
    // Index for trash functionality (deletedAt field from trash: true)
    {
      fields: ['deletedAt', 'title'],
    },
    // Index for email-based lookups (contact management)
    {
      fields: ['email'],
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

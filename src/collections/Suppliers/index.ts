import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  trash: true,
  access: {
    read: anyone,
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
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'email', 'phone', 'isActive', 'createdAt'],
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
              name: 'companyName',
              type: 'text',
              label: {
                en: 'Company Name',
                es: 'Razon Social',
              },
            },
            {
              name: 'rfc',
              type: 'text',
              maxLength: 13,
              label: {
                en: 'RFC',
                es: 'RFC',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: {
                en: 'Email',
                es: 'Correo Electrónico',
              },
              required: true,
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
              type: 'textarea',
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
            {
              name: 'isActive',
              type: 'checkbox',
              label: {
                en: 'Active',
                es: 'Activo',
              },
            },
            ...slugField(),
          ],
        },
      ],
    },
  ],
}

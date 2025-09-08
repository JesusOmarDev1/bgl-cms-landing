import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'

export const Suppliers: CollectionConfig = {
  slug: 'suppliers',
  trash: true,
  access: {
    read: anyone,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'isActive', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: {
        en: 'Supplier Name',
        es: 'Nombre del Proveedor',
      },
      required: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: {
        en: 'Contact Information',
        es: 'Información de Contacto',
      },
      fields: [
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
      ],
    },
    {
      name: 'paymentTerms',
      type: 'select',
      label: {
        en: 'Payment Terms',
        es: 'Términos de Pago',
      },
      options: [
        {
          label: {
            en: 'Immediate Payment',
            es: 'Pago Inmediato',
          },
          value: 'immediate',
        },
        {
          label: {
            en: '1 to 3 days',
            es: '1 a 3 días',
          },
          value: '1-3-days',
        },
        {
          label: {
            en: '15 days net',
            es: '15 días neto',
          },
          value: '15-net',
        },
        {
          label: {
            en: '30 days net',
            es: '30 días neto',
          },
          value: '30-net',
        },
        {
          label: {
            en: '60 days net',
            es: '60 días neto',
          },
          value: '60-net',
        },
      ],
      defaultValue: '30-net',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: {
        en: 'Active Supplier',
        es: 'Proveedor Activo',
      },
      defaultValue: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: {
        en: 'Internal Notes',
        es: 'Notas Internas',
      },
      admin: {
        description: {
          en: 'Internal notes about this supplier',
          es: 'Notas internas sobre este proveedor',
        },
      },
    },
    ...slugField(),
  ],
}

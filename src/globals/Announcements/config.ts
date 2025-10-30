import type { GlobalConfig } from 'payload'

import { revalidateAnnouncements } from './hooks/revalidateAnnouncements'
import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  label: 'Anuncios',
  access: {
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateAnnouncements],
  },
  fields: [
    {
      name: 'announcements',
      type: 'array',
      label: 'Anuncios',
      labels: {
        singular: {
          en: 'Announcement',
          es: 'Anuncio',
        },
        plural: {
          en: 'Announcements',
          es: 'Anuncios',
        },
      },
      minRows: 0,
      maxRows: 5,
      admin: {
        components: {
          RowLabel: '@/globals/Announcements/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Mensaje',
          admin: {
            rows: 2,
          },
        },
        {
          name: 'type',
          type: 'select',
          label: 'Tipo',
          defaultValue: 'announcement',
          options: [
            {
              label: 'Anuncio',
              value: 'announcement',
            },
            {
              label: 'Información',
              value: 'info',
            },
            {
              label: 'Advertencia',
              value: 'warning',
            },
            {
              label: 'Éxito',
              value: 'success',
            },
          ],
        },
        {
          name: 'tag',
          type: 'text',
          label: 'Etiqueta',
          admin: {
            description: 'Etiqueta opcional (ej: "NUEVO", "URGENTE")',
          },
        },
        {
          name: 'link',
          type: 'text',
          label: 'Enlace',
          admin: {
            description: 'URL opcional para más información',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Texto del enlace',
          admin: {
            condition: (data, siblingData) => siblingData.link,
            description: 'Texto del enlace (por defecto: "Ver más")',
          },
        },
        {
          name: 'expiryDate',
          type: 'date',
          label: 'Fecha de expiración',
          required: true,
          admin: {
            description: 'El anuncio se ocultará automáticamente después de esta fecha',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'active',
          type: 'checkbox',
          label: 'Activo',
          defaultValue: true,
        },
      ],
    },
  ],
}

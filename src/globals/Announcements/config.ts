import type { GlobalConfig } from 'payload'

import { revalidateAnnouncements } from './hooks/revalidateAnnouncements'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  label: 'Anuncios',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateAnnouncements],
  },
  fields: [
    {
      name: 'announcements',
      type: 'array',
      label: 'Anuncios',
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
          name: 'dismissible',
          type: 'checkbox',
          label: 'Puede cerrarse',
          defaultValue: true,
          admin: {
            description: 'Permite al usuario cerrar este anuncio',
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

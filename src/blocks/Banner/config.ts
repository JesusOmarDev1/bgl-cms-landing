import type { Block } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  labels: {
    singular: {
      en: 'Banner',
      es: 'Banner',
    },
    plural: {
      en: 'Banners',
      es: 'Banners',
    },
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      label: {
        en: 'Style',
        es: 'Estilo',
      },
      defaultValue: 'info',
      options: [
        {
          label: {
            en: 'Info',
            es: 'Información',
          },
          value: 'info',
        },
        {
          label: {
            en: 'Warning',
            es: 'Advertencia',
          },
          value: 'warning',
        },
        {
          label: {
            en: 'Error',
            es: 'Error',
          },
          value: 'destructive',
        },
        {
          label: {
            en: 'Success',
            es: 'Éxito',
          },
          value: 'success',
        },
      ],
      required: true,
    },
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
      name: 'content',
      type: 'textarea',
      label: {
        en: 'Content',
        es: 'Contenido',
      },
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}

import type { Block } from 'payload'

export const DownloadLink: Block = {
  slug: 'downloadLink',
  interfaceName: 'DownloadLinkBlock',
  labels: {
    singular: {
      en: 'PDF Download Link',
      es: 'Enlace de Descarga PDF',
    },
    plural: {
      en: 'PDF Download Links',
      es: 'Enlaces de Descarga PDF',
    },
  },
  fields: [
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'PDF File',
        es: 'Archivo PDF',
      },
      required: true,
      admin: {
        description: {
          en: 'Select the PDF file to download',
          es: 'Selecciona el archivo PDF para descargar',
        },
      },
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Link Title',
        es: 'Título del Enlace',
      },
      required: true,
      admin: {
        description: {
          en: 'Display text for the download link',
          es: 'Texto que se mostrará en el enlace de descarga',
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Description',
        es: 'Descripción',
      },
      admin: {
        description: {
          en: 'Optional description of the PDF content',
          es: 'Descripción opcional del contenido del PDF',
        },
        rows: 2,
      },
    },
    {
      name: 'variant',
      type: 'select',
      label: {
        en: 'Style Variant',
        es: 'Variante de Estilo',
      },
      defaultValue: 'default',
      options: [
        {
          label: {
            en: 'Default (Inline)',
            es: 'Por Defecto (En línea)',
          },
          value: 'default',
        },
        {
          label: {
            en: 'Card Style',
            es: 'Estilo Tarjeta',
          },
          value: 'card',
        },
        {
          label: {
            en: 'Button Style',
            es: 'Estilo Botón',
          },
          value: 'button',
        },
      ],
      admin: {
        description: {
          en: 'Choose how the download link should be displayed',
          es: 'Elige cómo se debe mostrar el enlace de descarga',
        },
      },
    },
    {
      name: 'showFileSize',
      type: 'checkbox',
      label: {
        en: 'Show File Size',
        es: 'Mostrar Tamaño del Archivo',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Display the file size next to the download link',
          es: 'Mostrar el tamaño del archivo junto al enlace de descarga',
        },
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      label: {
        en: 'Open in New Tab',
        es: 'Abrir en Nueva Pestaña',
      },
      defaultValue: true,
      admin: {
        description: {
          en: 'Open the PDF in a new browser tab',
          es: 'Abrir el PDF en una nueva pestaña del navegador',
        },
      },
    },
  ],
}

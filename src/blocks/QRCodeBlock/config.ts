import type { Block } from 'payload'

export const QRCodeBlock: Block = {
  slug: 'qr-code-block',
  labels: {
    singular: {
      en: 'QR Code',
      es: 'Código QR',
    },
    plural: {
      en: 'QR Codes',
      es: 'Códigos QR',
    },
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      label: {
        en: 'Description',
        es: 'Descripción',
      },
      required: true,
    },
    {
      name: 'size',
      type: 'select',
      label: {
        en: 'Size',
        es: 'Tamaño',
      },
      defaultValue: 'medium',
      options: [
        {
          label: {
            en: 'Medium',
            es: 'Mediano',
          },
          value: 'medium',
        },
        {
          label: {
            en: 'Large',
            es: 'Grande',
          },
          value: 'large',
        },
      ],
      required: true,
    },
    {
      name: 'align',
      type: 'select',
      label: {
        en: 'Alignment',
        es: 'Alineacion',
      },
      options: [
        {
          label: {
            en: 'Left',
            es: 'Izquierda',
          },
          value: 'left',
        },
        {
          label: {
            en: 'center',
            es: 'centro',
          },
          value: 'center',
        },
        {
          label: {
            en: 'right',
            es: 'derecha',
          },
          value: 'right',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: {
        en: 'URL',
        es: 'URL',
      },
      required: true,
    },
  ],
  interfaceName: 'QRCodeBlock',
}

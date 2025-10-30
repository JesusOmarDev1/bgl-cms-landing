import type { Field } from 'payload'
import { NumberField } from '@/fields/number'
import { isAdminOrEditorFieldLevel } from '@/access/isAdminOrEditor'

export const pricingFields: Field[] = [
  {
    name: 'publishedAt',
    label: {
      en: 'Published Date',
      es: 'Fecha de Publicación',
    },
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
      position: 'sidebar',
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === 'published' && !value) {
            return new Date()
          }
          return value
        },
      ],
    },
  },
  ...NumberField(
    {
      name: 'price',
      min: 0,
      label: {
        en: 'Price',
        es: 'Precio',
      },
      admin: {
        position: 'sidebar',
      },
      access: {
        read: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
        create: isAdminOrEditorFieldLevel,
      },
    },
    {
      prefix: '$ ',
      suffix: ' MXN',
      thousandSeparator: ',',
      decimalScale: 2,
      fixedDecimalScale: true,
    },
  ),
  ...NumberField(
    {
      name: 'discount',
      min: 0,
      label: {
        en: 'Discount',
        es: 'Descuento',
      },
      admin: {
        position: 'sidebar',
      },
      access: {
        read: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
        create: isAdminOrEditorFieldLevel,
      },
    },
    {
      prefix: '$ ',
      suffix: ' MXN',
      thousandSeparator: ',',
      decimalScale: 2,
      fixedDecimalScale: true,
    },
  ),
  {
    name: 'iva',
    type: 'checkbox',
    label: {
      en: 'Apply IVA?',
      es: '¿Aplicar IVA?',
    },
    admin: {
      position: 'sidebar',
      description: 'Se aplica el 16% de IVA al precio final',
    },
    access: {
      read: isAdminOrEditorFieldLevel,
      update: isAdminOrEditorFieldLevel,
      create: isAdminOrEditorFieldLevel,
    },
  },
  ...NumberField(
    {
      name: 'total',
      min: 0,
      label: {
        en: 'Total',
        es: 'Total',
      },
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (
              !siblingData?.price ||
              typeof siblingData.price !== 'number' ||
              siblingData.price < 0
            ) {
              return value
            }

            const discount =
              siblingData.discount &&
              typeof siblingData.discount === 'number' &&
              siblingData.discount > 0
                ? siblingData.discount
                : 0

            const subtotal = Math.max(0, siblingData.price - discount)
            const applyIVA = siblingData.iva === true
            const total = applyIVA ? subtotal * 1.16 : subtotal

            return Math.round(total * 100) / 100
          },
        ],
      },
      access: {
        read: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
        create: isAdminOrEditorFieldLevel,
      },
    },
    {
      prefix: '$ ',
      suffix: ' MXN',
      thousandSeparator: ',',
      decimalScale: 2,
      fixedDecimalScale: true,
    },
  ),
]

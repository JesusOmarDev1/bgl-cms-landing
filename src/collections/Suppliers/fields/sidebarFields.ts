import type { Field } from 'payload'
import { NumberField } from '@/fields/number'

export const sidebarFields: Field[] = [
  {
    name: 'credit',
    type: 'text',
    admin: {
      position: 'sidebar',
    },
    label: {
      en: 'Credit',
      es: 'Crédito',
    },
  },
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

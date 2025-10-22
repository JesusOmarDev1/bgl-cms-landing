import type { Field } from 'payload'
import { NumberField } from '@/fields/number'
import { isAdminOrEditorFieldLevel } from '@/access/isAdminOrEditor'

export const pricingFields: Field[] = [
  ...NumberField(
    {
      name: 'price',
      min: 0,
      label: {
        en: 'Price',
        es: 'Precio',
      },
      required: true,
      access: {
        read: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
      },
      admin: {
        description: 'Precio base del producto antes de descuentos e impuestos',
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
      access: {
        read: isAdminOrEditorFieldLevel,
        update: isAdminOrEditorFieldLevel,
      },
      admin: {
        description: 'Descuento en pesos mexicanos a aplicar al precio base',
        condition: (data) => data?.price > 0,
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
    defaultValue: true,
    admin: {
      description: 'Se aplica el 16% de IVA al precio final',
    },
    access: {
      read: isAdminOrEditorFieldLevel,
      update: isAdminOrEditorFieldLevel,
    },
  },
  ...NumberField(
    {
      name: 'total',
      min: 0,
      label: {
        en: 'Total Price',
        es: 'Precio Total',
      },
      admin: {
        readOnly: true,
        description: 'Precio final calculado automáticamente (precio - descuento + IVA)',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Validar que el precio existe y es válido
            if (
              !siblingData?.price ||
              typeof siblingData.price !== 'number' ||
              siblingData.price < 0
            ) {
              return 0
            }

            // Calcular subtotal: precio base menos descuento (si existe y es válido)
            const discount =
              siblingData.discount &&
              typeof siblingData.discount === 'number' &&
              siblingData.discount > 0
                ? siblingData.discount
                : 0

            const subtotal = Math.max(0, siblingData.price - discount)

            // Aplicar IVA si está habilitado (16% = 1.16)
            const applyIVA = siblingData.iva === true
            const total = applyIVA ? subtotal * 1.16 : subtotal

            // Redondear a 2 decimales para evitar problemas de precisión
            return Math.round(total * 100) / 100
          },
        ],
      },
      access: {
        read: isAdminOrEditorFieldLevel,
        update: () => false, // Solo lectura, se calcula automáticamente
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
      name: 'stock',
      min: 0,
      label: {
        en: 'Stock',
        es: 'Stock',
      },
      required: true,
      admin: {
        description: 'Cantidad disponible en inventario',
      },
    },
    {
      suffix: ' Unidad(es)',
      thousandSeparator: ',',
      decimalScale: 0,
    },
  ),
]

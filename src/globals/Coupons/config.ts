import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { anyone } from '@/access/anyone'
import { revalidateCoupons } from './hooks/revalidateCoupons'

export const Coupons: GlobalConfig = {
  slug: 'coupons',
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  label: {
    en: 'Coupons',
    es: 'Cupones',
  },
  admin: {
    description: {
      en: 'Manage promotional coupons and discounts with countdown timers',
      es: 'Gestiona cupones promocionales y descuentos con contadores regresivos',
    },
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Enable Coupons Section',
        es: 'Habilitar Sección de Cupones',
      },
      admin: {
        description: {
          en: 'Show/hide the coupons section on the website',
          es: 'Mostrar/ocultar la sección de cupones en el sitio web',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: {
        en: 'Section Title',
        es: 'Título de la Sección',
      },
      defaultValue: '¡Ofertas Especiales!',
      admin: {
        description: {
          en: 'Main title for the coupons section',
          es: 'Título principal para la sección de cupones',
        },
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: {
        en: 'Section Subtitle',
        es: 'Subtítulo de la Sección',
      },
      defaultValue: 'Aprovecha nuestros descuentos exclusivos antes de que se acaben',
      admin: {
        description: {
          en: 'Subtitle or description for the coupons section',
          es: 'Subtítulo o descripción para la sección de cupones',
        },
      },
    },
    {
      name: 'coupons',
      type: 'array',
      label: {
        en: 'Coupons',
        es: 'Cupones',
      },
      labels: {
        singular: {
          en: 'Coupon',
          es: 'Cupon',
        },
        plural: {
          en: 'Coupons',
          es: 'Cupones',
        },
      },
      minRows: 1,
      maxRows: 6,
      admin: {
        description: {
          en: 'Add promotional coupons (maximum 6)',
          es: 'Agregar cupones promocionales (máximo 6)',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'active',
          type: 'checkbox',
          defaultValue: true,
          label: {
            en: 'Active',
            es: 'Activo',
          },
          admin: {
            description: {
              en: 'Enable/disable this coupon',
              es: 'Activar/desactivar este cupón',
            },
          },
        },
        {
          name: 'code',
          type: 'text',
          required: true,
          label: {
            en: 'Coupon Code',
            es: 'Código del Cupón',
          },
          admin: {
            description: {
              en: 'Unique coupon code (e.g., SAVE20, WELCOME10)',
              es: 'Código único del cupón (ej: SAVE20, WELCOME10)',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: {
            en: 'Coupon Title',
            es: 'Título del Cupón',
          },
          admin: {
            description: {
              en: 'Short descriptive title',
              es: 'Título descriptivo corto',
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
              en: 'Detailed description of the offer',
              es: 'Descripción detallada de la oferta',
            },
          },
        },
        {
          name: 'discountType',
          type: 'select',
          required: true,
          defaultValue: 'percentage',
          label: {
            en: 'Discount Type',
            es: 'Tipo de Descuento',
          },
          options: [
            {
              label: {
                en: 'Percentage',
                es: 'Porcentaje',
              },
              value: 'percentage',
            },
            {
              label: {
                en: 'Fixed Amount',
                es: 'Monto Fijo',
              },
              value: 'fixed',
            },
            {
              label: {
                en: 'Free Shipping',
                es: 'Envío Gratis',
              },
              value: 'shipping',
            },
          ],
        },
        {
          name: 'discountValue',
          type: 'number',
          label: {
            en: 'Discount Value',
            es: 'Valor del Descuento',
          },
          admin: {
            description: {
              en: 'Percentage (e.g., 20 for 20%) or fixed amount (e.g., 100 for $100)',
              es: 'Porcentaje (ej: 20 para 20%) o monto fijo (ej: 100 para $100)',
            },
            condition: (data, siblingData) => siblingData?.discountType !== 'shipping',
          },
        },
        {
          name: 'expiryDate',
          type: 'date',
          required: true,
          label: {
            en: 'Expiry Date',
            es: 'Fecha de Expiración',
          },
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
            description: {
              en: 'Date and time when the coupon expires',
              es: 'Fecha y hora cuando expira el cupón',
            },
          },
        },
        {
          name: 'minPurchase',
          type: 'number',
          label: {
            en: 'Minimum Purchase',
            es: 'Compra Mínima',
          },
          admin: {
            description: {
              en: 'Minimum purchase amount required (optional)',
              es: 'Monto mínimo de compra requerido (opcional)',
            },
          },
        },
        {
          name: 'maxUses',
          type: 'number',
          label: {
            en: 'Maximum Uses',
            es: 'Usos Máximos',
          },
          admin: {
            description: {
              en: 'Maximum number of times this coupon can be used (optional)',
              es: 'Número máximo de veces que se puede usar este cupón (opcional)',
            },
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          defaultValue: 'red',
          label: {
            en: 'Background Color',
            es: 'Color de Fondo',
          },
          options: [
            {
              label: {
                en: 'Red',
                es: 'Rojo',
              },
              value: 'red',
            },
            {
              label: {
                en: 'Blue',
                es: 'Azul',
              },
              value: 'blue',
            },
            {
              label: {
                en: 'Green',
                es: 'Verde',
              },
              value: 'green',
            },
            {
              label: {
                en: 'Orange',
                es: 'Naranja',
              },
              value: 'orange',
            },
            {
              label: {
                en: 'Purple',
                es: 'Morado',
              },
              value: 'purple',
            },
            {
              label: {
                en: 'Pink',
                es: 'Rosa',
              },
              value: 'pink',
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          defaultValue: 'Usar Cupón',
          label: {
            en: 'CTA Button Text',
            es: 'Texto del Botón CTA',
          },
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: {
            en: 'CTA Link',
            es: 'Enlace del CTA',
          },
          admin: {
            description: {
              en: 'Link when clicking the CTA button (e.g., /productos, /contacto)',
              es: 'Enlace al hacer clic en el botón CTA (ej: /productos, /contacto)',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCoupons],
  },
}

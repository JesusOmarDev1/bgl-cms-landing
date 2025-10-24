import type { Field } from 'payload'
import { TelephoneField } from '@/fields/telephone'

export const contactFields: Field[] = [
  {
    name: 'contact',
    type: 'text',
    label: {
      en: 'Contact',
      es: 'Contacto',
    },
  },
  {
    name: 'email',
    type: 'email',
    label: {
      en: 'Email',
      es: 'Correo Electrónico',
    },
  },
  ...TelephoneField({
    name: 'phone',
    label: {
      en: 'Phone',
      es: 'Teléfono',
    },
  }),
  {
    name: 'address',
    type: 'text',
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
]

import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    es: 'Pie de página',
  },
  access: {
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    description: 'Aqui se configura el pie de página global del sitio web',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      labels: {
        singular: {
          en: 'Navigation Item',
          es: 'Elemento de Navegación',
        },
        plural: {
          en: 'Navigation Items',
          es: 'Elementos de Navegación',
        },
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

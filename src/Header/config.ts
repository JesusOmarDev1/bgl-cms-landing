import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    es: 'Encabezado',
  },
  access: {
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    description: 'Aqui se configura el encabezado global del sitio web',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

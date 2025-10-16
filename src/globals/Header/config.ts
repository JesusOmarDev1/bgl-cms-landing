import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { iconPickerField } from '@/fields/iconPicker'

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
    description: 'Aquí se configura el encabezado global del sitio web con menús',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Products',
            es: 'Productos',
          },
          fields: [
            {
              name: 'productsMenu',
              label: {
                en: 'Products Menu',
                es: 'Menú Productos',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Menu Title',
                    es: 'Título del Menú',
                  },
                  required: true,
                  defaultValue: 'Productos',
                },
                {
                  name: 'showInNav',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Navigation',
                    es: 'Mostrar en Navegación',
                  },
                  defaultValue: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  label: {
                    en: 'Has Dropdown Menu',
                    es: 'Tiene Menú Desplegable',
                  },
                  defaultValue: true,
                },
                {
                  name: 'directLink',
                  label: {
                    en: 'Direct Link (if no dropdown)',
                    es: 'Enlace Directo (si no hay desplegable)',
                  },
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => {
                      return !siblingData?.hasDropdown && siblingData?.showInNav
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Product Link',
                      es: 'Enlace de Producto',
                    },
                    plural: {
                      en: 'Product Links',
                      es: 'Enlaces de Productos',
                    },
                  },
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.hasDropdown
                    },
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/RowLabel#RowLabel',
                    },
                  },
                  fields: [
                    iconPickerField({
                      name: 'icon',
                      label: {
                        en: 'Icon',
                        es: 'Icono',
                      },
                      required: false,
                      iconSize: 28,
                      columns: 6,
                      admin: {
                        description: {
                          en: 'Select an icon',
                          es: 'Selecciona un icono',
                        },
                      },
                    }),
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Services',
            es: 'Servicios',
          },
          fields: [
            {
              name: 'servicesMenu',
              label: {
                en: 'Services Menu',
                es: 'Menú Servicios',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Menu Title',
                    es: 'Título del Menú',
                  },
                  defaultValue: 'Servicios',
                  required: true,
                },
                {
                  name: 'showInNav',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Navigation',
                    es: 'Mostrar en Navegación',
                  },
                  defaultValue: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  label: {
                    en: 'Has Dropdown Menu',
                    es: 'Tiene Menú Desplegable',
                  },
                  defaultValue: true,
                },
                {
                  name: 'directLink',
                  label: {
                    en: 'Direct Link (if no dropdown)',
                    es: 'Enlace Directo (si no hay desplegable)',
                  },
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => {
                      return !siblingData?.hasDropdown && siblingData?.showInNav
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Service Link',
                      es: 'Enlace de Servicio',
                    },
                    plural: {
                      en: 'Service Links',
                      es: 'Enlaces de Servicios',
                    },
                  },
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.hasDropdown
                    },
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/RowLabel#RowLabel',
                    },
                  },
                  fields: [
                    iconPickerField({
                      name: 'icon',
                      label: {
                        en: 'Icon',
                        es: 'Icono',
                      },
                      required: false,
                      iconSize: 28,
                      columns: 6,
                      admin: {
                        description: {
                          en: 'Select an icon',
                          es: 'Selecciona un icono',
                        },
                      },
                    }),
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Resources',
            es: 'Recursos',
          },
          fields: [
            {
              name: 'resourcesMenu',
              label: {
                en: 'Resources Menu',
                es: 'Menú Recursos',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Menu Title',
                    es: 'Título del Menú',
                  },
                  defaultValue: 'Recursos',
                  required: true,
                },
                {
                  name: 'showInNav',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Navigation',
                    es: 'Mostrar en Navegación',
                  },
                  defaultValue: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  label: {
                    en: 'Has Dropdown Menu',
                    es: 'Tiene Menú Desplegable',
                  },
                  defaultValue: true,
                },
                {
                  name: 'directLink',
                  label: {
                    en: 'Direct Link (if no dropdown)',
                    es: 'Enlace Directo (si no hay desplegable)',
                  },
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => {
                      return !siblingData?.hasDropdown && siblingData?.showInNav
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Resource Link',
                      es: 'Enlace de Recurso',
                    },
                    plural: {
                      en: 'Resource Links',
                      es: 'Enlaces de Recursos',
                    },
                  },
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.hasDropdown
                    },
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/RowLabel#RowLabel',
                    },
                  },
                  fields: [
                    iconPickerField({
                      name: 'icon',
                      label: {
                        en: 'Icon',
                        es: 'Icono',
                      },
                      required: false,
                      iconSize: 28,
                      columns: 6,
                      admin: {
                        description: {
                          en: 'Select an icon',
                          es: 'Selecciona un icono',
                        },
                      },
                    }),
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Company',
            es: 'Compañía',
          },
          fields: [
            {
              name: 'companyMenu',
              label: {
                en: 'Company Menu',
                es: 'Menú Compañía',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Menu Title',
                    es: 'Título del Menú',
                  },
                  defaultValue: 'Compañía',
                },
                {
                  name: 'showInNav',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Navigation',
                    es: 'Mostrar en Navegación',
                  },
                  defaultValue: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  label: {
                    en: 'Has Dropdown Menu',
                    es: 'Tiene Menú Desplegable',
                  },
                  defaultValue: true,
                },
                {
                  name: 'directLink',
                  label: {
                    en: 'Direct Link (if no dropdown)',
                    es: 'Enlace Directo (si no hay desplegable)',
                  },
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => {
                      return !siblingData?.hasDropdown && siblingData?.showInNav
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Company Link',
                      es: 'Enlace de Compañía',
                    },
                    plural: {
                      en: 'Company Links',
                      es: 'Enlaces de Compañía',
                    },
                  },
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.hasDropdown
                    },
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/RowLabel#RowLabel',
                    },
                  },
                  fields: [
                    iconPickerField({
                      name: 'icon',
                      label: {
                        en: 'Icon',
                        es: 'Icono',
                      },
                      required: false,
                      iconSize: 28,
                      columns: 6,
                      admin: {
                        description: {
                          en: 'Select an icon',
                          es: 'Selecciona un icono',
                        },
                      },
                    }),
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Contact',
            es: 'Contacto',
          },
          fields: [
            {
              name: 'contactMenu',
              label: {
                en: 'Contact Menu',
                es: 'Menú Contacto',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Menu Title',
                    es: 'Título del Menú',
                  },
                  defaultValue: 'Contacto',
                },
                {
                  name: 'showInNav',
                  type: 'checkbox',
                  label: {
                    en: 'Show in Navigation',
                    es: 'Mostrar en Navegación',
                  },
                  defaultValue: true,
                },
                {
                  name: 'hasDropdown',
                  type: 'checkbox',
                  label: {
                    en: 'Has Dropdown Menu',
                    es: 'Tiene Menú Desplegable',
                  },
                  defaultValue: false,
                },
                {
                  name: 'directLink',
                  label: {
                    en: 'Direct Link',
                    es: 'Enlace Directo',
                  },
                  type: 'group',
                  admin: {
                    condition: (data, siblingData) => {
                      return !siblingData?.hasDropdown && siblingData?.showInNav
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Contact Link',
                      es: 'Enlace de Contacto',
                    },
                    plural: {
                      en: 'Contact Links',
                      es: 'Enlaces de Contacto',
                    },
                  },
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.hasDropdown
                    },
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Header/RowLabel#RowLabel',
                    },
                  },
                  fields: [
                    iconPickerField({
                      name: 'icon',
                      label: {
                        en: 'Icon',
                        es: 'Icono',
                      },
                      required: false,
                      iconSize: 28,
                      columns: 6,
                      admin: {
                        description: {
                          en: 'Select an icon',
                          es: 'Selecciona un icono',
                        },
                      },
                    }),
                    link({
                      appearances: false,
                    }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

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
    description: 'Aquí se configura el pie de página global del sitio web',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Product',
            es: 'Producto',
          },
          fields: [
            {
              name: 'productSection',
              label: {
                en: 'Product Section',
                es: 'Sección Producto',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Producto',
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
                      es: 'Enlaces de Producto',
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/RowLabel#RowLabel',
                    },
                  },
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
              name: 'companySection',
              label: {
                en: 'Company Section',
                es: 'Sección Compañía',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Compañía',
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
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/RowLabel#RowLabel',
                    },
                  },
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
              name: 'resourcesSection',
              label: {
                en: 'Resources Section',
                es: 'Sección Recursos',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Recursos',
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
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/RowLabel#RowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Legal',
            es: 'Legal',
          },
          fields: [
            {
              name: 'legalSection',
              label: {
                en: 'Legal Section',
                es: 'Sección Legal',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Legal',
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Legal Link',
                      es: 'Enlace Legal',
                    },
                    plural: {
                      en: 'Legal Links',
                      es: 'Enlaces Legales',
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/RowLabel#RowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Social & Follow Us',
            es: 'Social y Síguenos',
          },
          fields: [
            {
              name: 'socialSection',
              label: {
                en: 'Social Section',
                es: 'Sección Social',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Social',
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Social Link',
                      es: 'Enlace Social',
                    },
                    plural: {
                      en: 'Social Links',
                      es: 'Enlaces Sociales',
                    },
                  },
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/RowLabel#RowLabel',
                    },
                  },
                },
              ],
            },
            {
              name: 'followUsSection',
              label: {
                en: 'Follow Us Section',
                es: 'Sección Síguenos',
              },
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: {
                    en: 'Section Title',
                    es: 'Título de Sección',
                  },
                  defaultValue: 'Síguenos',
                },
                {
                  name: 'socialLinks',
                  type: 'array',
                  labels: {
                    singular: {
                      en: 'Social Media',
                      es: 'Red Social',
                    },
                    plural: {
                      en: 'Social Media',
                      es: 'Redes Sociales',
                    },
                  },
                  maxRows: 6,
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      label: {
                        en: 'Platform',
                        es: 'Plataforma',
                      },
                      required: true,
                      options: [
                        {
                          label: 'Facebook',
                          value: 'facebook',
                        },
                        {
                          label: 'Twitter',
                          value: 'twitter',
                        },
                        {
                          label: 'Instagram',
                          value: 'instagram',
                        },
                        {
                          label: 'LinkedIn',
                          value: 'linkedin',
                        },
                        {
                          label: 'YouTube',
                          value: 'youtube',
                        },
                        {
                          label: 'TikTok',
                          value: 'tiktok',
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
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/globals/Footer/SocialRowLabel#SocialRowLabel',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: 'Bottom Section',
            es: 'Sección Inferior',
          },
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: {
                en: 'Copyright Text',
                es: 'Texto de Copyright',
              },
              defaultValue: '© 2025 BGL BASCULAS INDUSTRIALES. Todos los derechos reservados.',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}

import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { activityLogPlugin } from '@payload-bites/activity-log'
import { auditFieldsPlugin } from '@payload-bites/audit-fields'

import { Page, Post, Service, Manual, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/url/utils'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { anyone } from '@/access/anyone'
import { getCloudfareAdapter } from '@/utilities/config/storage'
import { revalidateRedirects } from '@/utilities/payload/hooks/revalidateRedirects'

const generateTitle: GenerateTitle<Post | Page | Service | Manual | Product> = ({ doc }) => {
  // Evitar referencias circulares extrayendo solo las propiedades necesarias
  const title = typeof doc?.title === 'string' ? doc.title : ''

  return title ? `${title}` : 'BGL BASCULAS INDUSTRIALES'
}

const generateURL: GenerateURL<Post | Page | Service | Manual | Product> = ({ doc }) => {
  const url = getServerSideURL()

  // Evitar referencias circulares extrayendo solo las propiedades necesarias
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''

  return slug ? `${url}/${slug}` : url
}

export const plugins: Plugin[] = [
  getCloudfareAdapter(),
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              label: 'URL de origen',
              admin: {
                description: 'Necesitará reconstruir el sitio web cuando cambie este campo.',
              },
            }
          } else if ('name' in field && field.name === 'to') {
            const toField = field as any
            return {
              ...toField,
              label: 'URL de destino',
              admin: {
                description: 'Necesitará reconstruir el sitio web cuando cambie este campo.',
              },
              fields: toField.fields
                ? toField.fields.map((subfield: any) => {
                    if (subfield.name === 'type') {
                      return {
                        ...subfield,
                        label: 'Tipo de URL',
                        admin: {
                          description: 'Seleccione si desea redirigir a una URL interna o externa.',
                        },
                        options: subfield.options?.map((option: unknown) => {
                          if (typeof option === 'object' && option !== null) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const optionObj = option as any
                            return {
                              ...optionObj,
                              label:
                                optionObj.value === 'reference'
                                  ? 'Referencia interna'
                                  : optionObj.value === 'custom'
                                    ? 'URL personalizada'
                                    : optionObj.label,
                            }
                          }
                          return option
                        }) || [
                          { label: 'Referencia interna', value: 'reference' },
                          { label: 'URL personalizada', value: 'custom' },
                        ],
                      }
                    }
                    return subfield
                  })
                : [],
            }
          }
          return field
        })
      },
      labels: {
        plural: 'Redirecciones de URL',
        singular: 'Redirección de URL',
      },
      admin: {
        description:
          'Esta es una colección de redirecciones de URL que se crean en el CMS. Estas redirecciones son utilizadas por el sitio web.',
        group: 'Contenido',
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
      access: {
        read: isAdminOrEditor,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdminOrEditor,
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    uploadsCollection: 'media',
  }),
  searchPlugin({
    collections: ['posts', 'products', 'manuals', 'services'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
      labels: {
        plural: 'Resultados de búsqueda',
        singular: 'Resultado de búsquedas',
      },
      admin: {
        description:
          'Esta es una colección de resultados de búsqueda generados automáticamente. Estos resultados son utilizados por la búsqueda global del sitio y se actualizan automáticamente a medida que se crean o actualizan documentos en el CMS.',
        group: 'Contenido',
      },
      access: {
        read: anyone,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
    },
  }),
  importExportPlugin({
    collections: ['posts', 'pages', 'products', 'clients', 'services'],
    format: 'csv',
  }),
  activityLogPlugin({
    collections: {
      posts: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      pages: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      manuals: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      products: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      services: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      media: {
        enableUpdateLogging: true,
        enableCreateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      users: {
        enableUpdateLogging: true,
        enableDeleteLogging: true,
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
    },
    globals: {
      chatbot: {
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      announcements: {
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      coupons: {
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      footer: {
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
      header: {
        enableDeviceInfoLogging: false,
        enableIpAddressLogging: false,
      },
    },
    enableDraftAutosaveLogging: false,
    overrideActivityLogCollection: (collection) => ({
      ...collection,
      access: {
        ...collection?.access,
        read: isAdmin,
        update: () => false,
        create: () => false,
        delete: isAdmin,
      },
      labels: {
        ...collection?.labels,
        plural: 'Logs de actividad',
        singular: 'Log de actividad',
      },
      admin: {
        ...collection?.admin,
        description:
          'Esta es una colección de logs de actividad generados automáticamente. Estos logs son utilizados por el sistema para rastrear las acciones realizadas por los usuarios en el CMS.',
        group: 'Control Interno',
      },
    }),
  }),
  auditFieldsPlugin({
    createdByLabel: 'Creado por',
    lastModifiedByLabel: 'Modificado por',
  }),
  payloadCloudPlugin(),
]

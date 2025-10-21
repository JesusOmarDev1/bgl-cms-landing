import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { activityLogPlugin } from '@payload-bites/activity-log'
import { auditFieldsPlugin } from '@payload-bites/audit-fields'

import { Page, Post, Service, Manual, Product } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getCloudfareAdapter } from '@/utilities/storage'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { anyone } from '@/access/anyone'

const generateTitle: GenerateTitle<Post | Page | Service | Manual | Product> = ({ doc }) => {
  return doc?.title ? `${doc.title}` : 'BGL BASCULAS INDUSTRIALES'
}

const generateURL: GenerateURL<Post | Page | Service | Manual | Product> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  getCloudfareAdapter(),
  redirectsPlugin({
    collections: ['posts', 'pages'],
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
                        options: subfield.options?.map((option: any) => ({
                          ...option,
                          label:
                            option.value === 'reference'
                              ? 'Referencia interna'
                              : option.value === 'custom'
                                ? 'URL personalizada'
                                : option.label,
                        })) || [
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
    collections: ['posts', 'pages'],
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

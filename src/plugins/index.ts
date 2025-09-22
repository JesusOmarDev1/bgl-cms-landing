import { fields } from './../blocks/Form/fields'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getCloudfareAdapter } from '@/lib/storage'
import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | BGL BASCULAS INDUSTRIALES` : 'BGL BASCULAS INDUSTRIALES'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
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
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories', 'tags'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      email: {
        labels: {
          singular: 'Correo Electrónico',
          plural: 'Correos Electrónicos',
        },
      },
      checkbox: {
        labels: {
          singular: 'Casilla de verificación',
          plural: 'Casillas de verificación',
        },
      },
      select: {
        labels: {
          singular: 'Seleccionar',
          plural: 'Seleccionar',
        },
      },
      text: {
        labels: {
          singular: 'Texto',
          plural: 'Textos',
        },
      },
      textarea: {
        labels: {
          singular: 'Area de texto',
          plural: 'Areas de texto',
        },
      },
      number: {
        labels: {
          singular: 'Numero',
          plural: 'Numeros',
        },
      },
      date: {
        labels: {
          singular: 'Fecha',
          plural: 'Fechas',
        },
      },
      country: {
        labels: {
          singular: 'Pais',
          plural: 'Paises',
        },
      },
      state: {
        labels: {
          singular: 'Estado',
          plural: 'Estados',
        },
      },
      message: {
        labels: {
          singular: 'Mensaje',
          plural: 'Mensajes',
        },
      },
    },
    formSubmissionOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'submissionData') {
            return {
              ...field,
              label: 'Datos de Envío',
            }
          } else if ('name' in field && field.name === 'form') {
            return {
              ...field,
              label: 'Formulario',
            }
          }
          return field
        })
      },
      labels: {
        plural: 'Formularios de envío',
        singular: 'Formulario de envío',
      },
      admin: {
        description:
          'Esta es una colección de formularios de envío generados automáticamente. Estos formularios son utilizados por el formulario de envío del sitio y se actualizan automáticamente a medida que se crean o actualizan documentos en el CMS.',
      },
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'title') {
            return {
              ...field,
              label: 'Titulo',
            }
          } else if ('name' in field && field.name === 'fields') {
            // También personalizar los campos dentro del array de fields
            const fieldsField = field as any
            return {
              ...fieldsField,
              label: 'Campos',
              // Personalizar los blocks dentro de fields si existen
              blocks: fieldsField.blocks
                ? fieldsField.blocks.map((block: any) => {
                    if (block.slug === 'email') {
                      return {
                        ...block,
                        labels: {
                          singular: 'Correo Electrónico',
                          plural: 'Correos Electrónicos',
                        },
                        fields: block.fields
                          ? block.fields.map((blockField: any) => {
                              if (blockField.name === 'emails') {
                                return {
                                  ...blockField,
                                  label: 'Correos Electrónicos',
                                  labels: {
                                    singular: 'Correo Electrónico',
                                    plural: 'Correos Electrónicos',
                                  },
                                }
                              }
                              return blockField
                            })
                          : [],
                      }
                    }
                    return block
                  })
                : fieldsField.blocks,
            }
          } else if ('name' in field && field.name === 'submitButtonLabel') {
            return {
              ...field,
              label: 'Etiqueta del boton de envio',
            }
          } else if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              label: 'Mensaje de confirmación',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          } else if ('name' in field && field.name === 'confirmationType') {
            return {
              ...field,
              label: 'Tipo de confirmación',
              admin: {
                description:
                  'Elija si desea mostrar un mensaje en la página o redirigir a una página diferente después de enviar el formulario.',
              },
            }
          } else if ('name' in field && field.name === 'emails') {
            const emailsField = field as any
            return {
              ...emailsField,
              labels: {
                singular: 'Correo Electrónico',
                plural: 'Correos Electrónicos',
              },
              admin: {
                description:
                  'Envíe correos electrónicos personalizados al enviar el formulario. Use listas separadas por comas para enviar el mismo correo electrónico a varios destinatarios. Para hacer referencia a un valor de este formulario, escriba el nombre del campo entre llaves dobles, por ejemplo, {{firstName}}. Puede usar el comodín {{*}} para mostrar todos los datos y {{*:table}} para formatearlos como una tabla HTML en el correo electrónico.',
              },
              // Personalizar los subcampos dentro del array emails
              fields: emailsField.fields
                ? emailsField.fields.map((subField: any) => {
                    // Si es una fila, necesitamos procesar los campos dentro de la fila
                    if (subField.type === 'row' && subField.fields) {
                      return {
                        ...subField,
                        fields: subField.fields.map((rowField: any) => {
                          // Personalizar campos dentro de la fila
                          if (rowField.name === 'emailTo') {
                            return {
                              ...rowField,
                              label: 'Enviar a',
                              admin: {
                                description:
                                  'Direcciones de correo electrónico de los destinatarios principales. Separar múltiples direcciones con comas.',
                              },
                            }
                          } else if (rowField.name === 'cc') {
                            return {
                              ...rowField,
                              label: 'CC (Copia)',
                              admin: {
                                description:
                                  'Direcciones de correo electrónico que recibirán una copia visible del mensaje.',
                              },
                            }
                          } else if (rowField.name === 'bcc') {
                            return {
                              ...rowField,
                              label: 'CCO (Copia Oculta)',
                              admin: {
                                description:
                                  'Direcciones de correo electrónico que recibirán una copia oculta del mensaje.',
                              },
                            }
                          } else if (rowField.name === 'replyTo') {
                            return {
                              ...rowField,
                              label: 'Responder a',
                              admin: {
                                description:
                                  'Dirección de correo electrónico a la que se enviarán las respuestas.',
                              },
                            }
                          } else if (rowField.name === 'emailFrom') {
                            return {
                              ...rowField,
                              label: 'Remitente',
                              admin: {
                                description:
                                  'Dirección de correo electrónico del remitente del mensaje.',
                              },
                            }
                          }
                          return rowField
                        }),
                      }
                    }

                    // Campos directos (como subject y message)
                    if (subField.name === 'subject') {
                      return {
                        ...subField,
                        label: 'Asunto',
                        admin: {
                          description:
                            'Asunto del correo electrónico. Puede usar variables dinámicas como {{nombreCampo}}.',
                        },
                      }
                    } else if (subField.name === 'message') {
                      return {
                        ...subField,
                        label: 'Mensaje',
                        admin: {
                          description:
                            'Contenido del correo electrónico. Use {{nombreCampo}} para variables dinámicas, {{*}} para todos los datos, o {{*:table}} para formato de tabla.',
                        },
                      }
                    }
                    return subField
                  })
                : [],
            }
          }
          return field
        })
      },
      labels: {
        plural: 'Formularios',
        singular: 'Formulario',
      },
      admin: {
        description:
          'Esta es una colección de formularios que se crean en el CMS. Estos formularios son utilizados por el formulario de envío del sitio.',
      },
      indexes: [
        {
          fields: ['title'],
        },
      ],
      defaultPopulate: {
        title: true,
      },
      trash: true,
      access: {
        read: anyone,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
    },
    defaultToEmail: process.env.RESEND_DEFAULT_EMAIL,
    redirectRelationships: ['pages'],
  }),
  searchPlugin({
    collections: ['posts', 'products'],
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
      },
    },
  }),
  payloadCloudPlugin(),
]

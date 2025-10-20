import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'
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
import { contentLexicalEditor } from '@/fields/contentLexical'

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
  formBuilderPlugin({
    fields: {
      payment: false,
      email: {
        ...fields.email,
        labels: {
          singular: 'Correo Electrónico',
          plural: 'Correos Electrónicos',
        },
        fields: [
          ...(fields.email && 'fields' in fields.email
            ? fields.email.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                } else if ('name' in field && field.name === 'width') {
                  return {
                    ...field,
                    label: 'Ancho del campo (en porcentaje)',
                    admin: {
                      ...field.admin,
                      description: 'El ancho del campo como porcentaje',
                    },
                  }
                } else if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      checkbox: {
        ...fields.checkbox,
        labels: {
          singular: 'Casilla de verificación',
          plural: 'Casillas de verificación',
        },
        fields: [
          ...(fields.checkbox && 'fields' in fields.checkbox
            ? fields.checkbox.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El texto que se mostrará junto a la casilla de verificación',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo (en porcentaje)',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'required') {
                        return {
                          ...rowField,
                          label: 'Requerido',
                          admin: {
                            ...rowField.admin,
                            description: 'Si el campo es obligatorio o no',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                // Manejar campos directos (no dentro de rows)
                if ('name' in field && field.name === 'defaultValue') {
                  return {
                    ...field,
                    label: 'Valor predeterminado',
                    admin: {
                      ...field.admin,
                      description: 'El valor predeterminado de la casilla (marcada o desmarcada)',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      select: {
        ...fields.select,
        labels: {
          singular: 'Seleccionar',
          plural: 'Seleccionar',
        },
        fields: [
          ...(fields.select && 'fields' in fields.select
            ? fields.select.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'required') {
                        return {
                          ...rowField,
                          label: 'Requerido',
                          admin: {
                            ...rowField.admin,
                            description: 'Si el campo es obligatorio o no',
                          },
                        }
                      } else if (rowField.name === 'defaultValue') {
                        return {
                          ...rowField,
                          label: 'Valor predeterminado',
                          admin: {
                            ...rowField.admin,
                            description: 'El valor predeterminado seleccionado',
                          },
                        }
                      } else if (rowField.name === 'placeholder') {
                        return {
                          ...rowField,
                          label: 'Marcador de posición',
                          admin: {
                            ...rowField.admin,
                            description: 'El marcador de posición del campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                } else if ('name' in field && field.name === 'options') {
                  return {
                    ...field,
                    label: 'Opciones',
                    labels: {
                      singular: 'Opción',
                      plural: 'Opciones',
                    },
                    admin: {
                      ...field.admin,
                      description: 'Las opciones disponibles para seleccionar',
                    },
                    fields: field.fields
                      ? field.fields.map((subField: any) => {
                          // Manejar campos dentro de rows
                          if (subField.type === 'row' && subField.fields) {
                            return {
                              ...subField,
                              fields: subField.fields.map((rowField: any) => {
                                if (rowField.name === 'label') {
                                  return {
                                    ...rowField,
                                    label: 'Etiqueta',
                                    admin: {
                                      ...rowField.admin,
                                      description: 'El texto que se mostrará para esta opción',
                                    },
                                  }
                                } else if (rowField.name === 'value') {
                                  return {
                                    ...rowField,
                                    label: 'Valor',
                                    admin: {
                                      ...rowField.admin,
                                      description: 'El valor de la opción',
                                    },
                                  }
                                }
                                return rowField
                              }),
                            }
                          }

                          // Manejar campos directos (no dentro de rows)
                          if (subField.name === 'label') {
                            return {
                              ...subField,
                              label: 'Etiqueta',
                              admin: {
                                ...subField.admin,
                                description: 'El texto que se mostrará para esta opción',
                              },
                            }
                          } else if (subField.name === 'value') {
                            return {
                              ...subField,
                              label: 'Valor',
                              admin: {
                                ...subField.admin,
                                description: 'El valor de la opción',
                              },
                            }
                          }

                          return subField
                        })
                      : [],
                  }
                } else if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      text: {
        ...fields.text,
        labels: {
          singular: 'Texto',
          plural: 'Textos',
        },
        fields: [
          ...(fields.text && 'fields' in fields.text
            ? fields.text.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'defaultValue') {
                        return {
                          ...rowField,
                          label: 'Valor predeterminado',
                          admin: {
                            ...rowField.admin,
                            description: 'El valor predeterminado del campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      textarea: {
        ...fields.textarea,
        labels: {
          singular: 'Área de texto',
          plural: 'Áreas de texto',
        },
        fields: [
          ...(fields.textarea && 'fields' in fields.textarea
            ? fields.textarea.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'defaultValue') {
                        return {
                          ...rowField,
                          label: 'Valor predeterminado',
                          admin: {
                            ...rowField.admin,
                            description: 'El valor predeterminado del campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      number: {
        ...fields.number,
        labels: {
          singular: 'Número',
          plural: 'Números',
        },
        fields: [
          ...(fields.number && 'fields' in fields.number
            ? fields.number.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'defaultValue') {
                        return {
                          ...rowField,
                          label: 'Valor predeterminado',
                          admin: {
                            ...rowField.admin,
                            description: 'El número predeterminado del campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      date: {
        ...fields.date,
        labels: {
          singular: 'Fecha',
          plural: 'Fechas',
        },
        fields: [
          ...(fields.date && 'fields' in fields.date
            ? fields.date.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'required') {
                        return {
                          ...rowField,
                          label: 'Requerido',
                          admin: {
                            ...rowField.admin,
                            description: 'Si el campo es obligatorio o no',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                if ('name' in field && field.name === 'defaultValue') {
                  return {
                    ...field,
                    label: 'Valor predeterminado',
                    admin: {
                      ...field.admin,
                      description: 'La fecha predeterminada del campo',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      country: {
        ...fields.country,
        labels: {
          singular: 'País',
          plural: 'Países',
        },
        fields: [
          ...(fields.country && 'fields' in fields.country
            ? fields.country.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                } else if ('name' in field && field.name === 'label') {
                  return {
                    ...field,
                    label: 'Etiqueta del campo',
                    admin: {
                      ...field.admin,
                      description: 'El texto que se mostrará para este campo',
                    },
                  }
                } else if ('name' in field && field.name === 'width') {
                  return {
                    ...field,
                    label: 'Ancho del campo (en porcentaje)',
                    admin: {
                      ...field.admin,
                      description: 'El ancho del campo como porcentaje',
                    },
                  }
                } else if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      state: {
        ...fields.state,
        labels: {
          singular: 'Estado',
          plural: 'Estados',
        },
        fields: [
          ...(fields.state && 'fields' in fields.state
            ? fields.state.fields.map((field: any) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    ...field,
                    fields: field.fields.map((rowField: any) => {
                      if (rowField.name === 'name') {
                        return {
                          ...rowField,
                          label: 'Nombre',
                          admin: {
                            ...rowField.admin,
                            description:
                              'El nombre del campo (en minúsculas, sin caracteres especiales)',
                          },
                        }
                      } else if (rowField.name === 'label') {
                        return {
                          ...rowField,
                          label: 'Etiqueta',
                          admin: {
                            ...rowField.admin,
                            description: 'El texto que se mostrará para este campo',
                          },
                        }
                      } else if (rowField.name === 'width') {
                        return {
                          ...rowField,
                          label: 'Ancho del campo (en porcentaje)',
                          admin: {
                            ...rowField.admin,
                            description: 'El ancho del campo como porcentaje',
                          },
                        }
                      } else if (rowField.name === 'required') {
                        return {
                          ...rowField,
                          label: 'Requerido',
                          admin: {
                            ...rowField.admin,
                            description: 'Si el campo es obligatorio o no',
                          },
                        }
                      }
                      return rowField
                    }),
                  }
                }

                // Manejar campos directos (no dentro de rows)
                if ('name' in field && field.name === 'name') {
                  return {
                    ...field,
                    label: 'Nombre',
                    admin: {
                      ...field.admin,
                      description: 'El nombre del campo (en minúsculas, sin caracteres especiales)',
                    },
                  }
                } else if ('name' in field && field.name === 'label') {
                  return {
                    ...field,
                    label: 'Etiqueta',
                    admin: {
                      ...field.admin,
                      description: 'El texto que se mostrará para este campo',
                    },
                  }
                } else if ('name' in field && field.name === 'width') {
                  return {
                    ...field,
                    label: 'Ancho del campo',
                    admin: {
                      ...field.admin,
                      description: 'El ancho del campo como porcentaje',
                    },
                  }
                } else if ('name' in field && field.name === 'required') {
                  return {
                    ...field,
                    label: 'Requerido',
                    admin: {
                      ...field.admin,
                      description: 'Si el campo es obligatorio o no',
                    },
                  }
                }

                return field
              })
            : []),
        ],
      },
      message: {
        ...fields.message,
        labels: {
          singular: 'Mensaje',
          plural: 'Mensajes',
        },
        fields: [
          ...(fields.message && 'fields' in fields.message
            ? fields.message.fields.map((field: any) => {
                if ('name' in field && field.name === 'message') {
                  return {
                    ...field,
                    label: 'Mensaje',
                    admin: {
                      ...field.admin,
                      description: 'El contenido del mensaje que se mostrará',
                    },
                  }
                }

                return field
              })
            : []),
        ],
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
        group: 'Contenido',
      },
      access: {
        read: anyone,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
    },
    formOverrides: {
      defaultPopulate: {
        title: true,
        fields: true,
        submitButtonLabel: true,
        confirmationType: true,
        confirmationMessage: true,
        redirect: true,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'title') {
            return {
              ...field,
              label: 'Titulo',
            }
          } else if ('name' in field && field.name === 'fields') {
            const fieldsField = field as any
            return {
              ...fieldsField,
              label: 'Campos',
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
              editor: contentLexicalEditor,
            }
          } else if ('name' in field && field.name === 'confirmationType') {
            const confirmationTypeField = field as any
            return {
              ...confirmationTypeField,
              label: 'Tipo de confirmación',
              admin: {
                ...confirmationTypeField.admin,
                description:
                  'Elija si desea mostrar un mensaje en la página o redirigir a una página diferente después de enviar el formulario.',
              },
              options: confirmationTypeField.options
                ? confirmationTypeField.options.map((option: any) => {
                    if (option.value === 'message') {
                      return {
                        ...option,
                        label: 'Mensaje',
                      }
                    } else if (option.value === 'redirect') {
                      return {
                        ...option,
                        label: 'Redirigir',
                      }
                    }
                    return option
                  })
                : [],
              fields: confirmationTypeField.fields
                ? confirmationTypeField.fields.map((subField: any) => {
                    if (subField.name === 'redirect') {
                      return {
                        ...subField,
                        label: 'Redirigir a',
                        admin: {
                          ...subField.admin,
                          description: 'Seleccione la página a la que desea redirigir',
                        },
                      }
                    }
                    return subField
                  })
                : [],
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
              fields: emailsField.fields
                ? emailsField.fields.map((subField: any) => {
                    if (subField.type === 'row' && subField.fields) {
                      return {
                        ...subField,
                        fields: subField.fields.map((rowField: any) => {
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

                    if (subField.name === 'subject') {
                      return {
                        ...subField,
                        label: 'Asunto',
                        admin: {
                          ...subField.admin,
                          description:
                            'Asunto del correo electrónico. Puede usar variables dinámicas como {{nombreCampo}}.',
                        },
                      }
                    } else if (subField.name === 'message') {
                      return {
                        ...subField,
                        label: 'Mensaje',
                        admin: {
                          ...subField.admin,
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
        group: 'Contenido',
      },
      indexes: [
        {
          fields: ['title'],
        },
      ],
      trash: true,
      access: {
        read: isAdminOrEditor,
        create: isAdminOrEditor,
        update: isAdminOrEditor,
        delete: isAdmin,
      },
    },
    defaultToEmail: process.env.RESEND_DEFAULT_EMAIL,
    redirectRelationships: ['pages'],
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

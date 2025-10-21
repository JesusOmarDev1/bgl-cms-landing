import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAdminOrEditorFieldLevel } from '@/access/isAdminOrEditor'
import { isAdmin } from '@/access/isAdmin'
import { isAuthenticatedOrPublished } from '@/access/isLoggedInOrPublished'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { contentLexicalEditor } from '@/fields/contentLexical'
import { NumberField } from '@/fields/Number'
import { revalidateProduct, revalidateDelete } from '../Products/hooks/revalidateProducts'

export const Services: CollectionConfig = {
  slug: 'services',
  trash: true,
  indexes: [
    {
      fields: ['title', 'slug'],
    },
  ],
  defaultSort: 'createdAt',
  access: {
    read: isAuthenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  labels: {
    singular: {
      en: 'Services',
      es: 'Servicio',
    },
    plural: {
      en: 'Services',
      es: 'Servicios',
    },
  },
  defaultPopulate: {
    title: true,
    slug: true,
    total: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['heroImage', 'title', 'total', 'createdAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
        })

        return path
      },
    },
    useAsTitle: 'title',
    description: 'Administra los servicios del sitio: crea, edita y elimina artículos',
    group: 'Contenido',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'General Information',
            es: 'Información General',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: {
                en: 'Title',
                es: 'Título',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Hero Image',
                es: 'Imagen de Portada',
              },
              required: true,
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              label: {
                en: 'Related Services',
                es: 'Servicios Relacionados',
              },
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'services',
            },
            {
              name: 'content',
              type: 'richText',
              editor: contentLexicalEditor,
              label: {
                en: 'Content',
                es: 'Contenido',
              },
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: {
            en: 'SEO & Metadata',
            es: 'SEO y Metadatos',
          },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: {
                  en: 'Title for SEO',
                  es: 'Título para SEO',
                },
              },
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                label: {
                  en: 'Image for SEO',
                  es: 'Imagen para SEO',
                },
              },
            }),

            MetaDescriptionField({
              overrides: {
                label: {
                  en: 'Description for SEO',
                  es: 'Descripción para SEO',
                },
              },
            }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      label: {
        en: 'Published Date',
        es: 'Fecha de Publicación',
      },
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    ...slugField(),
    ...NumberField(
      {
        name: 'price',
        min: 0,
        label: {
          en: 'Price',
          es: 'Precio',
        },
        admin: {
          position: 'sidebar',
        },
        access: {
          read: isAdminOrEditorFieldLevel,
        },
      },
      {
        prefix: '$ ',
        suffix: ' MXN',
        thousandSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    ),
    ...NumberField(
      {
        name: 'discount',
        min: 0,
        label: {
          en: 'Discount',
          es: 'Descuento',
        },
        admin: {
          position: 'sidebar',
        },
        access: {
          read: isAdminOrEditorFieldLevel,
        },
      },
      {
        prefix: '$ ',
        suffix: ' MXN',
        thousandSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    ),
    {
      name: 'iva',
      type: 'checkbox',
      label: {
        en: 'Apply IVA?',
        es: '¿Aplicar IVA?',
      },
      admin: {
        position: 'sidebar',
        description: 'Se aplica el 16% de IVA al precio final',
      },
      access: {
        read: isAdminOrEditorFieldLevel,
      },
    },
    ...NumberField(
      {
        name: 'total',
        min: 0,
        label: {
          en: 'Total',
          es: 'Total',
        },
        admin: {
          position: 'sidebar',
        },
        hooks: {
          beforeChange: [
            ({ siblingData, value }) => {
              // Validar que el precio existe y es válido
              if (
                !siblingData?.price ||
                typeof siblingData.price !== 'number' ||
                siblingData.price < 0
              ) {
                return value // Si no hay precio válido, mantener el valor actual
              }

              // Calcular subtotal: precio base menos descuento (si existe y es válido)
              const discount =
                siblingData.discount &&
                typeof siblingData.discount === 'number' &&
                siblingData.discount > 0
                  ? siblingData.discount
                  : 0

              const subtotal = Math.max(0, siblingData.price - discount)

              // Aplicar IVA si está habilitado (16% = 1.16)
              const applyIVA = siblingData.iva === true
              const total = applyIVA ? subtotal * 1.16 : subtotal

              // Redondear a 2 decimales para evitar problemas de precisión
              return Math.round(total * 100) / 100
            },
          ],
        },
        access: {
          read: isAdminOrEditorFieldLevel,
        },
      },
      {
        prefix: '$ ',
        suffix: ' MXN',
        thousandSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    ),
  ],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 100,
  },
}

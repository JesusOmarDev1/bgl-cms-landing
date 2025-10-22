import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const seoFields: Field[] = [
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
      admin: {
        description: 'Título que aparecerá en los resultados de búsqueda y redes sociales',
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
      admin: {
        description: 'Imagen que aparecerá cuando se comparta en redes sociales',
      },
    },
  }),
  MetaDescriptionField({
    overrides: {
      label: {
        en: 'Description for SEO',
        es: 'Descripción para SEO',
      },
      admin: {
        description: 'Descripción que aparecerá en los resultados de búsqueda',
      },
    },
  }),
  PreviewField({
    hasGenerateFn: true,
    titlePath: 'meta.title',
    descriptionPath: 'meta.description',
  }),
]

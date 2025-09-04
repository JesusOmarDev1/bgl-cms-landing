import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    label: {
      en: 'Slug',
      es: 'Slug',
    },
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'content',
    type: 'richText',
    label: {
      en: 'Content',
      es: 'Contenido',
    },
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'heroImage',
    type: 'upload',
    relationTo: 'media',
    label: {
      en: 'Hero Image',
      es: 'Imagen Principal',
    },
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'publishedAt',
    type: 'date',
    label: {
      en: 'Published Date',
      es: 'Fecha de Publicación',
    },
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: {
      en: 'Meta',
      es: 'Metadatos',
    },
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: {
          en: 'Title',
          es: 'Título',
        },
      },
      {
        type: 'text',
        name: 'description',
        label: {
          en: 'Description',
          es: 'Descripción',
        },
      },
      {
        name: 'image',
        label: {
          en: 'Media',
          es: 'Archivo',
        },
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: 'Categories',
    name: 'categories',
    type: 'array',
    labels: {
      singular: {
        en: 'Category',
        es: 'Categoría',
      },
      plural: {
        en: 'Categories',
        es: 'Categorías',
      },
    },
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
        label: {
          en: 'Relation To',
          es: 'Relación Con',
        },
      },
      {
        name: 'categoryID',
        type: 'text',
        label: {
          en: 'Category ID',
          es: 'ID de Categoría',
        },
      },
      {
        name: 'title',
        type: 'text',
        label: {
          en: 'Title',
          es: 'Título',
        },
      },
    ],
  },
]

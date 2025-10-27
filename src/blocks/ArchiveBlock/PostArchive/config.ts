import type { Block } from 'payload'

import { contentLexicalEditor } from '@/fields/contentLexical'

export const PostArchiveBlock: Block = {
  slug: 'post-archive',
  interfaceName: 'PostArchiveBlock',

  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: contentLexicalEditor,
      label: {
        en: 'Intro Content',
        es: 'Contenido de Introducción',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      label: {
        en: 'Populate By',
        es: 'Rellenar Por',
      },
      defaultValue: 'collection',
      options: [
        {
          label: {
            en: 'Collection',
            es: 'Colección',
          },
          value: 'collection',
        },
        {
          label: {
            en: 'Selection',
            es: 'Selección',
          },
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: {
        en: 'Relation To',
        es: 'Relación Con',
      },
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: {
        en: 'Categories',
        es: 'Categorías',
      },
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: {
        en: 'Number of Documents to Show',
        es: 'Número de Documentos a Mostrar',
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: {
        en: 'Selected Documents',
        es: 'Documentos Seleccionados',
      },
      relationTo: ['posts'],
    },
  ],
  labels: {
    singular: {
      en: 'Archive of Post',
      es: 'Archivo de Publicacion',
    },
    plural: {
      en: 'Archive of Posts',
      es: 'Archivos de Publicaciones',
    },
  },
}

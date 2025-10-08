import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ServiceArchiveBlock: Block = {
  slug: 'service-archive',
  interfaceName: 'ServiceArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
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
          label: 'Services',
          value: 'services',
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
      en: 'Archive',
      es: 'Archivo',
    },
    plural: {
      en: 'Archives',
      es: 'Archivos',
    },
  },
}

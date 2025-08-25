import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: {
      en: 'Size',
      es: 'Tamaño',
    },
    defaultValue: 'oneThird',
    options: [
      {
        label: {
          en: 'One Third',
          es: 'Un Tercio',
        },
        value: 'oneThird',
      },
      {
        label: {
          en: 'Half',
          es: 'Mitad',
        },
        value: 'half',
      },
      {
        label: {
          en: 'Two Thirds',
          es: 'Dos Tercios',
        },
        value: 'twoThirds',
      },
      {
        label: {
          en: 'Full',
          es: 'Completo',
        },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: {
      en: 'Content',
      es: 'Contenido',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: {
      en: 'Enable Link',
      es: 'Habilitar Enlace',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: {
      en: 'Content',
      es: 'Contenido',
    },
    plural: {
      en: 'Content Blocks',
      es: 'Bloques de Contenido',
    },
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}

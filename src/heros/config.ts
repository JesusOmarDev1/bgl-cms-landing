import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        es: 'Tipo',
      },
      options: [
        {
          label: {
            en: 'None',
            es: 'Ninguno',
          },
          value: 'none',
        },
        {
          label: {
            en: 'High Impact',
            es: 'Alto Impacto',
          },
          value: 'highImpact',
        },
        {
          label: {
            en: 'Medium Impact',
            es: 'Impacto Medio',
          },
          value: 'mediumImpact',
        },
        {
          label: {
            en: 'Low Impact',
            es: 'Bajo Impacto',
          },
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
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
        en: 'Content',
        es: 'Contenido',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: {
        en: 'Media',
        es: 'Archivo',
      },
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}

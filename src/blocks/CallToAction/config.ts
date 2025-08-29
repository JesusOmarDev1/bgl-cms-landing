import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
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
      appearances: ['default'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: {
      en: 'Call to Actions',
      es: 'Llamadas a la Acción',
    },
    singular: {
      en: 'Call to Action',
      es: 'Llamada a la Acción',
    },
  },
}

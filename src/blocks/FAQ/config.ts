import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'faqs',
      type: 'array',
      label: {
        en: 'FAQ Items',
        es: 'Elementos FAQ',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: {
            en: 'Question',
            es: 'Pregunta',
          },
          required: true,
        },
        {
          name: 'answer',
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
            en: 'Answer',
            es: 'Respuesta',
          },
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: {
      en: 'FAQ',
      es: 'Preguntas Frecuentes',
    },
    singular: {
      en: 'FAQ',
      es: 'Pregunta Frecuente',
    },
  },
}

import type { Block } from 'payload'

import { basicLexicalEditor } from '@/fields/basicLexical'

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
      labels: {
        singular: {
          en: 'FAQ Item',
          es: 'Elemento FAQ',
        },
        plural: {
          en: 'FAQ Items',
          es: 'Elementos FAQ',
        },
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/FAQ/RowLabel#RowLabel',
        },
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
          editor: basicLexicalEditor,
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

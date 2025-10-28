import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  labels: {
    singular: {
      en: 'Code',
      es: 'Código',
    },
    plural: {
      en: 'Codes',
      es: 'Codigos',
    },
  },
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      label: {
        en: 'Language',
        es: 'Lenguaje',
      },
      type: 'select',
      defaultValue: 'json',
      options: [
        {
          label: {
            en: 'JSON',
            es: 'JSON',
          },
          value: 'json',
        },
        {
          label: {
            en: 'Yaml',
            es: 'Yaml',
          },
          value: 'yaml',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}

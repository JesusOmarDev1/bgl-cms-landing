import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  labels: {
    singular: {
      en: 'Code',
      es: 'Código',
    },
    plural: {
      en: 'Code Blocks',
      es: 'Bloques de Código',
    },
  },
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        {
          label: {
            en: 'Typescript',
            es: 'Typescript',
          },
          value: 'typescript',
        },
        {
          label: {
            en: 'JavaScript',
            es: 'JavaScript',
          },
          value: 'javascript',
        },
        {
          label: {
            en: 'CSS',
            es: 'CSS',
          },
          value: 'css',
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

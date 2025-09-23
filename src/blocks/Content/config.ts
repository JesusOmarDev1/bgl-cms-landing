import type { Block, Field } from 'payload'

import { contentLexicalEditor } from '@/fields/contentLexical'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: {
      en: 'Column Size',
      es: 'Tamaño de Columna',
    },
    admin: {
      description: {
        en: 'Choose the width of this column',
        es: 'Elige el ancho de esta columna',
      },
      width: '50%',
    },
    defaultValue: 'medium',
    options: [
      {
        label: {
          en: 'Small',
          es: 'Pequeño',
        },
        value: 'small',
      },
      {
        label: {
          en: 'Medium',
          es: 'Mediano',
        },
        value: 'medium',
      },
      {
        label: {
          en: 'Large',
          es: 'Grande',
        },
        value: 'large',
      },
      {
        label: {
          en: 'Full Width',
          es: 'Ancho Completo',
        },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: contentLexicalEditor,
    label: {
      en: 'Rich Text',
      es: 'Texto Enriquecido',
    },
  },
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: {
      en: 'Content Block',
      es: 'Bloque de Contenido',
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
      label: {
        en: 'Content Columns',
        es: 'Columnas de Contenido',
      },
      type: 'array',
      admin: {
        description: {
          en: 'Add columns to create your layout. Each column can have different sizes and content.',
          es: 'Añade columnas para crear tu layout. Cada columna puede tener diferentes tamaños y contenido.',
        },
        initCollapsed: true,
      },
      minRows: 1,
      maxRows: 12,
      fields: columnFields,
    },
  ],
}

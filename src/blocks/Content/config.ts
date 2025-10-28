import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlockquoteFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  ParagraphFeature,
  SubscriptFeature,
  SuperscriptFeature,
  TextStateFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { FullscreenEditorFeature } from '@payload-bites/fullscreen-editor'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: {
      en: 'Column Width',
      es: 'Ancho de Columna',
    },
    admin: {
      description: {
        en: 'Choose how much space this column takes. Auto adjusts based on number of columns.',
        es: 'Elige cuánto espacio ocupa esta columna. Se ajusta automáticamente según el número de columnas.',
      },
      width: '50%',
    },
    defaultValue: 'auto',
    options: [
      {
        label: {
          en: '🔄 Auto (Equal Width)',
          es: '🔄 Automático (Ancho Igual)',
        },
        value: 'auto',
      },
      {
        label: {
          en: '📱 1/4 Width (25%)',
          es: '📱 1/4 de Ancho (25%)',
        },
        value: 'quarter',
      },
      {
        label: {
          en: '📄 1/3 Width (33%)',
          es: '📄 1/3 de Ancho (33%)',
        },
        value: 'third',
      },
      {
        label: {
          en: '📋 1/2 Width (50%)',
          es: '📋 1/2 de Ancho (50%)',
        },
        value: 'half',
      },
      {
        label: {
          en: '📊 2/3 Width (66%)',
          es: '📊 2/3 de Ancho (66%)',
        },
        value: 'two-thirds',
      },
      {
        label: {
          en: '📺 3/4 Width (75%)',
          es: '📺 3/4 de Ancho (75%)',
        },
        value: 'three-quarters',
      },
      {
        label: {
          en: '🖥️ Full Width (100%)',
          es: '🖥️ Ancho Completo (100%)',
        },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: [
        ParagraphFeature(),
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
        FixedToolbarFeature({ applyToFocusedEditor: true }),
        InlineToolbarFeature(),
        UnderlineFeature(),
        SubscriptFeature(),
        SuperscriptFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        IndentFeature(),
        AlignFeature(),
        HorizontalRuleFeature(),
        TextStateFeature({
          state: {
            color: {
              'bg-red': {
                css: {
                  'background-color': 'red',
                  color: 'white',
                },
                label: 'Rojo',
              },
              'bg-orange': {
                css: {
                  'background-color': 'orange',
                  color: 'white',
                },
                label: 'Naranja',
              },
              'bg-yellow': {
                css: {
                  'background-color': 'yellow',
                  color: 'black',
                },
                label: 'Amarillo',
              },
              'bg-green': {
                css: {
                  'background-color': 'green',
                  color: 'white',
                },
                label: 'Verde',
              },
              'bg-blue': {
                css: {
                  'background-color': 'blue',
                  color: 'white',
                },
                label: 'Azul',
              },
              'bg-purple': {
                css: {
                  'background-color': 'purple',
                  color: 'white',
                },
                label: 'Morado',
              },
              'bg-pink': {
                css: {
                  'background-color': 'pink',
                  color: 'black',
                },
                label: 'Rosa',
              },
              'bg-gray': {
                css: {
                  'background-color': 'gray',
                  color: 'white',
                },
                label: 'Gris',
              },
              'bg-black': {
                css: {
                  'background-color': 'black',
                  color: 'white',
                },
                label: 'Negro',
              },
              'bg-white': {
                css: {
                  'background-color': 'white',
                  color: 'black',
                },
                label: 'Blanco',
              },
              'text-red': {
                css: {
                  color: 'red',
                },
                label: 'Rojo',
              },
              'text-orange': {
                css: {
                  color: 'orange',
                },
                label: 'Naranja',
              },
              'text-yellow': {
                css: {
                  color: 'yellow',
                },
                label: 'Amarillo',
              },
              'text-green': {
                css: {
                  color: 'green',
                },
                label: 'Verde',
              },
              'text-blue': {
                css: {
                  color: 'blue',
                },
                label: 'Azul',
              },
              'text-purple': {
                css: {
                  color: 'purple',
                },
                label: 'Púrpura',
              },
              'text-pink': {
                css: {
                  color: 'pink',
                },
                label: 'Rosa',
              },
            },
            // Estados de subrayado
            underline: {
              solid: {
                label: 'Sólido',
                css: {
                  'text-decoration': 'underline',
                  'text-underline-offset': '4px',
                },
              },
              'yellow-dashed': {
                label: 'Amarillo Discontinuo',
                css: {
                  'text-decoration': 'underline dashed',
                  'text-decoration-color': '#eab308',
                  'text-underline-offset': '4px',
                },
              },
              'blue-wavy': {
                label: 'Azul Ondulado',
                css: {
                  'text-decoration': 'underline wavy',
                  'text-decoration-color': '#3b82f6',
                  'text-underline-offset': '4px',
                },
              },
              'red-double': {
                label: 'Rojo Doble',
                css: {
                  'text-decoration': 'underline double',
                  'text-decoration-color': '#ef4444',
                  'text-underline-offset': '4px',
                },
              },
            },
            // Estados de resaltado
            highlight: {
              yellow: {
                label: 'Amarillo',
                css: {
                  'background-color': '#fef08a',
                  color: '#713f12',
                  padding: '2px 4px',
                  'border-radius': '3px',
                },
              },
              green: {
                label: 'Verde',
                css: {
                  'background-color': '#bbf7d0',
                  color: '#14532d',
                  padding: '2px 4px',
                  'border-radius': '3px',
                },
              },
              blue: {
                label: 'Azul',
                css: {
                  'background-color': '#bfdbfe',
                  color: '#1e3a8a',
                  padding: '2px 4px',
                  'border-radius': '3px',
                },
              },
              pink: {
                label: 'Rosa',
                css: {
                  'background-color': '#fbcfe8',
                  color: '#831843',
                  padding: '2px 4px',
                  'border-radius': '3px',
                },
              },
            },
          },
        }),
        ChecklistFeature(),
        BlockquoteFeature(),
        FullscreenEditorFeature(),
      ],
    }),
    label: {
      en: 'Content',
      es: 'Contenido',
    },
  },
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: {
      en: '📝 Multi-Column Layout',
      es: '📝 Layout Multi-Columna',
    },
    plural: {
      en: '📝 Multi-Column Layouts',
      es: '📝 Layouts Multi-Columna',
    },
  },
  interfaceName: 'ContentBlock',

  fields: [
    {
      name: 'layoutType',
      type: 'select',
      label: {
        en: 'Quick Layout',
        es: 'Layout Rápido',
      },
      admin: {
        description: {
          en: '🚀 Choose a preset layout or use "Custom" for manual control',
          es: '🚀 Elige un layout predefinido o usa "Personalizado" para control manual',
        },
        width: '50%',
      },
      defaultValue: 'custom',
      options: [
        {
          label: {
            en: '🎯 Custom Layout',
            es: '🎯 Layout Personalizado',
          },
          value: 'custom',
        },
        {
          label: {
            en: '📱 Single Column (100%)',
            es: '📱 Una Columna (100%)',
          },
          value: 'single',
        },
        {
          label: {
            en: '📋 Two Equal Columns (50% | 50%)',
            es: '📋 Dos Columnas Iguales (50% | 50%)',
          },
          value: 'two-equal',
        },
        {
          label: {
            en: '📊 Two Unequal (33% | 67%)',
            es: '📊 Dos Desiguales (33% | 67%)',
          },
          value: 'two-unequal',
        },
        {
          label: {
            en: '📺 Two Unequal (67% | 33%)',
            es: '📺 Dos Desiguales (67% | 33%)',
          },
          value: 'two-unequal-reverse',
        },
        {
          label: {
            en: '🖥️ Three Equal Columns',
            es: '🖥️ Tres Columnas Iguales',
          },
          value: 'three-equal',
        },
        {
          label: {
            en: '📄 Sidebar Left (25% | 75%)',
            es: '📄 Sidebar Izquierda (25% | 75%)',
          },
          value: 'sidebar-left',
        },
        {
          label: {
            en: '📄 Sidebar Right (75% | 25%)',
            es: '📄 Sidebar Derecha (75% | 25%)',
          },
          value: 'sidebar-right',
        },
      ],
    },
    {
      name: 'columns',
      label: {
        en: 'Content Columns',
        es: 'Columnas de Contenido',
      },
      type: 'array',
      labels: {
        singular: {
          en: 'Column',
          es: 'Columna',
        },
        plural: {
          en: 'Columns',
          es: 'Columnas',
        },
      },
      admin: {
        description: {
          en: '📝 Add content to each column. Use the Quick Layout above for common arrangements.',
          es: '📝 Añade contenido a cada columna. Usa el Layout Rápido arriba para arreglos comunes.',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Content/RowLabel#ColumnRowLabel',
        },
      },
      minRows: 1,
      maxRows: 6,
      fields: columnFields,
    },
  ],
}

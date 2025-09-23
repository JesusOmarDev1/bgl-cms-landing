import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  AlignFeature,
  UnorderedListFeature,
  OrderedListFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  TextStateFeature,
  defaultColors,
  ChecklistFeature,
  BlockquoteFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    AlignFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    HorizontalRuleFeature(),
    InlineToolbarFeature(),
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
            label: 'Amarillo Punteado',
            css: {
              'text-decoration': 'underline dashed',
              'text-decoration-color': 'light-dark(#EAB308,yellow)',
              'text-underline-offset': '4px',
            },
          },
          'blue-wavy': {
            label: 'Azul Ondulado',
            css: {
              'text-decoration': 'underline wavy',
              'text-decoration-color': 'light-dark(#3B82F6,#60A5FA)',
              'text-underline-offset': '4px',
            },
          },
          'red-double': {
            label: 'Rojo Doble',
            css: {
              'text-decoration': 'underline double',
              'text-decoration-color': 'light-dark(#EF4444,#F87171)',
              'text-underline-offset': '4px',
            },
          },
        },
        // Estados de resaltado
        highlight: {
          yellow: {
            label: 'Amarillo',
            css: {
              'background-color': 'light-dark(#FEF08A,#CA8A04)',
              color: 'light-dark(#713F12,#FEF3C7)',
              padding: '2px 4px',
              'border-radius': '3px',
            },
          },
          green: {
            label: 'Verde',
            css: {
              'background-color': 'light-dark(#BBF7D0,#15803D)',
              color: 'light-dark(#14532D,#DCFCE7)',
              padding: '2px 4px',
              'border-radius': '3px',
            },
          },
          blue: {
            label: 'Azul',
            css: {
              'background-color': 'light-dark(#BFDBFE,#1D4ED8)',
              color: 'light-dark(#1E3A8A,#DBEAFE)',
              padding: '2px 4px',
              'border-radius': '3px',
            },
          },
          pink: {
            label: 'Rosa',
            css: {
              'background-color': 'light-dark(#FBCFE8,#BE185D)',
              color: 'light-dark(#831843,#FCE7F3)',
              padding: '2px 4px',
              'border-radius': '3px',
            },
          },
        },
      },
    }),
    ChecklistFeature(),
    BlockquoteFeature(),
  ],
})

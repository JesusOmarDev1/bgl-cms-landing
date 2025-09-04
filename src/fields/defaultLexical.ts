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
  UploadFeature,
  defaultColors,
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
          ...defaultColors.background,
          ...defaultColors.text,
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
    UploadFeature(),
  ],
})

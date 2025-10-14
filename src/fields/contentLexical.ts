import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  TextStateFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { FullscreenEditorFeature } from '@payload-bites/fullscreen-editor'

import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { Button } from '../blocks/Button/config'
import { MediaBlock } from '../blocks/MediaBlock/config'
import { QRCodeBlock } from '@/blocks/QRCodeBlock/config'

export const contentLexicalEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [Banner, Code, Button, MediaBlock, QRCodeBlock] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
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
    ]
  },
})

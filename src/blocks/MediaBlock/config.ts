import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: {
      en: 'Media Block',
      es: 'Bloque de Medios',
    },
    plural: {
      en: 'Media Blocks',
      es: 'Bloques de Medios',
    },
  },
  interfaceName: 'MediaBlock',

  fields: [
    {
      name: 'displayType',
      type: 'select',
      label: {
        en: 'Display Type',
        es: 'Tipo de Visualización',
      },
      defaultValue: 'single',
      options: [
        {
          label: {
            en: 'Single Media',
            es: 'Medio Único',
          },
          value: 'single',
        },
        {
          label: {
            en: 'Multiple Media (Carousel)',
            es: 'Múltiples Medios (Carrusel)',
          },
          value: 'carousel',
        },
      ],
      required: true,
      admin: {
        description: {
          en: 'Choose whether to display a single media item or multiple media items in a carousel',
          es: 'Elige si mostrar un solo elemento multimedia o múltiples elementos en un carrusel',
        },
      },
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Media',
        es: 'Medio',
      },
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.displayType === 'single',
        description: {
          en: 'Single media item to display',
          es: 'Elemento multimedia único a mostrar',
        },
      },
    },
    {
      name: 'mediaItems',
      type: 'array',
      label: {
        en: 'Media Items',
        es: 'Elementos Multimedia',
      },
      labels: {
        singular: {
          en: 'Media Item',
          es: 'Elemento Multimedia',
        },
        plural: {
          en: 'Media Items',
          es: 'Elementos Multimedia',
        },
      },
      minRows: 2,
      maxRows: 10,
      admin: {
        condition: (data, siblingData) => siblingData?.displayType === 'carousel',
        description: {
          en: 'Multiple media items to display in a carousel',
          es: 'Múltiples elementos multimedia para mostrar en un carrusel',
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/MediaBlock/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Media',
            es: 'Medio',
          },
          required: true,
        },
      ],
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: {
        en: 'Aspect Ratio',
        es: 'Relación de Aspecto',
      },
      defaultValue: '16/9',
      options: [
        {
          label: {
            en: '1:1 - Square (Perfect for Instagram posts, profile pictures)',
            es: '1:1 - Cuadrado (Perfecto para posts de Instagram, fotos de perfil)',
          },
          value: '1/1',
        },
        {
          label: {
            en: '16:9 - Widescreen (Ideal for videos, banners, landscape photos)',
            es: '16:9 - Panorámico (Ideal para videos, banners, fotos horizontales)',
          },
          value: '16/9',
        },
        {
          label: {
            en: 'Auto - Original size (Maintains the original proportions of each media)',
            es: 'Auto - Tamaño original (Mantiene las proporciones originales de cada medio)',
          },
          value: 'auto',
        },
      ],
      admin: {
        description: {
          en: 'Choose how the media should be displayed. Square is great for uniform galleries, widescreen for cinematic content, and auto preserves original dimensions.',
          es: 'Elige cómo se deben mostrar los medios. Cuadrado es ideal para galerías uniformes, panorámico para contenido cinematográfico, y auto preserva las dimensiones originales.',
        },
      },
    },
  ],
}

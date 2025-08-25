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
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

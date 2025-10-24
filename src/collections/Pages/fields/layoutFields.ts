import type { Field } from 'payload'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { FAQ } from '@/blocks/FAQ/config'
import { PostArchiveBlock } from '@/blocks/ArchiveBlock/PostArchive/config'
import { ServiceArchiveBlock } from '@/blocks/ArchiveBlock/ServiceArchive/config'

export const layoutFields: Field[] = [
  {
    name: 'layout',
    type: 'blocks',
    blocks: [
      CallToAction,
      Content,
      MediaBlock,
      FormBlock,
      FAQ,
      PostArchiveBlock,
      ServiceArchiveBlock,
    ],
    required: true,
    label: {
      en: 'Layout',
      es: 'Diseño de Página',
    },
  },
]

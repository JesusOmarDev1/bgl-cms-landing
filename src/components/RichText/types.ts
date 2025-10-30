import {
  DefaultNodeTypes,
  SerializedBlockNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  QRCodeBlock as QRCodeBlockProps,
  TableBlock as TableBlockProps,
  DownloadLinkBlock as DownloadLinkBlockProps,
} from '@/payload-types'
import { CodeBlockProps } from '@/blocks/Code/Component'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | ButtonBlockProps
      | QRCodeBlockProps
      | TableBlockProps
      | DownloadLinkBlockProps
    >

export type RichTextProps = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

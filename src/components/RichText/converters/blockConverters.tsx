import React from 'react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { ButtonBlock } from '@/blocks/Button/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { QRCodeBlock } from '@/blocks/QRCodeBlock/Component'
import { TableBlock } from '@/blocks/Table/Component'
import { DownloadLinkBlock } from '@/blocks/DownloadLink/Component'
import { StepperBlock } from '@/blocks/Stepper/Component'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  QRCodeBlock as QRCodeBlockProps,
  TableBlock as TableBlockProps,
  DownloadLinkBlock as DownloadLinkBlockProps,
  CodeBlock as CodeBlockProps,
  StepperBlock as StepperBlockProps,
} from '@/payload-types'

export const blockConverters = {
  banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
    <BannerBlock className="my-4" {...node.fields} />
  ),

  button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => {
    const { align, ...rest } = node.fields
    return <ButtonBlock className="my-4" align={align ?? undefined} {...rest} />
  },

  'qr-code-block': ({ node }: { node: SerializedBlockNode<QRCodeBlockProps> }) => (
    <QRCodeBlock className="my-4" {...node.fields} />
  ),

  mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
    <MediaBlock
      className="my-4"
      imgClassName="m-0"
      {...node.fields}
      captionClassName="mx-auto max-w-4xl"
      enableGutter={false}
      disableInnerContainer={true}
    />
  ),

  code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
    <CodeBlock className="my-4" {...node.fields} />
  ),

  cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
    <CallToActionBlock className="my-4" {...node.fields} />
  ),

  table: ({ node }: { node: SerializedBlockNode<TableBlockProps> }) => (
    <TableBlock className="my-4" {...node.fields} />
  ),

  stepper: ({ node }: { node: SerializedBlockNode<StepperBlockProps> }) => (
    <StepperBlock className="my-4" {...node.fields} />
  ),

  downloadLink: ({ node }: { node: SerializedBlockNode<DownloadLinkBlockProps> }) => (
    <DownloadLinkBlock className="my-4" {...node.fields} />
  ),
}

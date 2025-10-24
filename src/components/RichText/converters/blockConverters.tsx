import React from 'react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { ButtonBlock } from '@/blocks/Button/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { QRCodeBlock } from '@/blocks/QRCodeBlock/Component'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  QRCodeBlock as QRCodeBlockProps,
} from '@/payload-types'
import { CodeBlockProps } from '@/blocks/Code/Component'

export const blockConverters = {
  banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
    <BannerBlock className="col-start-2 mb-4" {...node.fields} />
  ),

  button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => {
    const { align, ...rest } = node.fields
    return <ButtonBlock className="col-start-2 mb-4" align={align ?? undefined} {...rest} />
  },

  'qr-code-block': ({ node }: { node: SerializedBlockNode<QRCodeBlockProps> }) => (
    <QRCodeBlock className="col-start-2 mb-4" {...node.fields} />
  ),

  mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
    <MediaBlock
      className="col-start-1 col-span-3"
      imgClassName="m-0"
      {...node.fields}
      captionClassName="mx-auto max-w-4xl"
      enableGutter={false}
      disableInnerContainer={true}
    />
  ),

  code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
    <CodeBlock className="col-start-2" {...node.fields} />
  ),

  cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
    <CallToActionBlock {...node.fields} />
  ),
}

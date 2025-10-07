'use client'

import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  QRCodeBlock as QRCodeBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { ButtonBlock } from '@/blocks/Button/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { QRCodeBlock } from '@/blocks/QRCodeBlock/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | ButtonBlockProps
      | QRCodeBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  text: ({ node }: { node: any }) => {
    const nodeAny = node as any

    // Access TextStateFeature properties from node.$
    const nodeStates = nodeAny.$ || {}

    // Check if this text node has TextStateFeature states
    const hasStates = nodeStates.color || nodeStates.underline || nodeStates.highlight

    if (!hasStates) {
      // Use default text converter for regular text
      return <span>{node.text}</span>
    }

    // Build inline styles from TextStateFeature states
    const style: React.CSSProperties = {}

    // Handle color states
    if (nodeStates.color) {
      const colorKey = nodeStates.color

      // Map defaultColors and custom states to CSS
      const colorMap: Record<string, React.CSSProperties> = {
        // Text colors from defaultColors
        'text-red': { color: '#ef4444' },
        'text-blue': { color: '#3b82f6' },
        'text-green': { color: '#10b981' },
        'text-yellow': { color: '#f59e0b' },
        'text-purple': { color: '#8b5cf6' },
        'text-pink': { color: '#ec4899' },
        'text-cyan': { color: '#06b6d4' },
        'text-orange': { color: '#f97316' },
        'text-gray': { color: '#6b7280' },
        'text-white': { color: '#ffffff' },
        'text-black': { color: '#000000' },

        // Background colors from defaultColors
        'bg-red': { backgroundColor: '#ef4444', color: '#ffffff' },
        'bg-blue': { backgroundColor: '#3b82f6', color: '#ffffff' },
        'bg-green': { backgroundColor: '#10b981', color: '#ffffff' },
        'bg-yellow': { backgroundColor: '#f59e0b', color: '#000000' },
        'bg-purple': { backgroundColor: '#8b5cf6', color: '#ffffff' },
        'bg-pink': { backgroundColor: '#ec4899', color: '#ffffff' },
        'bg-cyan': { backgroundColor: '#06b6d4', color: '#ffffff' },
        'bg-orange': { backgroundColor: '#f97316', color: '#ffffff' },
        'bg-gray': { backgroundColor: '#6b7280', color: '#ffffff' },
      }

      if (colorMap[colorKey]) {
        Object.assign(style, colorMap[colorKey])
      }
    }

    // Handle underline states
    if (nodeStates.underline) {
      const underlineKey = nodeStates.underline

      const underlineMap: Record<string, React.CSSProperties> = {
        solid: {
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
        },
        'yellow-dashed': {
          textDecoration: 'underline dashed',
          textDecorationColor: '#eab308',
          textUnderlineOffset: '4px',
        },
        'blue-wavy': {
          textDecoration: 'underline wavy',
          textDecorationColor: '#3b82f6',
          textUnderlineOffset: '4px',
        },
        'red-double': {
          textDecoration: 'underline double',
          textDecorationColor: '#ef4444',
          textUnderlineOffset: '4px',
        },
      }

      if (underlineMap[underlineKey]) {
        Object.assign(style, underlineMap[underlineKey])
      }
    }

    // Handle highlight states
    if (nodeStates.highlight) {
      const highlightKey = nodeStates.highlight

      const highlightMap: Record<string, React.CSSProperties> = {
        yellow: {
          backgroundColor: '#fef08a',
          color: '#713f12',
          padding: '2px 4px',
          borderRadius: '3px',
        },
        green: {
          backgroundColor: '#bbf7d0',
          color: '#14532d',
          padding: '2px 4px',
          borderRadius: '3px',
        },
        blue: {
          backgroundColor: '#bfdbfe',
          color: '#1e3a8a',
          padding: '2px 4px',
          borderRadius: '3px',
        },
        pink: {
          backgroundColor: '#fbcfe8',
          color: '#831843',
          padding: '2px 4px',
          borderRadius: '3px',
        },
      }

      if (highlightMap[highlightKey]) {
        Object.assign(style, highlightMap[highlightKey])
      }
    }

    return <span style={style}>{node.text}</span>
  },
  blocks: {
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    button: ({ node }: { node: SerializedBlockNode<ButtonBlockProps> }) => (
      <ButtonBlock className="col-start-2 mb-4" {...node.fields} />
    ),
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
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert text-primary': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}

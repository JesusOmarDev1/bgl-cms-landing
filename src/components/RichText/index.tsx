'use client'

import React from 'react'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui/cn'
import { jsxConverters } from './converters'
import type { RichTextProps } from './types'

export default function RichText(props: RichTextProps) {
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

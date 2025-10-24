import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'link' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  title?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    title,
  } = props

  // Build href based on type
  const href = React.useMemo(() => {
    if (type === 'reference' && reference?.value && typeof reference.value === 'object') {
      const slug = reference.value.slug
      if (!slug) return null

      const basePath = reference.relationTo === 'pages' ? '' : `/${reference.relationTo}`
      return `${basePath}/${slug}`
    }
    return url || null
  }, [type, reference, url])

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  const linkTitle = title || label || ''

  // Handle inline appearance (plain link)
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} title={linkTitle} href={href} {...newTabProps}>
        {label || children}
      </Link>
    )
  }

  // Handle link appearance (ghost button style)
  if (appearance === 'link') {
    return (
      <Button asChild className={className} size={sizeFromProps} variant="ghost">
        <Link title={linkTitle} href={href} {...newTabProps}>
          {label || children}
        </Link>
      </Button>
    )
  }

  // Handle button appearances
  return (
    <Button asChild className={className} size={sizeFromProps} variant={appearance}>
      <Link title={linkTitle} href={href} {...newTabProps}>
        {label || children}
      </Link>
    </Button>
  )
}

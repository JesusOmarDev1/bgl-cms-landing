'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'
import { readingTime } from 'reading-time-estimator'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/utilities/formatDateTime'
import ShareBtn from '../ui/share-btn'
import Categories from '../ui/categories'

export type CardProductData = Pick<
  Product,
  | 'slug'
  | 'meta'
  | 'title'
  | 'publishedAt'
  | 'content'
  | 'heroImage'
  | 'brand'
  | 'model'
  | 'stock'
  | 'price'
  | 'categories'
>

export const CardProducts: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProductData
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
  publishedAt?: string
  content?: string
}> = (props) => {
  const { link } = useClickableCard({})
  const { doc, relationTo, title: titleFromProps, content, showCategories } = props

  const { slug, meta, title, heroImage, brand, model, stock, price, categories, publishedAt } =
    doc || {}
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo || 'products'}/${slug}`
  const sanitizedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}${href}`.replace(/\s/g, ' ')

  const sanitizedTitle = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const extractTextFromContent = (contentObj: any): string => {
    if (!contentObj) return ''

    if (typeof contentObj === 'string') return contentObj

    // Handle Lexical editor structure
    if (contentObj.root && contentObj.root.children) {
      return contentObj.root.children
        .map((child: any) => {
          // Handle text nodes
          if (child.text) return child.text

          // Handle paragraph and other block elements
          if (child.children && Array.isArray(child.children)) {
            return child.children
              .map((grandchild: any) => {
                if (grandchild.text) return grandchild.text
                if (typeof grandchild === 'string') return grandchild
                return ''
              })
              .join('')
          }

          // Handle direct text content
          if (typeof child === 'string') return child

          return ''
        })
        .join(' ')
        .trim()
    }

    // Handle array of content blocks
    if (Array.isArray(contentObj)) {
      return contentObj
        .map((block: any) => {
          if (typeof block === 'string') return block
          if (block.text) return block.text
          if (block.children) {
            return extractTextFromContent({ root: { children: block.children } })
          }
          return ''
        })
        .join(' ')
        .trim()
    }

    return ''
  }

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  const imageToUse = heroImage || metaImage

  return (
    <Card role="article">
      <CardHeader className="px-0">
        <div className="relative aspect-square h-56 w-full">
          <Suspense fallback={<Skeleton className="h-56 w-full" />}>
            {imageToUse && typeof imageToUse !== 'string' && typeof imageToUse !== 'number' && (
              <Media fill priority resource={imageToUse} className="object-cover" />
            )}
            {(!imageToUse || typeof imageToUse === 'string' || typeof imageToUse === 'number') && (
              <p className="text-center">No se encontro imagen.</p>
            )}
          </Suspense>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 py-1">
        <Categories
          showCategories={showCategories}
          hasCategories={hasCategories}
          categories={categories}
        />
        <CardTitle className="text-lg font-semibold line-clamp-2">
          <Link className="not-prose hover:underline" href={href as any} ref={link.ref}>
            {sanitizedTitle}
          </Link>
        </CardTitle>
        <p className="text-sm">
          Fecha de publicación: {publishedAt && <span>{formatDateTime(publishedAt)}</span>}
        </p>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {sanitizedDescription}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

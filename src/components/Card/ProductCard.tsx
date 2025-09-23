'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { formatDateTime } from '@/utilities/formatDateTime'
import Categories from '../ui/categories'
import { AspectRatio } from '../ui/aspect-ratio'

export type CardProductData = Pick<
  Product,
  'slug' | 'meta' | 'title' | 'publishedAt' | 'content' | 'heroImage' | 'categories'
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
  const { doc, relationTo, title: titleFromProps, showCategories } = props

  const { slug, meta, title, heroImage, categories, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo || 'products'}/${slug}`

  const sanitizedTitle = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  const imageToUse = heroImage || metaImage

  return (
    <Card role="article" className="h-fit max-w-96 relative z-10">
      <div className="flex flex-col gap-4">
        <CardHeader className="px-0">
          <div className="relative">
            <Suspense fallback={<Skeleton className="h-56 w-full" />}>
              {imageToUse && typeof imageToUse !== 'string' && typeof imageToUse !== 'number' && (
                <AspectRatio ratio={1 / 1} className="relative">
                  <Media priority resource={imageToUse} fill />
                </AspectRatio>
              )}
              {(!imageToUse ||
                typeof imageToUse === 'string' ||
                typeof imageToUse === 'number') && (
                <div
                  role="log"
                  className="text-center flex items-center justify-center h-56 w-full"
                >
                  No se encontro imagen.
                </div>
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
      </div>
    </Card>
  )
}

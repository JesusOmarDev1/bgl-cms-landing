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

  const { slug, meta, title, heroImage, brand, model, stock, categories, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo || 'products'}/${slug}`

  const sanitizedTitle = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const sanitizedStock = stock ? stock.toString() : 'No disponible'

  const sanitizedBrand = brand || 'Sin marca'

  const sanitizedModel = model || 'Sin modelo'

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
              <div role="log" className="text-center flex items-center justify-center h-56 w-full">
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
    </Card>
  )
}

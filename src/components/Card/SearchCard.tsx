'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'
import { readingTime } from 'reading-time-estimator'

import { Media } from '@/components/Media'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { formatDateTime } from '@/utilities/formatDateTime'
import Categories from '../ui/categories'
import { AspectRatio } from '../ui/aspect-ratio'

// Tipo para elementos de la colección search
export type SearchResultData = {
  id: string | number
  title?: string | null
  slug?: string | null
  content?: any
  heroImage?: any
  publishedAt?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: any
  } | null
  categories?: Array<{
    relationTo?: string
    categoryID?: string
    title?: string
  }> | null
  doc: {
    relationTo: 'posts' | 'products'
    value: string | number
  }
}

export const SearchCard: React.FC<{
  className?: string
  doc?: SearchResultData
  showCategories?: boolean
}> = (props) => {
  const { link } = useClickableCard({})
  const { doc, showCategories } = props

  if (!doc) return null

  const { slug, meta, title, categories, doc: docRef, heroImage, publishedAt } = doc
  const { description, image: metaImage } = meta || {}

  const href = `/${docRef.relationTo}/${slug}`

  const sanitizedTitle = title || meta?.title
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

'use client'
import { useClickableCard } from '@/utilities/ui/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

import { Skeleton } from '../ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AspectRatio } from '../ui/aspect-ratio'

export type CardProductData = Pick<
  Product,
  'slug' | 'meta' | 'title' | 'publishedAt' | 'content' | 'heroImage' | 'excerpt'
>

interface ProductCardProps {
  alignItems?: 'center'
  className?: string
  doc?: CardProductData
  relationTo?: 'products'
  title?: string
  publishedAt?: string
  content?: string
}

// Product image component
const ProductImage: React.FC<{ imageToUse: any }> = ({ imageToUse }) => (
  <div className="relative">
    <Suspense fallback={<Skeleton className="h-56 w-full" />}>
      {imageToUse && typeof imageToUse !== 'string' && typeof imageToUse !== 'number' ? (
        <AspectRatio ratio={1 / 1} className="relative">
          <Media priority resource={imageToUse} fill />
        </AspectRatio>
      ) : (
        <div
          role="img"
          aria-label="Imagen no disponible"
          className="text-center flex items-center justify-center h-56 w-full bg-muted/20 rounded-md"
        >
          <span className="text-muted-foreground text-sm">No se encontró imagen</span>
        </div>
      )}
    </Suspense>
  </div>
)

// Main ProductCard component
export const CardProducts: React.FC<ProductCardProps> = ({
  doc,
  relationTo = 'products',
  title: titleFromProps,
  className,
}) => {
  const { link } = useClickableCard({})

  if (!doc) {
    return null
  }

  const { slug, meta, title, heroImage, excerpt } = doc
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo}/${slug}`
  const displayTitle = titleFromProps || title
  const displayDescription =
    description?.replace(/\s+/g, ' ').trim() || excerpt?.replace(/\s+/g, ' ').trim()
  const imageToUse = heroImage || metaImage

  return (
    <Card role="article" className={`h-fit max-w-96 relative z-10 ${className || ''}`}>
      <div className="flex flex-col gap-4">
        <CardHeader className="px-0">
          <ProductImage imageToUse={imageToUse} />
        </CardHeader>

        <CardContent className="flex flex-col gap-3 py-1">
          <div className="space-y-2">
            <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
              <Link
                className="not-prose hover:underline transition-colors"
                href={href}
                ref={link.ref}
              >
                {displayTitle}
              </Link>
            </CardTitle>

            {displayDescription && (
              <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {displayDescription}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

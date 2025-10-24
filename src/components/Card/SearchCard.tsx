'use client'
import { useClickableCard } from '@/utilities/ui'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'

import { Media } from '@/components/Media'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { AspectRatio } from '../ui/aspect-ratio'
import { Badge } from '../ui/badge'

// Mapeo de tipos de documentos
const documentTypeLabels: Record<string, string> = {
  posts: 'Publicación',
  products: 'Producto',
  manuals: 'Manual',
  services: 'Servicio',
}

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
    relationTo: 'posts' | 'products' | 'manuals' | 'services'
    value: string | number
  }
}

// Search image component
const SearchImage: React.FC<{ imageToUse: any; documentType: string }> = ({
  imageToUse,
  documentType,
}) => (
  <div className="relative">
    <Badge variant="secondary" className="absolute top-3 right-3 z-10 text-xs">
      {documentType}
    </Badge>
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

export const SearchCard: React.FC<{
  className?: string
  doc?: SearchResultData
}> = ({ doc, className }) => {
  const { link } = useClickableCard({})

  if (!doc) return null

  const { slug, meta, title, doc: docRef, heroImage } = doc
  const { description, image: metaImage } = meta || {}

  const href = `/${docRef.relationTo}/${slug}`
  const displayTitle = title || meta?.title
  const displayDescription = description?.replace(/\s+/g, ' ').trim()
  const imageToUse = heroImage || metaImage
  const documentTypeLabel = documentTypeLabels[docRef.relationTo] || docRef.relationTo

  return (
    <Card role="article" className={`h-fit max-w-96 relative z-10 ${className || ''}`}>
      <div className="flex flex-col gap-4">
        <CardHeader className="px-0">
          <SearchImage imageToUse={imageToUse} documentType={documentTypeLabel} />
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

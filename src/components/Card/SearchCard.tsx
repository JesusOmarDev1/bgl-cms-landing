'use client'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { AspectRatio } from '../ui/aspect-ratio'
import { Media } from '../Media'
import {
  FileText as FileTextIcon,
  Package as PackageIcon,
  BookOpen as BookOpenIcon,
  Settings as SettingsIcon,
} from 'lucide-react'
import type { Media as MediaType } from '@/payload-types'

// Mapeo de tipos de documentos con iconos y colores
const documentTypeConfig: Record<
  string,
  {
    label: string
    icon: React.ComponentType<{ className?: string }>
  }
> = {
  posts: {
    label: 'Publicación',
    icon: FileTextIcon,
  },
  products: {
    label: 'Producto',
    icon: PackageIcon,
  },
  manuals: {
    label: 'Manual',
    icon: BookOpenIcon,
  },
  services: {
    label: 'Servicio',
    icon: SettingsIcon,
  },
}

// Tipo para imágenes de media (compatible con el componente Media)
type MediaResource = MediaType | string | number | null

// Tipo para elementos de la colección search
export type SearchResultData = {
  id: string | number
  title?: string | null
  slug?: string | null
  content?: unknown
  heroImage?: MediaResource
  publishedAt?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: MediaResource
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
const SearchImage: React.FC<{
  imageToUse: MediaResource
  typeConfig: (typeof documentTypeConfig)[string]
}> = ({ imageToUse, typeConfig }) => {
  const IconComponent = typeConfig.icon

  return (
    <div className="relative group overflow-hidden">
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        {imageToUse &&
        (typeof imageToUse === 'object' ||
          typeof imageToUse === 'string' ||
          typeof imageToUse === 'number') ? (
          <AspectRatio ratio={1} className="relative">
            <Media resource={imageToUse} fill />
          </AspectRatio>
        ) : (
          <div
            role="img"
            aria-label="Imagen no disponible"
            className="text-center flex flex-col items-center justify-center h-64 w-full bg-muted/30"
          >
            <IconComponent className="h-12 w-12 text-muted-foreground mb-3" />
            <span className="text-muted-foreground text-sm">Sin imagen</span>
          </div>
        )}
      </Suspense>
    </div>
  )
}

export const SearchCard: React.FC<{
  className?: string
  doc?: SearchResultData
  index?: number
}> = ({ doc, className, index: _index = 0 }) => {
  if (!doc) return null

  const { slug, meta, title, doc: docRef, heroImage } = doc
  const href = `/${docRef.relationTo}/${slug}`
  const displayTitle = title || meta?.title || 'Sin título'
  const documentType = docRef.relationTo
  const typeConfig = documentTypeConfig[documentType] || documentTypeConfig.posts

  return (
    <div className={className}>
      <Card className="pb-0">
        <CardContent className="p-0">
          {/* Badge flotante en la esquina superior derecha */}
          <div className="relative">
            <Badge
              variant="secondary"
              className="absolute top-4 right-4 z-10 text-xs gap-1.5 bg-background/95 backdrop-blur-sm border shadow-sm rounded-full px-3 py-1"
            >
              <typeConfig.icon className="h-3 w-3" />
              {typeConfig.label}
            </Badge>

            {/* Image Section */}
            <SearchImage imageToUse={heroImage || meta?.image || null} typeConfig={typeConfig} />
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2 text-foreground">
              <Link href={href} className="hover:text-primary transition-colors hover:underline">
                {displayTitle}
              </Link>
            </CardTitle>

            {meta?.description && (
              <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                {meta.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

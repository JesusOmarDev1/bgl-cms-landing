import React from 'react'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Categories from '@/components/ui/categories'
import Share from '@/components/ui/share'
import { Calendar, Award, Info } from 'lucide-react'
import { Product } from '@/payload-types'
import { SpecificationItem } from '../types'
import { formatDateTime } from '../utils'

interface ProductInfoProps {
  product: Product
  keySpecs: SpecificationItem[]
  href: string
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, keySpecs, href }) => {
  const { categories, publishedAt, title, meta, brand, model, warranty, excerpt } = product

  const brandTitle = typeof brand === 'object' ? brand.title : null
  const brandHeroImage = typeof brand === 'object' ? brand.heroImage : null
  const modelTitle = typeof model === 'object' ? model.title : null
  const description = excerpt || meta?.description || ''

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Categories showCategories={true} hasCategories={true} categories={categories} />

      {/* Title and Brand */}
      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h1>

          {(brandTitle || modelTitle) && (
            <p className="text-xl text-muted-foreground">
              {brandTitle && modelTitle
                ? `${brandTitle} - ${modelTitle}`
                : brandTitle || modelTitle}
            </p>
          )}
        </div>

        {brandHeroImage && typeof brandHeroImage === 'object' && brandHeroImage.url && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border shadow-sm flex-shrink-0">
              <Media
                resource={brandHeroImage}
                className="w-full h-full object-contain p-1"
                alt={`Logo de ${brandTitle}`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">Marca</p>
              <p className="text-lg font-semibold">{brandTitle}</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {description && <p className="text-muted-foreground">{description}</p>}

      {/* Key Specifications */}
      {keySpecs.length > 0 && (
        <Card className="pb-0">
          <CardContent className="p-6">
            <h3 className="mb-4 flex text-xl items-center gap-2 font-semibold">
              <Info className="size-6" />
              Especificaciones Clave
            </h3>
            <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              {keySpecs.map((spec, index) => (
                <div key={index} className="flex items-start gap-3 p-0">
                  <spec.icon className="size-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{spec.label}</p>
                    <p className="text-sm text-muted-foreground mt-1 break-words">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Share className="w-full" title={title} text="Compartir" url={href} />

      {/* Additional Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {publishedAt && (
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Publicado {formatDateTime(publishedAt)}</span>
          </div>
        )}
        {warranty && (
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Garantía {warranty} días</span>
          </div>
        )}
      </div>
    </div>
  )
}

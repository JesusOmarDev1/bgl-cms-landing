'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/ui/cn'
import Autoplay from 'embla-carousel-autoplay'

interface ProductImageCarouselProps {
  heroImage: Product['heroImage']
  gallery: Product['gallery']
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  heroImage,
  gallery,
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  // Plugin de autoplay
  const autoplayPlugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  // Crear array de todas las imágenes
  const allImages = React.useMemo(() => {
    const images: Array<{ type: 'hero' | 'gallery'; image: Product['heroImage']; id?: string }> = []

    if (heroImage && typeof heroImage !== 'string') {
      images.push({ type: 'hero', image: heroImage })
    }

    if (gallery && gallery.length > 0) {
      gallery.forEach((item, index) => {
        if (item.image && typeof item.image !== 'string') {
          images.push({
            type: 'gallery',
            image: item.image,
            id: item.id || `gallery-${index}`,
          })
        }
      })
    }

    return images
  }, [heroImage, gallery])

  const hasMultipleImages = allImages.length > 1

  // Configurar listeners del carousel
  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // Función para ir a una imagen específica
  const goToSlide = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index)
      }
    },
    [api],
  )

  return (
    <div className="space-y-4">
      {/* Image Carousel */}
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{ align: 'start', loop: true }}
          plugins={hasMultipleImages ? [autoplayPlugin.current] : []}
          setApi={setApi}
          onMouseEnter={() => autoplayPlugin.current.stop()}
          onMouseLeave={() => autoplayPlugin.current.reset()}
        >
          <CarouselContent>
            {allImages.map((item, index) => (
              <CarouselItem key={item.id || `image-${index}`}>
                <div className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <AspectRatio ratio={1}>
                    <Media
                      priority={index === 0}
                      resource={item.image}
                      className="object-contain w-full h-full"
                      alt={
                        item.type === 'hero'
                          ? 'Imagen principal del producto'
                          : `Imagen ${index + 1} del producto`
                      }
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation buttons - only show if there are multiple images */}
          {hasMultipleImages && (
            <>
              <CarouselPrevious className="left-2 bg-background/70 backdrop-blur-lg shadow-md" />
              <CarouselNext className="right-2 bg-background/70 backdrop-blur-lg shadow-md" />
            </>
          )}
        </Carousel>

        {/* Image counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-3xl text-sm">
            {current} de {count}
          </div>
        )}
      </div>

      {/* Thumbnail navigation - only show if there are multiple images */}
      {hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((item, index) => (
            <button
              key={item.id || `thumb-${index}`}
              onClick={() => goToSlide(index)}
              className={cn(
                'flex-shrink-0 size-16 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer overflow-hidden p-0 hover:scale-100 shadow-sm transition-all duration-200',
                current === index + 1
                  ? 'border-primary'
                  : 'border-transparent hover:border-primary/50 scale-80',
              )}
            >
              <Media
                resource={item.image}
                className="object-contain w-full h-full"
                alt={`Miniatura ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'
import { readingTime } from 'reading-time-estimator'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const { categories, heroImage, publishedAt, title, meta, content } = product

  // Extract plain text from content structure
  const extractTextFromContent = (contentObj: any): string => {
    if (!contentObj) return ''

    // Handle direct string content
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

  const contentText = extractTextFromContent(content)
  const readingTimeResult = contentText ? readingTime(contentText) : null
  const readingTimeToUse = readingTimeResult
    ? `${readingTimeResult.minutes} min de lectura`
    : 'Tiempo no disponible'

  const description = meta?.description || ''

  return (
    <section>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2.5 text-center">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Sin Categoria'

                  return (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {titleToUse}
                    </Badge>
                  )
                }
                return null
              })}
            </div>
          )}

          <div className="flex justify-center items-center gap-2.5">
            {publishedAt && <span>{formatDateTime(publishedAt)}</span>}
            <Separator className="size-4" orientation="vertical" />
            {readingTimeToUse && <span>{readingTimeToUse}</span>}
          </div>

          <h1 className="max-w-3xl text-pretty text-5xl font-semibold md:text-6xl">{title}</h1>

          {description && (
            <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">{description}</h3>
          )}

          {heroImage && typeof heroImage !== 'string' && (
            <div className="relative mb-8 mt-4 w-full rounded-lg border overflow-hidden">
              <AspectRatio ratio={1 / 1}>
                <Media priority resource={heroImage} />
              </AspectRatio>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

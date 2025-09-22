'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Suspense } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { formatDateTime } from '@/utilities/formatDateTime'
import Categories from '../ui/categories'
import { AspectRatio } from '../ui/aspect-ratio'
import { readingTime } from 'reading-time-estimator'

export type CardPostData = Pick<
  Post,
  | 'slug'
  | 'categories'
  | 'meta'
  | 'title'
  | 'publishedAt'
  | 'content'
  | 'authors'
  | 'populatedAuthors'
  | 'heroImage'
>

export const CardPosts: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  publishedAt?: string
  content?: string
}> = (props) => {
  const { link } = useClickableCard({})
  const { doc, relationTo, title: titleFromProps, showCategories } = props

  const { slug, meta, title, heroImage, categories, publishedAt, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  const href = `/${relationTo || 'posts'}/${slug}`

  const sanitizedTitle = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  const imageToUse = heroImage || metaImage

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
          <p className="text-sm">{readingTimeToUse}</p>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {sanitizedDescription}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}

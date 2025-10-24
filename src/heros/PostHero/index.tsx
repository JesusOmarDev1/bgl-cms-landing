import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Separator } from '@/components/ui/separator'
import { readingTime } from 'reading-time-estimator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Categories from '@/components/ui/categories'
import Share from '@/components/ui/share'
import { formatAuthors } from '@/utilities/content'
import { formatDateTime } from '@/utilities/date'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, content, title, meta, slug } = post

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

  const href = `/${'posts'}/${slug}`
  const contentText = extractTextFromContent(content)
  const readingTimeResult = contentText ? readingTime(contentText) : null
  const readingTimeToUse = readingTimeResult
    ? `${readingTimeResult.minutes} min de lectura`
    : 'Tiempo no disponible'

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const authorName = hasAuthors ? formatAuthors(populatedAuthors) : 'Autor Anónimo'
  const description = meta?.description || ''

  return (
    <section>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2.5 text-center">
          <Categories categories={categories} hasCategories showCategories />

          <div className="flex justify-center items-center gap-2.5">
            {publishedAt && <span>{formatDateTime(publishedAt)}</span>}
            <Separator decorative className="size-4" orientation="vertical" />
            {readingTimeToUse && <span>{readingTimeToUse}</span>}
          </div>

          <h1 className="max-w-3xl text-pretty text-5xl font-semibold md:text-6xl">{title}</h1>

          {description && (
            <h3 className="text-muted-foreground max-w-3xl text-lg md:text-xl">{description}</h3>
          )}

          {heroImage && typeof heroImage !== 'string' && (
            <div className="relative mb-8 mt-4 w-full rounded-lg border overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <Media priority resource={heroImage} fill />
              </AspectRatio>
            </div>
          )}

          <div className="flex flex-col justify-center items-center gap-2.5 w-full">
            <Share className="w-full" url={href} title={title} text={description} />
          </div>
        </div>
      </div>
    </section>
  )
}

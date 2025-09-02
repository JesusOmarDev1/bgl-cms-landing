'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React from 'react'
import { readingTime } from 'reading-time-estimator'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Skeleton } from '../ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Share } from 'lucide-react'
import {
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share'

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
  const { doc, relationTo, title: titleFromProps, content } = props

  const { slug, categories, meta, title, authors, populatedAuthors, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo || 'posts'}/${slug}`
  const sanitizedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}${href}`.replace(/\s/g, ' ')

  // Extract authors
  const authorsList = populatedAuthors || authors || []
  const authorNames = authorsList
    .map((author: any) => {
      if (typeof author === 'object' && author?.name) {
        return author.name
      }
      return null
    })
    .filter(Boolean)
    .join(', ')

  // Extract plain text from content structure
  const extractTextFromContent = (contentObj: any): string => {
    if (!contentObj) return ''

    // Handle direct string content
    if (typeof contentObj === 'string') return contentObj

    // Handle Lexical/Slate structure
    if (contentObj.root && contentObj.root.children) {
      return contentObj.root.children
        .map((child: any) => {
          if (child.text) return child.text
          if (child.children) {
            return child.children.map((grandchild: any) => grandchild.text || '').join('')
          }
          return ''
        })
        .join(' ')
        .trim()
    }

    return ''
  }

  const contentText = content || extractTextFromContent(doc?.content)
  const readingTimeResult = contentText ? readingTime(contentText) : null
  const readingTimeToUse = readingTimeResult ? `${readingTimeResult.minutes} min` : 'No disponible'

  // Use heroImage first, fallback to metaImage
  const imageToUse = heroImage || metaImage

  return (
    <article>
      <div className="flex flex-col gap-2.5 max-w-96">
        <div className="flex gap-2.5 truncate line-clamp-1">
          {authorNames && (
            <p>
              Autores: <span className="font-semibold">{authorNames}</span>
            </p>
          )}
        </div>
        <div className="relative w-full">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
        </div>
        <div className="flex gap-1 flex-col">
          {titleToUse && (
            <div className="prose py-2">
              <h2 className="truncate line-clamp-2">
                <Link className="not-prose hover:underline" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h2>
            </div>
          )}
          {description && (
            <p className="prose text-zinc-500">
              {description && <span className="truncate line-clamp-2">{sanitizedDescription}</span>}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <span>{readingTimeToUse}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'sm'} variant={'outline'}>
                <Share />
                <span>Compartir</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuGroup className="flex flex-wrap gap-2.5">
                <DropdownMenuItem asChild>
                  <WhatsappShareButton url={sanitizedHref}>
                    <WhatsappIcon size={24} round />
                  </WhatsappShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <FacebookShareButton url={sanitizedHref}>
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <TwitterShareButton url={sanitizedHref}>
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <TelegramShareButton url={sanitizedHref}>
                    <TelegramIcon size={24} round />
                  </TelegramShareButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  )
}

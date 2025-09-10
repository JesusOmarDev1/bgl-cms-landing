'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React from 'react'
import { readingTime } from 'reading-time-estimator'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'
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

export type CardProductData = Pick<
  Product,
  | 'slug'
  | 'meta'
  | 'title'
  | 'publishedAt'
  | 'content'
  | 'heroImage'
  | 'brand'
  | 'model'
  | 'stock'
  | 'total'
>

export const CardProducts: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProductData
  relationTo?: 'products'
  showCategories?: boolean
  title?: string
  publishedAt?: string
  content?: string
}> = (props) => {
  const { link } = useClickableCard({})
  const { doc, relationTo, title: titleFromProps, content } = props

  const { slug, meta, title, heroImage, brand, model, stock, total } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo || 'products'}/${slug}`
  const sanitizedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}${href}`.replace(/\s/g, ' ')

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

  const contentText = content || extractTextFromContent(doc?.content)
  const readingTimeResult = contentText ? readingTime(contentText) : null
  const readingTimeToUse = readingTimeResult
    ? `${readingTimeResult.minutes} min de lectura`
    : 'Tiempo no disponible'

  // Use heroImage first, fallback to metaImage
  const imageToUse = heroImage || metaImage

  return (
    <article>
      <div className="flex flex-col gap-2.5 max-w-96">
        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {imageToUse && typeof imageToUse !== 'string' && typeof imageToUse !== 'number' && (
            <Media fill priority resource={imageToUse} className="object-cover" />
          )}
          {(!imageToUse || typeof imageToUse === 'string' || typeof imageToUse === 'number') && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Sin imagen disponible
            </div>
          )}
        </div>
        <div className="flex gap-1 flex-col">
          {titleToUse && (
            <div className="prose py-2">
              <h2 className="truncate line-clamp-2">
                <Link className="not-prose hover:underline" href={href as any} ref={link.ref}>
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

export const Card = CardProducts

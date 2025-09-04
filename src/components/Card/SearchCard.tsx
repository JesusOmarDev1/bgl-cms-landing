'use client'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React from 'react'
import { readingTime } from 'reading-time-estimator'

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
    relationTo: 'posts' | 'pages'
    value: string | number
  }
}

export const SearchCard: React.FC<{
  className?: string
  doc?: SearchResultData
  showCategories?: boolean
}> = (props) => {
  const { link } = useClickableCard({})
  const { doc, showCategories } = props

  if (!doc) return null

  const { slug, meta, title, categories, doc: docRef, content, heroImage } = doc
  const { description, image: metaImage } = meta || {}

  const titleToUse = title || meta?.title
  const sanitizedDescription = description?.replace(/\s/g, ' ')

  // Determinar la ruta basada en el tipo de colección
  const collectionPath = docRef.relationTo === 'pages' ? '' : docRef.relationTo
  const href = collectionPath ? `/${collectionPath}/${slug}` : `/${slug}`
  const sanitizedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}${href}`.replace(/\s/g, ' ')

  // Extract plain text from content structure for accurate reading time
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

  // Use actual content for reading time calculation, fallback to description
  const contentText = content ? extractTextFromContent(content) : description || ''
  const readingTimeResult = contentText ? readingTime(contentText) : null
  const readingTimeToUse = readingTimeResult
    ? `${readingTimeResult.minutes} min de lectura`
    : 'Tiempo no disponible'

  // Mostrar categorías si están disponibles
  const categoryNames = categories
    ?.map((cat) => cat.title)
    .filter(Boolean)
    .join(', ')

  // Determinar el tipo de contenido para mostrar dinámicamente
  const getContentType = (collection: string) => {
    switch (collection) {
      case 'posts': return 'Artículo'
      case 'pages': return 'Página'
      case 'products': return 'Producto'
      case 'providers': return 'Proveedor'
      default: return collection.charAt(0).toUpperCase() + collection.slice(1)
    }
  }
  
  const contentType = getContentType(docRef.relationTo)

  // Get hero image - prioritize heroImage, fallback to meta image
  const heroImageSrc = heroImage?.url || metaImage?.url

  return (
    <article>
      <div className="flex flex-col gap-2.5 max-w-96">
        <div className="flex gap-2.5 truncate line-clamp-1">
          <p>
            <span className="text-sm text-gray-600">{contentType}</span>
            {categoryNames && (
              <>
                {' • '}
                <span className="font-semibold">{categoryNames}</span>
              </>
            )}
          </p>
        </div>

        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {heroImage && <Media fill priority resource={heroImage} className="object-cover" />}
          {!heroImage && metaImage && (
            <Media fill priority resource={metaImage} className="object-cover" />
          )}
          {!heroImage && !metaImage && (
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
              <span className="truncate line-clamp-2">{sanitizedDescription}</span>
            </p>
          )}
        </div>

        <div className="flex justify-between items-center gap-4">
          <span className="text-sm text-gray-600">{readingTimeToUse}</span>
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

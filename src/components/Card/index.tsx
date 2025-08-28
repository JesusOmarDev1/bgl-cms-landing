'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { Link } from 'next-view-transitions'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Skeleton } from '../ui/skeleton'
import { Badge } from '../ui/badge'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Share } from 'lucide-react'
import { EmailShareButton, EmailIcon, WhatsappShareButton, WhatsappIcon } from 'next-share'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const CardPosts: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const sanitizedHref = `${process.env.NEXT_PUBLIC_SERVER_URL}${href}`.replace(/\s/g, ' ')

  return (
    <Card
      role="article"
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
    >
      <CardContent>
        <CardHeader>
          <CardAction>
            {showCategories && hasCategories && (
              <div className="uppercase text-sm mb-4">
                {showCategories && hasCategories && (
                  <div>
                    {categories?.map((category, index) => {
                      if (typeof category === 'object') {
                        const { title: titleFromCategory } = category

                        const categoryTitle = titleFromCategory || 'Sin categoria'

                        const isLast = index === categories.length - 1

                        return (
                          <Fragment key={index}>
                            <Badge>{categoryTitle}</Badge>
                            {!isLast && <Fragment>, &nbsp;</Fragment>}
                            {description}
                          </Fragment>
                        )
                      }

                      return null
                    })}
                  </div>
                )}
              </div>
            )}
          </CardAction>
        </CardHeader>
        <div className="relative w-full ">
          {!metaImage && <Skeleton className="size-56 w-full aspect-auto" />}
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage} size="size-56 w-full aspect-auto" />
          )}
        </div>

        <CardTitle>
          {titleToUse && (
            <div className="prose py-2">
              <h3 className="truncate">
                <Link className="not-prose" href={href} ref={link.ref}>
                  {titleToUse}
                </Link>
              </h3>
            </div>
          )}
        </CardTitle>
        <CardDescription>
          <div className="truncate">
            {description && (
              <div className="py-2">{description && <p>{sanitizedDescription}</p>}</div>
            )}
          </div>
        </CardDescription>
        <div className="w-full flex items-center justify-center gap-4">
          <Link className="flex-1" href={href} passHref>
            <Button className="w-full" variant={'outline'}>
              Abrir
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <Share />
                <span>Compartir</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <EmailShareButton
                  url={sanitizedHref}
                  subject="BGL BASCULAS INDUSTRIALES te compartio una publicacion."
                  body={`Te comparto esta publicación de BGL Básculas Industriales: "${titleToUse}".\n\n¿Necesitas más información? Estamos a tu disposición.\n\nAccede al contenido completo aquí:`}
                >
                  <div className="flex items-center justify-start gap-1">
                    <EmailIcon size={32} round />
                    <span className="font-semibold">Correo electronico</span>
                  </div>
                </EmailShareButton>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <WhatsappShareButton url={sanitizedHref}>
                  <div className="flex items-center justify-start gap-1">
                    <WhatsappIcon size={32} round />
                    <span className="font-semibold">Whatsapp</span>
                  </div>
                </WhatsappShareButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

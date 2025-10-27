'use client'

import React, { useState, useEffect } from 'react'
import {
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Megaphone,
  Bell,
  Gift,
  TriangleAlert,
} from 'lucide-react'
import { Banner, BannerIcon, BannerTitle, BannerAction } from '@/components/ui/banner'
import type { Announcement as AnnouncementType } from '@/payload-types'
import { Link } from 'next-view-transitions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui/cn'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface AnnouncementsClientProps {
  data: AnnouncementType
}

const typeIcons = {
  info: Bell,
  warning: TriangleAlert,
  success: CheckCircle,
  announcement: Megaphone,
}

const AnnouncementBanner = ({ announcement }: { announcement: any }) => {
  const type = announcement.type || 'announcement'
  const Icon = typeIcons[type as keyof typeof typeIcons]

  return (
    <Banner className="transition-all duration-500 ease-in-out px-12" visible={true}>
      <div className="flex items-center gap-3 w-full">
        <BannerIcon icon={Icon} />

        <div className="flex-1">
          <div className="flex items-center justify-center gap-2">
            <BannerTitle className="font-medium w-fit">{announcement.title}</BannerTitle>
            {announcement.tag && (
              <Badge className="flex md:hidden" variant={'secondary'}>
                <Gift className="size-3" />
                {announcement.tag}
              </Badge>
            )}
          </div>

          {announcement.message && (
            <p className="text-xs mt-0.5 line-clamp-1 hidden sm:block">{announcement.message}</p>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {announcement.link && (
            <BannerAction asChild>
              <Link
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                {announcement.linkText || 'Ver más'}
                <ExternalLink className="size-3" />
              </Link>
            </BannerAction>
          )}
        </div>
      </div>
    </Banner>
  )
}

export const AnnouncementsClient: React.FC<AnnouncementsClientProps> = ({ data }) => {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const announcements = data?.announcements || []

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  if (announcements.length === 0) return null

  // Si solo hay un anuncio, mostrarlo directamente sin carousel
  if (announcements.length === 1) {
    return <AnnouncementBanner announcement={announcements[0]} />
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: announcements.length > 1,
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {announcements.map((announcement, index) => (
            <CarouselItem key={announcement.id || index}>
              <AnnouncementBanner announcement={announcement} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controles de navegación */}
        {announcements.length > 1 && (
          <>
            <CarouselPrevious className="flex left-2 h-8 w-8 z-10 bg-white/90 border-0 text-black hover:bg-white shadow-lg" />
            <CarouselNext className="flex right-2 h-8 w-8 z-10 bg-white/90 hover:bg-white text-black border-0 shadow-lg" />
          </>
        )}
      </Carousel>
    </div>
  )
}

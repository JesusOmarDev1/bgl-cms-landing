import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    mediaItems,
    displayType = 'single',
    aspectRatio = '16/9',
    staticImage,
    disableInnerContainer,
  } = props

  // Get aspect ratio value
  const getAspectRatio = (ratio: string) => {
    switch (ratio) {
      case '1/1':
        return 1 / 1
      case '16/9':
        return 16 / 9
      case 'auto':
        return undefined
      default:
        return 16 / 9
    }
  }

  const aspectRatioValue = getAspectRatio(aspectRatio || '16/9')

  // Single media display
  if (displayType === 'single') {
    let caption
    if (media && typeof media === 'object') caption = media.content

    return (
      <div
        className={cn(
          '',
          {
            container: enableGutter,
          },
          className,
        )}
      >
        {(media || staticImage) && (
          <>
            {aspectRatioValue ? (
              <AspectRatio ratio={aspectRatioValue}>
                <Media
                  imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
                  resource={media}
                  src={staticImage}
                />
              </AspectRatio>
            ) : (
              <Media
                imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
                resource={media}
                src={staticImage}
              />
            )}
          </>
        )}
        {caption && (
          <div
            className={cn(
              'mt-6',
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    )
  }

  // Carousel display
  if (displayType === 'carousel' && mediaItems && mediaItems.length > 0) {
    return (
      <div
        className={cn(
          '',
          {
            container: enableGutter,
          },
          className,
        )}
      >
        <Carousel className="w-full">
          <CarouselContent>
            {mediaItems.map((item, index) => (
              <CarouselItem key={index}>
                {aspectRatioValue ? (
                  <AspectRatio ratio={aspectRatioValue}>
                    <Media
                      imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
                      resource={item.media}
                    />
                  </AspectRatio>
                ) : (
                  <Media
                    imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
                    resource={item.media}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  }

  return null
}

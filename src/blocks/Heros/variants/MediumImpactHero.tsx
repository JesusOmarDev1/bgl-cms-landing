import React from 'react'
import { cn } from '@/utilities/ui/cn'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { HerosBlock } from '@/payload-types'
import { Link } from 'next-view-transitions'

type Props = HerosBlock & {
  className?: string
}

export const MediumImpactHero: React.FC<Props> = ({
  headline,
  subheadline,
  buttons,
  media,
  className,
}) => {
  return (
    <section className={cn('py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              {headline && (
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  {headline}
                </h1>
              )}

              {subheadline && (
                <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">{subheadline}</p>
              )}

              {buttons && buttons.length > 0 && (
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant === 'outline' ? 'outline' : 'default'}
                      size="lg"
                      className="px-8 py-3 text-base font-semibold"
                      asChild
                    >
                      <Link href={button.url || '#'} title={button.text}>
                        {button.text}
                      </Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Media */}
            <div className="relative">
              {media ? (
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
                  <Media resource={media} imgClassName="w-full h-auto object-cover aspect-[4/3]" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gray-200 shadow-2xl">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl font-light">Media</div>
                    <div className="text-sm">Placeholder</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

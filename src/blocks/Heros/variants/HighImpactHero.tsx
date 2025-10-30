import React from 'react'
import { cn } from '@/utilities/ui/cn'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { HerosBlock } from '@/payload-types'
import { Link } from 'next-view-transitions'

type Props = HerosBlock & {
  className?: string
}

export const HighImpactHero: React.FC<Props> = ({
  headline,
  subheadline,
  buttons,
  backgroundImage,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <>
            <Media resource={backgroundImage} imgClassName="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        )}
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <div className="mx-auto max-w-4xl">
          {headline && (
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
          )}

          {subheadline && (
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
              {subheadline}
            </p>
          )}

          {buttons && buttons.length > 0 && (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
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
      </div>
    </section>
  )
}

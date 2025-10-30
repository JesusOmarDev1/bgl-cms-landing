import React from 'react'
import { cn } from '@/utilities/ui/cn'
import { Button } from '@/components/ui/button'
import type { HerosBlock } from '@/payload-types'
import { Link } from 'next-view-transitions'

type Props = HerosBlock & {
  className?: string
}

export const LowImpactHero: React.FC<Props> = ({ headline, subheadline, buttons, className }) => {
  return (
    <section className={cn('py-32 lg:py-40', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {headline && (
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
          )}

          {subheadline && (
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
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

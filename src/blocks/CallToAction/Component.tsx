import React from 'react'
import type { StaticImageData } from 'next/image'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/utilities/ui/cn'

type Props = CTABlockProps & {
  staticImage?: StaticImageData
  className?: string
}

export const CallToActionBlock: React.FC<Props> = ({
  headline,
  variant = 'default',
  label,
  content,
  image,
  staticImage,
  className,
}) => {
  // Default variant (original)
  if (variant === 'default') {
    return (
      <div className={cn('container', className)}>
        <div className="bg-card rounded border-border border p-4 flex flex-col gap-8">
          <div className="max-w-3xl flex items-center">
            <div className="flex flex-col gap-2">
              {headline && <h2 className="text-2xl md:text-3xl font-bold">{headline}</h2>}
              {content && <p className="mb-0">{content}</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // CTA Section 3 - Image on Left
  if (variant === 'section-3') {
    return (
      <section
        className={cn('md:bg-background bg-primary', className)}
        aria-labelledby="cta-heading"
      >
        <div className="container-padding-x bg-primary container mx-auto py-8 md:rounded-xl md:p-8">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-8 md:max-w-full lg:flex-row lg:gap-16">
            {/* Image */}
            <div className="w-full flex-1">
              <AspectRatio ratio={1 / 1}>
                {image || staticImage ? (
                  <Media
                    resource={image}
                    src={staticImage}
                    imgClassName="rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted">
                    <svg
                      className="h-16 w-16 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </AspectRatio>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center gap-6 md:gap-8 lg:items-start">
              <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left w-full">
                {label && (
                  <div className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                    {label}
                  </div>
                )}
                {headline && (
                  <h2
                    id="cta-heading"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary-foreground mb-0"
                  >
                    {headline}
                  </h2>
                )}
                {content && (
                  <div className="w-full">
                    <p className="mb-0 text-center lg:text-left text-primary-foreground/80 text-base leading-relaxed">
                      {content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // CTA Section 5 - Image on Right
  if (variant === 'section-5') {
    return (
      <section
        className={cn('md:bg-background bg-primary py-0 lg:py-24', className)}
        aria-labelledby="cta-heading"
      >
        <div className="md:container md:mx-auto">
          <div className="bg-primary w-full overflow-hidden pt-16 md:max-w-7xl md:rounded-xl lg:pl-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* Text content */}
              <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center gap-6 px-6 text-center lg:max-w-full lg:items-start lg:gap-8 lg:px-0 lg:pb-16 lg:text-left">
                <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left w-full">
                  {label && (
                    <div className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                      {label}
                    </div>
                  )}
                  {headline && (
                    <h2
                      id="cta-heading"
                      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary-foreground mb-0"
                    >
                      {headline}
                    </h2>
                  )}
                  {content && (
                    <div className="w-full">
                      <p className="mb-0 text-center lg:text-left text-primary-foreground/80 text-base leading-relaxed">
                        {content}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-square w-full flex-1 lg:aspect-auto">
                {image || staticImage ? (
                  <Media
                    resource={image}
                    src={staticImage}
                    imgClassName="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <svg
                      className="h-16 w-16 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // CTA Section 6 - Two Buttons Horizontal
  if (variant === 'section-6') {
    return (
      <section className={cn('bg-background', className)} aria-labelledby="cta-heading">
        <div className="container mx-auto">
          <div className="bg-primary px-6 py-16 sm:rounded-xl md:p-16">
            <div className="flex w-full flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div className="flex max-w-xl flex-col gap-3">
                {headline && (
                  <h2
                    id="cta-heading"
                    className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-primary-foreground mb-0"
                  >
                    {headline}
                  </h2>
                )}
                {content && (
                  <p className="mb-0 text-primary-foreground/80 text-base leading-relaxed">
                    {content}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // CTA Section 7 - Centered with Single Button
  if (variant === 'section-7') {
    return (
      <section className={cn('bg-background', className)} aria-labelledby="cta-heading">
        <div className="container mx-auto">
          <div className="bg-primary px-6 py-16 sm:rounded-xl md:p-16">
            <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 text-center">
              <div className="section-title-gap-lg flex flex-col items-center text-center">
                {label && (
                  <div className="flex items-center justify-center text-sm font-medium w-fit gap-1 bg-transparent text-primary-foreground/80 mb-4">
                    {label}
                  </div>
                )}
                {headline && (
                  <h2
                    id="cta-heading"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-primary-foreground"
                  >
                    {headline}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Fallback
  return null
}

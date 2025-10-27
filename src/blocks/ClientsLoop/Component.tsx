import React from 'react'
import type { StaticImageData } from 'next/image'

import { Media } from '@/components/Media'
import LogoLoop, { type LogoItem } from '@/components/ui/logo-loop'

type Client = {
  id: string
  title: string
  companyName?: string
  heroImage?: any
  website?: string
}

type Props = {
  clients?: Client[]
  speed?: number
  direction?: 'left' | 'right'
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  fadeOut?: boolean
  scaleOnHover?: boolean
  className?: string
  staticImages?: StaticImageData[]
}

export const ClientsLoopBlock: React.FC<Props> = (props) => {
  const {
    clients,
    speed = 120,
    direction = 'left',
    logoHeight = 60,
    gap = 48,
    pauseOnHover = true,
    fadeOut = true,
    scaleOnHover = true,
    className,
  } = props

  if (!clients || clients.length === 0) {
    return null
  }

  // Convert clients to LogoItem format
  const logoItems: LogoItem[] = clients
    .filter((client: Client) => {
      // Only include clients that have a heroImage and title
      return (
        client &&
        typeof client === 'object' &&
        client.heroImage &&
        typeof client.heroImage === 'object' &&
        client.title
      )
    })
    .map((client: Client): LogoItem => {
      const { heroImage, title, website, companyName } = client
      const displayTitle = companyName || title || 'Client'

      return {
        node: (
          <Media resource={heroImage} imgClassName="h-full w-auto object-contain" fill={false} />
        ),
        href: website || undefined,
        title: displayTitle,
        ariaLabel: `${displayTitle} logo`,
      }
    })

  if (logoItems.length === 0) {
    return null
  }

  return (
    <div className="container">
      <LogoLoop
        logos={logoItems}
        speed={speed}
        direction={direction}
        logoHeight={logoHeight}
        gap={gap}
        pauseOnHover={pauseOnHover}
        fadeOut={fadeOut}
        scaleOnHover={scaleOnHover}
        ariaLabel="Our clients"
        className={className}
      />
    </div>
  )
}

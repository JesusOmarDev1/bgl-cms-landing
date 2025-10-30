import React from 'react'
import type { HerosBlock as HerosBlockProps } from '@/payload-types'
import { HighImpactHero } from './variants/HighImpactHero'
import { MediumImpactHero } from './variants/MediumImpactHero'
import { LowImpactHero } from './variants/LowImpactHero'
import { CustomHero } from './variants/CustomHero'

const heroVariants = {
  'high-impact': HighImpactHero,
  'medium-impact': MediumImpactHero,
  'low-impact': LowImpactHero,
  custom: CustomHero,
} as const

type HeroVariant = keyof typeof heroVariants

type Props = HerosBlockProps & {
  className?: string
}

export const RenderHeros: React.FC<Props> = (props) => {
  const { variant = 'high-impact', className } = props

  const HeroComponent = heroVariants[variant as HeroVariant]

  if (!HeroComponent) {
    return (
      <div className="my-8 p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">Hero variant "{variant}" not found</p>
        <p className="text-xs mt-1">Please select a valid hero variant</p>
      </div>
    )
  }

  return <HeroComponent {...props} className={className} />
}

import React from 'react'
import { cn } from '@/utilities/ui/cn'
import RichText from '@/components/RichText'
import type { HerosBlock } from '@/payload-types'

type Props = HerosBlock & {
  className?: string
}

export const CustomHero: React.FC<Props> = ({ customContent, className }) => {
  if (!customContent) {
    return (
      <div className="my-8 p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">Custom Hero Section</p>
        <p className="text-xs mt-1">Add custom content to create your hero section</p>
      </div>
    )
  }

  return (
    <section className={cn('py-16 lg:py-24', className)}>
      <div className="container mx-auto px-4">
        <RichText
          data={customContent}
          enableGutter={false}
          className="prose prose-gray max-w-none prose-headings:text-center prose-headings:mb-8 prose-p:text-center prose-p:text-lg prose-p:leading-relaxed"
        />
      </div>
    </section>
  )
}

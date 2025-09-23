import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import React from 'react'
import RichText from '@/components/RichText'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleCheck, InfoIcon, OctagonAlert, TriangleAlert } from 'lucide-react'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, title, style }) => {
  return (
    <Alert variant={style} className={cn('w-full', className)}>
      {style === 'info' ? (
        <InfoIcon className="size-4" />
      ) : style === 'success' ? (
        <CircleCheck className="size-4" />
      ) : style === 'warning' ? (
        <TriangleAlert className="size-4" />
      ) : style === 'destructive' ? (
        <OctagonAlert className="size-4" />
      ) : null}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <RichText data={content} enableGutter={false} enableProse={false} />
      </AlertDescription>
    </Alert>
  )
}

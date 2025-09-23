import type { ButtonBlock as ButtonBlockProps } from 'src/payload-types'

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link } from 'next-view-transitions'

type Props = {
  title?: string
  url?: string
  className?: string
  style?: 'default' | 'destructive' | 'link' | 'ghost' | 'outline' | 'secondary'
  effect?: 'gooeyRight' | 'gooeyLeft' | 'ringHover' | 'shine' | 'shineHover'
  align?: 'left' | 'center' | 'right' | 'full' | null
} & ButtonBlockProps

export const ButtonBlock: React.FC<Props> = ({
  className,
  title,
  url,
  style = 'default',
  effect,
  align,
}) => {
  return (
    <div
      className={cn(
        'flex min-w-full items-center',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        align === 'full' && 'justify-stretch',
        (!align || align === null) && 'justify-start',
      )}
    >
      <Link href={url} passHref title={title}>
        <Button
          className={cn(className, align === 'full' && 'w-full')}
          effect={effect}
          variant={style}
        >
          {title}
        </Button>
      </Link>
    </div>
  )
}

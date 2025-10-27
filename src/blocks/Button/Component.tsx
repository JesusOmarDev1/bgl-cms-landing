import type { ButtonBlock as ButtonBlockProps } from 'src/payload-types'

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui/cn'
import { Link } from 'next-view-transitions'

type Props = {
  className?: string
  align?: 'left' | 'center' | 'right' | 'full'
} & ButtonBlockProps

type ButtonItem = NonNullable<ButtonBlockProps['buttons']>[number]

export const ButtonBlock: React.FC<Props> = ({ className, buttons, align }) => {
  if (!buttons || buttons.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row min-w-full flex-wrap items-center gap-3',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        align === 'full' && 'justify-stretch',
        (!align || align === null) && 'justify-start',
        className,
      )}
    >
      {buttons.map((button: ButtonItem, index) => {
        const buttonEffect = button.effect === 'none' ? undefined : button.effect

        return (
          <Link
            key={`button-${button.id || index}`}
            href={button.url || ''}
            passHref
            title={button.title || undefined}
            className={cn(align === 'full' && 'flex-1')}
          >
            <Button
              className={cn(align === 'full' && 'w-full')}
              effect={buttonEffect as any}
              variant={button.style}
            >
              {button.title}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}

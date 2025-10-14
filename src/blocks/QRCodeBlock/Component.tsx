import type { QRCodeBlock as QRCodeBlockProps } from 'src/payload-types'

import React, { Suspense } from 'react'
import { cn } from '@/utilities/ui'
import { QRCode } from '@/components/ui/qr-code'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  className?: string
  align?: 'left' | 'center' | 'right' | 'full' | null
  size?: 'medium' | 'large'
  description?: string
  url: string
} & QRCodeBlockProps

export const QRCodeBlock: React.FC<Props> = ({ className, description, url, align, size }) => {
  // No renderizar QR hasta que la URL esté presente
  if (!url || url.trim() === '') {
    return (
      <div
        className={cn(
          'flex items-center gap-2',
          align === 'left' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end',
          (!align || align === null) && 'justify-start',
          className,
        )}
      >
        <Skeleton
          title={description}
          className={cn(
            'flex items-center justify-center rounded border border-dashed p-2.5',
            size === 'medium' && 'size-32',
            size === 'large' && 'size-48',
            'size-32', // fallback size
          )}
        >
          <p className="text-center text-sm">Codigo QR sin URL</p>
        </Skeleton>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        (!align || align === null) && 'justify-start',
        className,
      )}
    >
      <Suspense
        fallback={
          <Skeleton
            title={description}
            className={cn(size === 'medium' && 'size-32', size === 'large' && 'size-48', 'size-32')}
          />
        }
      >
        <QRCode
          title={description}
          robustness="L"
          data={url}
          className={cn(
            size === 'medium' && 'size-32',
            size === 'large' && 'size-48',
            'rounded bg-white p-2.5',
            className,
          )}
        />
      </Suspense>
    </div>
  )
}

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  if (!columns || columns.length === 0) {
    return null
  }

  // Grid simple basado en número de columnas
  const getGridCols = (count: number) => {
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 md:grid-cols-2'
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (count >= 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    return 'grid-cols-1'
  }

  // Tamaños de columna simplificados
  const getColumnSize = (size: string) => {
    const sizeMap = {
      small: 'col-span-1',
      medium: 'col-span-1',
      large: 'col-span-1 md:col-span-2',
      full: 'col-span-full',
    }
    return sizeMap[size as keyof typeof sizeMap] || 'col-span-1'
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className={cn('grid gap-6', getGridCols(columns.length))}>
          {columns.map((col, index) => {
            const { richText, size } = col

            return (
              <div key={index} className={cn(getColumnSize(size || 'medium'), 'rounded-lg')}>
                {richText && (
                  <div className="mb-4">
                    <RichText
                      data={richText}
                      enableGutter={false}
                      className="prose prose-gray max-w-none"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

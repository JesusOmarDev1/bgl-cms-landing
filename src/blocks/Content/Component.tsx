import { cn } from '@/utilities/ui/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

type LayoutType =
  | 'single'
  | 'two-equal'
  | 'main-sidebar'
  | 'sidebar-main'
  | 'content-aside'
  | 'aside-content'

interface ExtendedContentBlockProps extends Omit<ContentBlockProps, 'layoutType'> {
  layoutType?: LayoutType | null
}

export const ContentBlock: React.FC<ExtendedContentBlockProps> = (props) => {
  const { columns, layoutType = 'single' } = props

  if (!columns || columns.length === 0) {
    return (
      <div className="my-8 p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">Layout Multi-Columna vacío</p>
        <p className="text-xs mt-1">Añade columnas para crear tu layout</p>
      </div>
    )
  }

  // Función para obtener las clases de ancho según el layout
  const getColumnWidths = (layoutType: LayoutType, index: number): string => {
    const layoutMap: Record<LayoutType, string[]> = {
      single: ['w-full'],
      'two-equal': ['w-full md:w-1/2', 'w-full md:w-1/2'],
      'main-sidebar': ['w-full md:w-3/4', 'w-full md:w-1/4'],
      'sidebar-main': ['w-full md:w-1/4', 'w-full md:w-3/4'],
      'content-aside': ['w-full md:w-3/5', 'w-full md:w-2/5'],
      'aside-content': ['w-full md:w-2/5', 'w-full md:w-3/5'],
    }

    const widths = layoutMap[layoutType]
    return widths?.[index] || 'w-full'
  }

  // Determinar si es layout de una sola columna
  const isSingleColumn = layoutType === 'single'

  // Limitar columnas según el layout
  const visibleColumns = isSingleColumn ? columns.slice(0, 1) : columns.slice(0, 2)

  return (
    <section className="my-8">
      <div className="container mx-auto">
        <div className={cn('gap-6', isSingleColumn ? 'block' : 'flex flex-col md:flex-row')}>
          {visibleColumns.map((col, index) => {
            const { richText } = col
            const columnWidth = getColumnWidths(layoutType || 'single', index)

            return (
              <div
                key={index}
                className={cn(
                  'min-w-0', // Prevent flex items from overflowing
                  columnWidth,
                )}
              >
                {richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    className="prose prose-gray max-w-none prose-headings:mt-0 prose-p:mb-4 last:prose-p:mb-0"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

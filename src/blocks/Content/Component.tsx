import { cn } from '@/utilities/ui/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

type LayoutType =
  | 'custom'
  | 'single'
  | 'two-equal'
  | 'two-unequal'
  | 'two-unequal-reverse'
  | 'three-equal'
  | 'sidebar-left'
  | 'sidebar-right'

interface ExtendedContentBlockProps extends ContentBlockProps {
  layoutType?: LayoutType | null
}

export const ContentBlock: React.FC<ExtendedContentBlockProps> = (props) => {
  const { columns, layoutType } = props

  if (!columns || columns.length === 0) {
    return (
      <div className="my-8 p-6 border border-dashed border-muted-foreground/25 rounded-lg text-center text-muted-foreground">
        <p className="text-sm">📝 Layout Multi-Columna vacío</p>
        <p className="text-xs mt-1">Añade columnas para crear tu layout personalizado</p>
      </div>
    )
  }

  // Grid class para layout automático
  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 md:grid-cols-2'
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  // Función para layouts predefinidos
  const getPresetColumnWidth = (layoutType: string, index: number): string => {
    const presetMap: Record<string, string[]> = {
      single: ['w-full'],
      'two-equal': ['w-full md:w-1/2', 'w-full md:w-1/2'],
      'two-unequal': ['w-full md:w-1/3', 'w-full md:w-2/3'],
      'two-unequal-reverse': ['w-full md:w-2/3', 'w-full md:w-1/3'],
      'three-equal': ['w-full md:w-1/3', 'w-full md:w-1/3', 'w-full md:w-1/3'],
      'sidebar-left': ['w-full md:w-1/4', 'w-full md:w-3/4'],
      'sidebar-right': ['w-full md:w-3/4', 'w-full md:w-1/4'],
    }

    const preset = presetMap[layoutType]
    return preset?.[index] || 'flex-1'
  }

  // Función para obtener el ancho de columna basado en el tamaño
  const getColumnWidth = (size: string): string => {
    const sizeMap = {
      auto: 'flex-1',
      quarter: 'w-full md:w-1/4',
      third: 'w-full md:w-1/3',
      half: 'w-full md:w-1/2',
      'two-thirds': 'w-full md:w-2/3',
      'three-quarters': 'w-full md:w-3/4',
      full: 'w-full',
    }
    return sizeMap[size as keyof typeof sizeMap] || 'flex-1'
  }

  // Determinar si usar flexbox o grid
  const useFlexLayout =
    layoutType === 'custom' &&
    columns.some((col) =>
      ['quarter', 'third', 'half', 'two-thirds', 'three-quarters', 'full'].includes(col.size || ''),
    )

  const containerClass =
    useFlexLayout || (layoutType && layoutType !== 'custom')
      ? 'flex flex-col md:flex-row gap-6'
      : `grid gap-6 ${getGridClass(columns.length)}`

  return (
    <section className="my-8">
      <div className="container mx-auto">
        <div className={containerClass}>
          {columns.map((col, index) => {
            const { richText, size } = col

            let columnClass = ''
            if (useFlexLayout || (layoutType && layoutType !== 'custom')) {
              if (layoutType && layoutType !== 'custom') {
                columnClass = getPresetColumnWidth(layoutType, index)
              } else {
                columnClass = getColumnWidth(size || 'auto')
              }
            }

            return (
              <div
                key={index}
                className={cn(
                  'min-w-0', // Prevent flex items from overflowing
                  columnClass,
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

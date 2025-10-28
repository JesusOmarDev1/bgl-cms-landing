'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    size?: string
  }>()

  const getSizeLabel = (size?: string) => {
    const sizeMap = {
      auto: '🔄 Auto',
      quarter: '📱 25%',
      third: '📄 33%',
      half: '📋 50%',
      'two-thirds': '📊 67%',
      'three-quarters': '📺 75%',
      full: '🖥️ 100%',
    }
    return sizeMap[size as keyof typeof sizeMap] || '🔄 Auto'
  }

  const columnNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const sizeLabel = getSizeLabel(data?.data?.size)

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Columna {columnNumber}</span>
      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{sizeLabel}</span>
    </div>
  )
}

'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const IncludesRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    item?: string
  }>()

  const item = data?.data?.item
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Artículo Incluido'

  if (item) {
    const truncatedItem = item.length > 40 ? `${item.substring(0, 40)}...` : item
    label = truncatedItem
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

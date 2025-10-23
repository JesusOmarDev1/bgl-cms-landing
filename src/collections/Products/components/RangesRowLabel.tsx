'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RangesRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    range?: string
  }>()

  const range = data?.data?.range
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Rango'

  if (range) {
    const truncatedRange = range.length > 35 ? `${range.substring(0, 35)}...` : range
    label = truncatedRange
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

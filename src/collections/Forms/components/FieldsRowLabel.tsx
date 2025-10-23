'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const FieldsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    blockType?: string
    name?: string
    label?: string
  }>()

  const blockType = data?.data?.blockType
  const name = data?.data?.name
  const label = data?.data?.label
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  const typeLabels: Record<string, string> = {
    text: 'Texto',
    textarea: 'Texto largo',
    email: 'Email',
    number: 'Número',
    select: 'Selección',
    checkbox: 'Casilla',
    country: 'País',
    state: 'Estado',
    message: 'Mensaje',
  }

  const displayType = blockType ? typeLabels[blockType] || blockType : 'Campo'
  const displayLabel = label || name || 'Sin nombre'
  const truncatedLabel =
    displayLabel.length > 30 ? `${displayLabel.substring(0, 30)}...` : displayLabel

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{displayType}</span>
      <span>
        {rowNum}
        {truncatedLabel}
      </span>
    </div>
  )
}

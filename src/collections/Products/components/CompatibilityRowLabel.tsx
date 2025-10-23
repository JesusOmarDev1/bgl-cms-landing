'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CompatibilityRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    model?: string
  }>()

  const model = data?.data?.model
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Modelo Compatible'

  if (model) {
    const truncatedModel = model.length > 35 ? `${model.substring(0, 35)}...` : model
    label = truncatedModel
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

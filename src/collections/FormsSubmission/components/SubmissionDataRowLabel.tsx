'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SubmissionDataRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    field?: string
    value?: string
  }>()

  const field = data?.data?.field
  const value = data?.data?.value
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let displayText = 'Campo del Formulario'

  if (field && value) {
    const truncatedValue = value.length > 30 ? `${value.substring(0, 30)}...` : value
    displayText = `${field}: ${truncatedValue}`
  } else if (field) {
    displayText = field
  }

  return (
    <div>
      {rowNum}
      {displayText}
    </div>
  )
}

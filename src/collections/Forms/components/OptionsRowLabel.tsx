'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const OptionsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    label?: string
    value?: string
  }>()

  const label = data?.data?.label
  const value = data?.data?.value
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let displayText = 'Opción'

  if (label && value) {
    displayText = `${label} (${value})`
  } else if (label) {
    displayText = label
  } else if (value) {
    displayText = value
  }

  const truncatedText = displayText.length > 35 ? `${displayText.substring(0, 35)}...` : displayText

  return (
    <div>
      {rowNum}
      {truncatedText}
    </div>
  )
}

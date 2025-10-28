'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    title?: string
  }>()

  const label = data?.data?.title
    ? `PDF: ${data.data.title}`
    : `Enlace PDF ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

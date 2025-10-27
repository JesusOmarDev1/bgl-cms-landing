'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    media?: {
      filename?: string
      alt?: string
    }
  }>()

  const filename = data?.data?.media?.filename || ''
  const alt = data?.data?.media?.alt || ''

  const label =
    alt || filename || `Elemento ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

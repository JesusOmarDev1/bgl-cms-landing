'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    link?: {
      label?: string
    }
  }>()

  const label = data?.data?.link?.label
    ? `Enlace ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Fila'

  return <div>{label}</div>
}

'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    title?: string
    type?: string
    active?: boolean
  }>()

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'info':
        return 'Info'
      case 'warning':
        return 'Advertencia'
      case 'success':
        return 'Éxito'
      case 'announcement':
        return 'Anuncio'
      default:
        return 'Anuncio'
    }
  }

  const title = data?.data?.title || 'Sin título'
  const type = data?.data?.type || 'announcement'
  const active = data?.data?.active !== false
  const rowNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  const label = `${getTypeLabel(type)} ${rowNumber}: ${title}${!active ? ' (Inactivo)' : ''}`

  return <div>{label}</div>
}

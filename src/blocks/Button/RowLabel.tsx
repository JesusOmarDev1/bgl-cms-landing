'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    buttons?: Array<{ title?: string }>
    align?: string
  }>()

  const buttonCount = data?.data?.buttons?.length || 0
  const firstButtonTitle = data?.data?.buttons?.[0]?.title || ''
  const alignment = data?.data?.align || 'left'

  let title = `Grupo de Botones ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  if (buttonCount > 0) {
    if (buttonCount === 1) {
      title = `1 Botón: ${firstButtonTitle}`
    } else {
      title = `${buttonCount} Botones: ${firstButtonTitle}${buttonCount > 1 ? ` +${buttonCount - 1}` : ''}`
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span>{title}</span>
      <span className="text-xs text-gray-500">({alignment})</span>
    </div>
  )
}

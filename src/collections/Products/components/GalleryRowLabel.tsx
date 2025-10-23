'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const GalleryRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    image?: any
    alt?: string
    caption?: string
  }>()

  const alt = data?.data?.alt
  const caption = data?.data?.caption
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Imagen de Galería'

  if (alt || caption) {
    const displayText = alt || caption || ''
    const truncatedText =
      displayText.length > 35 ? `${displayText.substring(0, 35)}...` : displayText
    label = truncatedText
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

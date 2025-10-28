'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const HeaderRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    text?: string
  }>()

  const label = data?.data?.text
    ? `Columna: ${data.data.text}`
    : `Columna ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

export const DataRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    cells?: Array<{ content?: string }>
  }>()

  const firstCellContent = data?.data?.cells?.[0]?.content
  const label = firstCellContent
    ? `Fila: ${firstCellContent.substring(0, 30)}${firstCellContent.length > 30 ? '...' : ''}`
    : `Fila ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

export const CellRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    content?: string
  }>()

  const label = data?.data?.content
    ? `Celda: ${data.data.content.substring(0, 20)}${data.data.content.length > 20 ? '...' : ''}`
    : `Celda ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}

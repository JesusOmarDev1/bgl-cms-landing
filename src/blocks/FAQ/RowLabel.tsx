'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    question?: string
  }>()

  const question =
    `Pregunta ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.question || ' '}` ||
    `Fila ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{question}</div>
}

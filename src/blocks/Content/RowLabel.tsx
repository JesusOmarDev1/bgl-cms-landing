'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ColumnRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel()

  const columnNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Columna {columnNumber}</span>
    </div>
  )
}

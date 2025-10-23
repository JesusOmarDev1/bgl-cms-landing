'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ScaleFunctionsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    function?: string
    description?: string
  }>()

  const functionName = data?.data?.function
  const description = data?.data?.description
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Función'

  if (functionName) {
    const truncatedFunction =
      functionName.length > 35 ? `${functionName.substring(0, 35)}...` : functionName
    label = truncatedFunction
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

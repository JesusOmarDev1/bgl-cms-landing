'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    stepTitle?: string
  }>()

  const stepNumber = data.rowNumber !== undefined ? data.rowNumber + 1 : ''
  const stepTitle = data?.data?.stepTitle || 'Sin título'

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">Paso {stepNumber}:</span>
      <span className="text-muted-foreground">{stepTitle}</span>
    </div>
  )
}

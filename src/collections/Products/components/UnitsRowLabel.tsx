'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const UnitsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    unit?: string
  }>()

  const unit = data?.data?.unit
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Unidad'

  if (unit) {
    const unitLabels: Record<string, string> = {
      kg: 'Kilogramos',
      g: 'Gramos',
      mg: 'Miligramos',
      mc: 'Microgramos',
      lb: 'Libras',
      oz: 'Onzas',
      t: 'Toneladas',
    }

    label = unitLabels[unit] || unit
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

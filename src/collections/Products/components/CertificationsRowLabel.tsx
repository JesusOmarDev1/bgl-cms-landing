'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CertificationsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    certification?: string
  }>()

  const certification = data?.data?.certification
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Certificación'

  if (certification) {
    const certLabels: Record<string, string> = {
      ce: 'CE',
      fcc: 'FCC',
      ul: 'UL',
      rohs: 'RoHS',
    }

    label = certLabels[certification] || certification.toUpperCase()
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

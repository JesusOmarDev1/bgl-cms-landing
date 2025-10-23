'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ApplicationsRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    application?: string
  }>()

  const application = data?.data?.application || 'Aplicación'
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  // Truncar si es muy largo
  const truncatedApplication =
    application.length > 40 ? `${application.substring(0, 40)}...` : application

  return (
    <div>
      {rowNum}
      {truncatedApplication}
    </div>
  )
}

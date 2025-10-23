'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const CommunicationRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    type?: string
    description?: string
  }>()

  const type = data?.data?.type
  const description = data?.data?.description
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Comunicación'

  if (type) {
    const typeLabels: Record<string, string> = {
      rs232: 'Puerto Serial RS-232',
      usb: 'USB',
      wifi: 'WiFi',
      ethernet: 'Ethernet',
      bluetooth: 'Bluetooth',
    }

    const typeLabel = typeLabels[type] || type
    const descText = description ? ` - ${description}` : ''
    const truncatedDesc = descText.length > 20 ? `${descText.substring(0, 20)}...` : descText
    label = `${typeLabel}${truncatedDesc}`
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

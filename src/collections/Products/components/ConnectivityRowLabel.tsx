'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const ConnectivityRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    type?: string
    description?: string
  }>()

  const type = data?.data?.type
  const description = data?.data?.description
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Conexión'

  if (type) {
    const typeLabels: Record<string, string> = {
      usb: 'USB',
      rs232: 'RS-232',
      wifi: 'WiFi',
      bluetooth: 'Bluetooth',
      ethernet: 'Ethernet',
    }

    const typeLabel = typeLabels[type] || type
    const descText = description ? ` - ${description}` : ''
    const truncatedDesc = descText.length > 25 ? `${descText.substring(0, 25)}...` : descText
    label = `${typeLabel}${truncatedDesc}`
  }

  return (
    <div>
      {rowNum}
      {label}
    </div>
  )
}

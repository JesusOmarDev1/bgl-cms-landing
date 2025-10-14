'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SocialRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    platform?: string
    url?: string
  }>()

  const platform = data?.data?.platform
  const label = platform
    ? `Red Social ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
    : 'Fila'

  return <div>{label}</div>
}

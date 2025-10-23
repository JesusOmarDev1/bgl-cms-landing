'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { getIconComponent } from '@/fields/iconPicker'

export const IncludesRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    item?: string
    icon?: string
  }>()

  const item = data?.data?.item
  const iconName = data?.data?.icon
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Artículo Incluido'

  if (item) {
    const truncatedItem = item.length > 40 ? `${item.substring(0, 40)}...` : item
    label = truncatedItem
  }

  const IconComponent = iconName ? getIconComponent(iconName) : null

  return (
    <div className="flex items-center gap-2">
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span>
        {rowNum}
        {label}
      </span>
    </div>
  )
}

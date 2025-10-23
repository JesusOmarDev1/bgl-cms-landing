'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { getIconComponent } from '@/fields/iconPicker'

export const FeaturesRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{
    feature?: string
    icon?: string
  }>()

  const feature = data?.data?.feature
  const iconName = data?.data?.icon
  const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''

  let label = 'Característica'

  if (feature) {
    const truncatedFeature = feature.length > 35 ? `${feature.substring(0, 35)}...` : feature
    label = truncatedFeature
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

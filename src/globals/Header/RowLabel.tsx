'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { getIconComponent } from '@/fields/iconPicker'

type LinkData = {
  icon?: string
  link?: {
    label?: string
    url?: string
    newTab?: boolean
  }
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<LinkData>()

  const iconName = data?.data?.icon
  const linkLabel = data?.data?.link?.label
  const linkUrl = data?.data?.link?.url
  const isNewTab = data?.data?.link?.newTab

  let label = 'Enlace sin configurar'

  if (linkLabel) {
    const rowNum = data.rowNumber !== undefined ? `${data.rowNumber + 1}. ` : ''
    const targetIcon = isNewTab ? ' 🔗' : ''
    const urlPreview = linkUrl
      ? ` → ${linkUrl.length > 30 ? linkUrl.substring(0, 30) + '...' : linkUrl}`
      : ''
    label = `${rowNum}${linkLabel}${targetIcon}${urlPreview}`
  }

  const IconComponent = iconName ? getIconComponent(iconName) : null

  return (
    <div className="flex items-center gap-2 font-medium text-sm">
      {IconComponent && <IconComponent className="h-4 w-4" />}
      <span>{label}</span>
    </div>
  )
}

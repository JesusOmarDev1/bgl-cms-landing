import type { TextField } from 'payload'

type IconPickerOptions = {
  name?: string
  label?: string | Record<string, string>
  required?: boolean
  admin?: {
    position?: 'sidebar' | undefined
    description?: string | Record<string, string>
    condition?: any
    readOnly?: boolean
    hidden?: boolean
  }
  iconSize?: number
  columns?: number
  defaultValue?: string
}

export const iconPickerField = (options: IconPickerOptions = {}): TextField => {
  const {
    name = 'icon',
    label = {
      en: 'Icon',
      es: 'Icono',
    },
    required = false,
    admin = {},
    iconSize = 24,
    columns = 8,
    defaultValue,
  } = options

  return {
    name,
    type: 'text',
    label,
    required,
    defaultValue,
    admin: {
      ...admin,
      components: {
        Field: {
          path: '@/fields/iconPicker/IconPickerComponent#IconPickerComponent',
          clientProps: {
            iconSize,
            columns,
          },
        },
      },
    },
  }
}

export { availableIcons, getIconComponent, isValidIcon, getIconLabel, searchIcons } from './iconList'
export type { IconName } from './iconList'

import type { Field } from 'payload'

export interface ColorPickerFieldProps {
  name: string
  label?: string | { en: string; es: string }
  required?: boolean
  admin?: {
    description?: string
    condition?: (data: any, siblingData: any) => boolean
    readOnly?: boolean
    hidden?: boolean
  }
  defaultValue?: string
}

export const colorPickerField = ({
  name,
  label,
  required = false,
  admin,
  defaultValue = '#000000',
}: ColorPickerFieldProps): Field => ({
  name,
  type: 'text',
  label: label || {
    en: 'Color',
    es: 'Color',
  },
  required,
  defaultValue,
  admin: {
    components: {
      Field: '@/fields/colorPicker/Component#ColorPickerField',
    },
    description: admin?.description || 'Selecciona un color',
    ...admin,
  },
})

export default colorPickerField

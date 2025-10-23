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
  validate: (value: string) => {
    // Allow empty values if not required
    if (!value && !required) {
      return true
    }

    // Validate hex color format
    if (value && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)) {
      return 'Por favor ingresa un color válido en formato hexadecimal (ej: #FF0000)'
    }

    return true
  },
  admin: {
    components: {
      Field: '@/fields/colorPicker/Component#ColorPickerField',
    },
    description:
      admin?.description ||
      'Selecciona un color usando el selector o ingresa un código hexadecimal',
    ...admin,
  },
})

export default colorPickerField

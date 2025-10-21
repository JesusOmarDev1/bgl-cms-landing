// Tipos personalizados para reemplazar @payloadcms/plugin-form-builder/types

export type BaseField = {
  name: string
  label?: string
  width?: number
  required?: boolean
  id?: string
  blockName?: string
}

export type CheckboxField = BaseField & {
  blockType: 'checkbox'
  defaultValue?: boolean
}

export type EmailField = BaseField & {
  blockType: 'email'
  defaultValue?: string
}

export type TextField = BaseField & {
  blockType: 'text' | 'textarea' | 'number'
  defaultValue?: string
}

export type SelectField = BaseField & {
  blockType: 'select'
  defaultValue?: string
  options?: Array<{
    label: string
    value: string
  }>
}

export type CountryField = BaseField & {
  blockType: 'country'
}

export type StateField = BaseField & {
  blockType: 'state'
}

export type MessageField = {
  blockType: 'message'
  message?: any
  id?: string
  blockName?: string
}

export type FormField =
  | CheckboxField
  | EmailField
  | TextField
  | SelectField
  | CountryField
  | StateField
  | MessageField

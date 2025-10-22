export interface TextField {
  blockType: 'text'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export interface TextareaField {
  blockType: 'textarea'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export interface EmailField {
  blockType: 'email'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export interface NumberField {
  blockType: 'number'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: number
  required?: boolean
}

export interface SelectFieldOption {
  label: string
  value: string
}

export interface SelectField {
  blockType: 'select'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
  options: SelectFieldOption[]
}

export interface CheckboxField {
  blockType: 'checkbox'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: boolean
  required?: boolean
}

export interface CountryField {
  blockType: 'country'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export interface StateField {
  blockType: 'state'
  blockName?: string
  width?: number
  name: string
  label?: string
  defaultValue?: string
  required?: boolean
}

export interface MessageField {
  blockType: 'message'
  blockName?: string
  message: unknown
}

export type FormFieldBlock =
  | TextField
  | TextareaField
  | SelectField
  | EmailField
  | StateField
  | CountryField
  | CheckboxField
  | MessageField

// Alias para compatibilidad
export type FormField = FormFieldBlock

// ============================================================================
// Email Types
// ============================================================================

export interface Email {
  emailTo: string
  emailFrom: string
  cc?: string
  bcc?: string
  replyTo?: string
  subject: string
  message?: any // Rich text content (Lexical)
}

export interface FormattedEmail {
  to: string
  cc?: string
  bcc?: string
  from: string
  subject: string
  html: string
  replyTo: string
}

// ============================================================================
// Form Types
// ============================================================================

export interface Redirect {
  type: 'reference' | 'custom'
  reference?: {
    relationTo: string
    value: string | unknown
  }
  url: string
}

export interface Form {
  id: string
  title: string
  fields: FormFieldBlock[]
  submitButtonLabel?: string
  confirmationType: 'message' | 'redirect'
  confirmationMessage?: any // Rich text content (Lexical)
  redirect?: Redirect
  emails: Email[]
}

// ============================================================================
// Submission Types
// ============================================================================

export interface SubmissionValue {
  field: string
  value: unknown
}

export interface FieldValues {
  [key: string]: string | number | boolean | null | undefined
}

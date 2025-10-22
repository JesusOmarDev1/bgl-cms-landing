'use client'

import React, { useCallback } from 'react'
import { useField, FieldLabel } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { ColorPickerWithTrigger } from '@/components/ui/pickers/color-picker'

export const ColorPickerField: React.FC<TextFieldClientProps> = (props) => {
  const { field, path } = props
  const { value, setValue } = useField<string>({ path })

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue)
    },
    [setValue],
  )

  return (
    <div className="field-type-text">
      <FieldLabel label={field?.label} />

      {field?.admin?.description && (
        <div className="field-description">
          {typeof field.admin.description === 'string'
            ? field.admin.description
            : JSON.stringify(field.admin.description)}
        </div>
      )}

      <ColorPickerWithTrigger
        value={value || ''}
        onChange={handleChange}
        disabled={field?.admin?.readOnly}
      />
    </div>
  )
}

'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { useField, FieldLabel, FieldError } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { ColorPickerWithTrigger } from '@/components/ui/pickers/color-picker'

export const ColorPickerField: React.FC<TextFieldClientProps> = (props) => {
  const { field, path } = props
  const { value, setValue, errorMessage, showError } = useField<string>({ path })
  const [localValue, setLocalValue] = useState<string>('')

  // Initialize local value with proper fallback
  useEffect(() => {
    const initialValue = value || '#000000'
    setLocalValue(initialValue)
  }, [value])

  const handleChange = useCallback(
    (newValue: string) => {
      try {
        // Validate hex color format
        if (newValue && !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue)) {
          console.warn('Invalid color format:', newValue)
          return
        }

        setLocalValue(newValue)
        setValue(newValue || null) // Use null instead of empty string for better Payload handling
      } catch (error) {
        console.error('Error setting color value:', error)
      }
    },
    [setValue],
  )

  return (
    <div className="field-type-text space-y-2 my-4">
      <FieldLabel label={field?.label} required={field?.required} htmlFor={`field-${path}`} />

      {field?.admin?.description && (
        <div>
          {typeof field.admin.description === 'string'
            ? field.admin.description
            : JSON.stringify(field.admin.description)}
        </div>
      )}

      <div className="space-y-1">
        <ColorPickerWithTrigger
          value={localValue}
          onChange={handleChange}
          disabled={field?.admin?.readOnly}
          className="w-full"
        />

        {showError && errorMessage && <FieldError message={errorMessage} />}
      </div>
    </div>
  )
}

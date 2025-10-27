'use client'
import React, { useCallback } from 'react'
import { TextFieldClientProps } from 'payload'

import {
  useField,
  Button,
  TextInput,
  FieldLabel,
  useFormFields,
  useForm,
  FieldError,
} from '@payloadcms/ui'

import './index.scss'
import formatSlug from '@/utilities/string/formatSlug'

type SlugComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue, showError, errorMessage } = useField<string>({
    path: path || field.name,
  })

  const { dispatchFields, getDataByPath } = useForm()

  const isLocked = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  const handleGenerate = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      const targetFieldValue = getDataByPath(fieldToUse) as string

      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    },
    [setValue, value, fieldToUse, getDataByPath],
  )

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !isLocked,
      })
    },
    [isLocked, checkboxFieldPath, dispatchFields],
  )

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        {!isLocked && (
          <Button className="lock-button" buttonStyle="primary" onClick={handleGenerate}>
            Generar
          </Button>
        )}
        <Button className="lock-button" buttonStyle="pill" onClick={handleLock}>
          {isLocked ? 'Desbloquear' : 'Bloquear'}
        </Button>
      </div>
      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnlyFromProps || isLocked)}
      />
      {showError && errorMessage && <FieldError message={errorMessage} />}
    </div>
  )
}

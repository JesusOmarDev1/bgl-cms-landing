'use client'
import type { Form } from '@/payload-types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/url/utils'
import { Spinner } from '@/components/ui/spinner'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: Form
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const { enableIntro, form: formFromProps, introContent } = props

  // Estado para el formulario cargado
  const [loadedForm, setLoadedForm] = useState<Form | null>(
    typeof formFromProps === 'object' ? formFromProps : null,
  )
  const [isLoadingForm, setIsLoadingForm] = useState(
    typeof formFromProps === 'number' || typeof formFromProps === 'string',
  )

  // Cargar el formulario si solo tenemos el ID
  useEffect(() => {
    const loadForm = async () => {
      if (typeof formFromProps === 'number' || typeof formFromProps === 'string') {
        try {
          const response = await fetch(`${getClientSideURL()}/api/forms/${formFromProps}?depth=2`)
          const data = await response.json()
          setLoadedForm(data)
        } catch (err) {
          console.error('Error loading form:', err)
        } finally {
          setIsLoadingForm(false)
        }
      }
    }
    loadForm()
  }, [formFromProps])

  const formToUse = loadedForm
  const formID = typeof formFromProps === 'object' ? formFromProps?.id : formFromProps
  const submitConfig = formToUse?.submitConfig
  const confirmationMessage = submitConfig?.confirmationMessage
  const confirmationType = submitConfig?.confirmationType
  const redirectPage = submitConfig?.redirectPage
  const submitButtonLabel = submitConfig?.buttonLabel || 'Enviar'

  const formMethods = useForm({
    defaultValues: React.useMemo(() => {
      if (!formToUse?.fields) return {}

      const defaults: Record<string, any> = {}

      formToUse.fields.forEach((field: any) => {
        if (field.name && field.defaultValue !== undefined) {
          defaults[field.name] = field.defaultValue
        }
      })

      return defaults
    }, [formToUse?.fields]),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: any) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Convertir datos del formulario al formato esperado por el endpoint
          const submissionData = Object.entries(data).map(([field, value]) => ({
            field,
            value: String(value),
          }))

          const req = await fetch(`${getClientSideURL()}/api/form-submission`, {
            body: JSON.stringify({
              formId: formID,
              submissionData,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.message || res.error || 'Error Interno del Servidor',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirectPage) {
            const url = typeof redirectPage === 'object' ? redirectPage.slug : redirectPage

            if (url) router.push(`/${url}`)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Algo salio mal. Intenta de nuevo mas tarde',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirectPage, confirmationType],
  )

  return (
    <div className="container lg:max-w-3xl">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-4" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && confirmationMessage && (
            <RichText data={confirmationMessage} />
          )}
          {(isLoading || isLoadingForm) && !hasSubmitted && <Spinner className="size-20" />}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && !isLoadingForm && (
            <form id={formID?.toString()} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formToUse &&
                  formToUse.fields &&
                  formToUse.fields?.map((field: any, index) => {
                    const blockType = field.blockType

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[blockType as keyof typeof fields]

                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formToUse}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    console.warn('No component found for blockType:', blockType)
                    return null
                  })}
              </div>

              <Button form={formID?.toString()} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}

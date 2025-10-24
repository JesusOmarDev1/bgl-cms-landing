/**
 * Hook para validar datos del formulario dinámicamente
 * Implementa la validación que el plugin oficial menciona en el TODO
 * https://github.com/payloadcms/plugin-form-builder/blob/main/src/collections/FormSubmissions/index.ts#L64-L72
 */

import type { CollectionBeforeValidateHook } from 'payload'

export const validateFormData: CollectionBeforeValidateHook = async ({ data, req, operation }) => {
  // Solo validar en creación
  if (operation !== 'create') {
    return data
  }

  // Validación más flexible desde el admin panel
  const isAdminCreation = !!req.user

  const { payload } = req
  const { form: formID, submissionData } = data || {}

  if (!formID || !submissionData) {
    return data
  }

  try {
    // Obtener el formulario para acceder a la configuración de campos
    const form = await payload.findByID({
      id: formID,
      collection: 'forms',
    })

    const formFields = (form.fields || []) as any[]

    // Validar cada campo del formulario
    const errors: string[] = []

    for (const formField of formFields) {
      // Saltar campos de tipo 'message' que no requieren validación
      if (formField.blockType === 'message') {
        continue
      }

      // Buscar el valor enviado para este campo
      const submittedField = submissionData.find((item: any) => item.field === formField.name)

      // Validar campo requerido
      if (formField.required) {
        if (!submittedField || !submittedField.value || submittedField.value.trim() === '') {
          const fieldLabel = formField.label || formField.name
          errors.push(`El campo "${fieldLabel}" es obligatorio`)
          continue
        }
      }

      // Si no hay valor, continuar (campo opcional)
      if (!submittedField || !submittedField.value) {
        continue
      }

      const value = submittedField.value

      // Validar según el tipo de campo
      switch (formField.blockType) {
        case 'email':
          // Validar formato de email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            const fieldLabel = formField.label || formField.name
            errors.push(`El campo "${fieldLabel}" debe ser un email válido`)
          }
          break

        case 'number':
          // Validar que sea un número
          if (isNaN(Number(value))) {
            const fieldLabel = formField.label || formField.name
            errors.push(`El campo "${fieldLabel}" debe ser un número`)
          }
          break

        case 'select':
          // Validar que el valor esté en las opciones
          if (formField.options && formField.options.length > 0) {
            const validValues = formField.options.map((opt: any) => opt.value)
            if (!validValues.includes(value)) {
              const fieldLabel = formField.label || formField.name
              errors.push(`El valor seleccionado para "${fieldLabel}" no es válido`)
            }
          }
          break

        case 'checkbox':
          // Validar que sea un booleano
          if (value !== 'true' && value !== 'false' && typeof value !== 'boolean') {
            const fieldLabel = formField.label || formField.name
            errors.push(`El campo "${fieldLabel}" debe ser verdadero o falso`)
          }
          break

        // Para text, textarea, country, state no hay validación adicional
        default:
          break
      }
    }

    // Si hay errores, lanzar excepción (más permisivo desde admin)
    if (errors.length > 0) {
      if (isAdminCreation) {
        // Solo advertir en el admin, no fallar
        payload.logger.warn({ msg: `Advertencias de validación desde admin: ${errors.join(', ')}` })
      } else {
        // Fallar en frontend
        throw new Error(`Errores de validación: ${errors.join(', ')}`)
      }
    }
  } catch (error) {
    // Si es un error de validación, propagarlo
    if (error instanceof Error && error.message.startsWith('Errores de validación:')) {
      throw error
    }
    // Si es otro error (ej: formulario no encontrado), loguearlo pero no fallar
    payload.logger.error({
      err: `Error al validar form submission: ${error}`,
    })
  }

  return data
}

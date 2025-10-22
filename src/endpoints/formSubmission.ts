import type { PayloadRequest } from 'payload'
import { addDataAndFileToRequest } from 'payload'

export const formSubmission = async (req: PayloadRequest): Promise<Response> => {
  try {
    // Parsear el body del request
    await addDataAndFileToRequest(req)
    const { formId, submissionData } = req.data as any

    // Validar datos requeridos
    if (!formId) {
      return Response.json(
        {
          error: 'El campo formId es requerido',
        },
        { status: 400 },
      )
    }

    if (!submissionData || !Array.isArray(submissionData)) {
      return Response.json(
        {
          error: 'El campo submissionData es requerido y debe ser un array',
        },
        { status: 400 },
      )
    }

    // Validar estructura de submissionData
    const isValidStructure = submissionData.every(
      (item: any) =>
        typeof item === 'object' &&
        item !== null &&
        'field' in item &&
        'value' in item &&
        typeof item.field === 'string',
    )

    if (!isValidStructure) {
      return Response.json(
        {
          error:
            'submissionData debe ser un array de objetos con la estructura: [{ field: string, value: string }]',
        },
        { status: 400 },
      )
    }

    // Verificar que el formulario existe
    try {
      await req.payload.findByID({
        collection: 'forms',
        id: formId,
      })
    } catch (error) {
      return Response.json(
        {
          error: 'El formulario especificado no existe',
        },
        { status: 404 },
      )
    }

    // Crear el form submission
    // Los hooks beforeValidate y beforeChange se ejecutarán automáticamente
    const submission = await req.payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData,
      },
      req,
    })

    // Obtener el formulario para la respuesta de confirmación
    const form = await req.payload.findByID({
      collection: 'forms',
      id: formId,
    })

    // Preparar respuesta de confirmación
    const confirmationType = (form as any).submitConfig?.confirmationType || 'message'
    const confirmationMessage = (form as any).submitConfig?.confirmationMessage
    const redirectPage = (form as any).submitConfig?.redirectPage

    return Response.json(
      {
        success: true,
        message: 'Formulario enviado correctamente',
        submissionId: submission.id,
        confirmation: {
          type: confirmationType,
          message: confirmationMessage,
          redirectPage: redirectPage,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    // Si es un error de validación, devolver mensaje específico
    if (error instanceof Error) {
      // Errores de validación del hook beforeValidate
      if (error.message.startsWith('Errores de validación:')) {
        return Response.json(
          {
            error: 'Error de validación',
            message: error.message.replace('Errores de validación: ', ''),
          },
          { status: 400 },
        )
      }

      // Otros errores de Payload
      return Response.json(
        {
          error: 'Error al procesar el formulario',
          message: error.message,
        },
        { status: 500 },
      )
    }

    // Error desconocido
    return Response.json(
      {
        error: 'Error desconocido al procesar el formulario',
      },
      { status: 500 },
    )
  }
}

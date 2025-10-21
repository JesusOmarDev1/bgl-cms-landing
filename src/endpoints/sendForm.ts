import type { PayloadRequest } from 'payload'
import { addDataAndFileToRequest } from 'payload'

export const sendForm = async (req: PayloadRequest): Promise<Response> => {
  try {
    // Parsear el body del request
    await addDataAndFileToRequest(req)
    const { formId, data: formData } = req.data as any

    if (!formId || !formData) {
      return Response.json(
        {
          error: 'Faltan datos requeridos: formId y data',
        },
        { status: 400 },
      )
    }

    // Obtener el formulario
    const form = await req.payload.findByID({
      collection: 'forms',
      id: formId,
    })

    if (!form) {
      return Response.json(
        {
          error: 'Formulario no encontrado',
        },
        { status: 404 },
      )
    }

    if (!(form as any).active) {
      return Response.json(
        {
          error: 'Este formulario ya no está activo',
        },
        { status: 403 },
      )
    }

    // Validar campos requeridos
    const erroresValidacion: string[] = []
    form.fields?.forEach((field: any) => {
      if (field.required && !formData[field.name]) {
        erroresValidacion.push(`El campo "${field.label}" es obligatorio`)
      }
    })

    if (erroresValidacion.length > 0) {
      return Response.json(
        {
          error: 'Errores de validación',
          errores: erroresValidacion,
        },
        { status: 400 },
      )
    }

    // Crear el envío
    const submission = await req.payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData: formData,
      } as any,
      req,
    })

    // Enviar notificaciones por email si están configuradas
    const formData_any = form as any
    if (formData_any.emailNotifications && formData_any.emailNotifications.length > 0) {
      for (const notification of formData_any.emailNotifications) {
        try {
          // Reemplazar variables en el asunto y mensaje
          let subject = notification.subject || 'Nuevo envío de formulario'
          let message = notification.message || ''

          // Reemplazar {{nombreCampo}} con valores
          Object.keys(formData).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g')
            subject = subject.replace(regex, formData[key])
            message = message.replace(regex, formData[key])
          })

          // Reemplazar {{*}} con todos los datos
          if (message.includes('{{*}}')) {
            const allData = Object.entries(formData)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n')
            message = message.replace(/\{\{\*\}\}/g, allData)
          }

          // Reemplazar {{*:tabla}} con tabla HTML
          if (message.includes('{{*:tabla}}')) {
            const tableHTML = `
              <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                  <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  ${Object.entries(formData)
                    .map(
                      ([key, value]) => `
                    <tr>
                      <td><strong>${key}</strong></td>
                      <td>${value}</td>
                    </tr>
                  `,
                    )
                    .join('')}
                </tbody>
              </table>
            `
            message = message.replace(/\{\{\*:tabla\}\}/g, tableHTML)
          }

          // Enviar email usando la API de Payload
          await req.payload.sendEmail({
            to: notification.emailTo,
            from: notification.emailFrom || process.env.RESEND_DEFAULT_EMAIL || '',
            subject: subject,
            html: message,
            ...(notification.cc && { cc: notification.cc }),
            ...(notification.bcc && { bcc: notification.bcc }),
            ...(notification.replyTo && { replyTo: notification.replyTo }),
          })
        } catch (emailError) {
          console.error('Error al enviar email:', emailError)
          // No fallar el envío si el email falla
        }
      }
    }

    // Responder con éxito
    return Response.json(
      {
        success: true,
        message: 'Formulario enviado correctamente',
        submissionId: submission.id,
        confirmation: (form as any).submitConfig,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error al procesar formulario:', error)
    return Response.json(
      {
        error: 'Error al procesar el formulario',
        detalles: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 },
    )
  }
}

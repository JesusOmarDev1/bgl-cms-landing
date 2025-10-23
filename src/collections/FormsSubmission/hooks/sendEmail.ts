/**
 * Hook para enviar emails cuando se crea un form submission
 * Basado en: https://github.com/payloadcms/plugin-form-builder/blob/main/src/collections/FormSubmissions/hooks/sendEmail.ts
 */

import type { CollectionBeforeChangeHook } from 'payload'
import { replaceDoubleCurlys } from '@/utilities/replaceDoubleCurlys'
import { serializeLexical } from '@/utilities/serializeLexical'

interface Email {
  emailTo: string
  emailFrom?: string
  cc?: string
  bcc?: string
  replyTo?: string
  subject: string
  message?: any
}

interface FormattedEmail {
  to: string
  from: string
  cc?: string
  bcc?: string
  replyTo: string
  subject: string
  html: string
}

export const sendEmail: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  // Solo ejecutar en creación
  if (operation !== 'create') {
    return data
  }

  const { payload, locale } = req
  const { form: formID, submissionData } = data || {}

  if (!formID || !submissionData) {
    return data
  }

  try {
    // Obtener el formulario
    const form = await payload.findByID({
      id: formID,
      collection: 'forms',
      locale,
    })

    const emails = (form as any).emailNotifications || []

    if (!emails || emails.length === 0) {
      payload.logger.info({ msg: 'No hay emails configurados para enviar.' })
      return data
    }

    // Formatear los emails
    const formattedEmails: FormattedEmail[] = emails
      .map((email: Email): FormattedEmail | null => {
        const { message, subject, emailTo, cc, bcc, emailFrom, replyTo } = email

        if (!emailTo) return null

        const to = replaceDoubleCurlys(emailTo, submissionData)
        const ccFormatted = cc ? replaceDoubleCurlys(cc, submissionData) : ''
        const bccFormatted = bcc ? replaceDoubleCurlys(bcc, submissionData) : ''
        const from = emailFrom
          ? replaceDoubleCurlys(emailFrom, submissionData)
          : process.env.RESEND_DEFAULT_EMAIL || 'noreply@example.com'
        const replyToFormatted = replyTo ? replaceDoubleCurlys(replyTo, submissionData) : from

        // Serializar el mensaje de Lexical a HTML
        let html = ''
        if (message) {
          if (typeof message === 'string') {
            html = replaceDoubleCurlys(message, submissionData)
          } else {
            // Es contenido Lexical
            html = serializeLexical(message, submissionData)
          }
        }

        return {
          to,
          from,
          cc: ccFormatted,
          bcc: bccFormatted,
          replyTo: replyToFormatted,
          subject: replaceDoubleCurlys(subject, submissionData),
          html: `<div>${html}</div>`,
        }
      })
      .filter(Boolean) as FormattedEmail[]

    // Enviar todos los emails
    await Promise.all(
      formattedEmails.map(async (email) => {
        const { to, from, cc, bcc, replyTo, subject, html } = email

        try {
          await payload.sendEmail({
            to,
            from,
            subject,
            html,
            ...(cc && { cc }),
            ...(bcc && { bcc }),
            ...(replyTo && { replyTo }),
          })

          payload.logger.info({ msg: `Email enviado exitosamente a: ${to}` })
        } catch (err: unknown) {
          payload.logger.error({
            err: `Error al enviar email a: ${to}. Error: ${err}`,
          })
        }
      }),
    )
  } catch (err: unknown) {
    const msg = `Error al procesar emails para el form submission.`
    payload.logger.error({ err: msg })
  }

  return data
}

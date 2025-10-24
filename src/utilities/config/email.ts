import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import nodemailer from 'nodemailer'

/**
 * Get the appropriate email adapter based on environment
 * @returns Email adapter configuration
 */

export function getEmailAdapter() {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_DEFAULT_EMAIL) {
      throw new Error('RESEND_API_KEY y RESEND_DEFAULT_EMAIL son necesarios en producción')
    }

    return resendAdapter({
      defaultFromAddress: process.env.RESEND_DEFAULT_USER,
      defaultFromName: process.env.RESEND_DEFAULT_NAME,
      apiKey: process.env.RESEND_API_KEY,
    })
  } else {
    if (!process.env.NODEMAILER_USER || !process.env.NODEMAILER_PASS) {
      throw new Error('NODEMAILER_USER y NODEMAILER_PASS son necesarios en desarrollo')
    }

    return nodemailerAdapter({
      defaultFromAddress: process.env.NODEMAILER_USER || '',
      defaultFromName: process.env.NODEMAILER_NAME,
      transport: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      }),
    })
  }
}

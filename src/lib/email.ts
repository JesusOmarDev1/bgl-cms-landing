import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import nodemailer from 'nodemailer'

export function getEmailAdapter() {
  if (process.env.NODE_ENV === 'production') {
    return resendAdapter({
      defaultFromAddress: process.env.RESEND_DEFAULT_EMAIL || '',
      defaultFromName: process.env.RESEND_DEFAULT_NAME || 'BGL Básculas Industriales',
      apiKey: process.env.RESEND_API_KEY || '',
    })
  } else {
    return nodemailerAdapter({
      defaultFromAddress: process.env.GMAIL_USER || '',
      defaultFromName: process.env.GMAIL_NAME || 'BGL Básculas Industriales',
      transport: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      }),
    })
  }
}

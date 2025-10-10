import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import nodemailer from 'nodemailer'

export function getEmailAdapter() {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    const apiKey = process.env.RESEND_API_KEY
    const defaultEmail = process.env.RESEND_DEFAULT_EMAIL

    if (!apiKey || !defaultEmail) {
      throw new Error('RESEND_API_KEY and RESEND_DEFAULT_EMAIL are required in production')
    }

    return resendAdapter({
      defaultFromAddress: defaultEmail,
      defaultFromName: process.env.RESEND_DEFAULT_NAME || 'BGL Básculas Industriales',
      apiKey,
    })
  } else {
    const gmailUser = process.env.GMAIL_USER
    const gmailPass = process.env.GMAIL_PASS

    if (!gmailUser || !gmailPass) {
      console.warn('Gmail credentials not configured. Email sending will not work.')
    }

    return nodemailerAdapter({
      defaultFromAddress: gmailUser || '',
      defaultFromName: process.env.GMAIL_NAME || 'BGL Básculas Industriales',
      transport: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      }),
    })
  }
}

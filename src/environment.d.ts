declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Payload
      PAYLOAD_SECRET: string
      PREVIEW_SECRET: string
      CRON_SECRET: string
      // DB
      SQLITE_URI: string
      PG_URI: string
      // URL's
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PROJECT_PRODUCTION_URL: string
      // Cloudfare S3 Buckets
      DEV_S3_BUCKET: string
      DEV_S3_ACCESS_KEY_ID: string
      DEV_S3_SECRET: string
      DEV_S3_ENDPOINT: string
      DEV_S3_PUBLIC_URL: string
      DEV_S3_REGION: string
      PROD_S3_BUCKET: string
      PROD_S3_ACCESS_KEY_ID: string
      PROD_S3_SECRET: string
      PROD_S3_ENDPOINT: string
      PROD_S3_PUBLIC_URL: string
      PROD_S3_REGION: string
      // Cloudfare Turnstile
      TURNSTILE_SITE_KEY: string
      TURNSTILE_SECRET_KEY: string
      // Nodemailer
      NODEMAILER_USER: string
      NODEMAILER_PASS: string
      NODEMAILER_NAME: string
      NODEMAILER_SUPPORT_EMAIL: string
      // Resend
      RESEND_API_KEY: string
      RESEND_DEFAULT_USER: string
      RESEND_DEFAULT_NAME: string
      // Sentry
      SENTRY_AUTH_TOKEN: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

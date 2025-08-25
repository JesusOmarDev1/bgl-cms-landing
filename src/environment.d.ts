declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      S3_BUCKET: string
      S3_ACCESS_KEY_ID: string
      S3_SECRET: string
      S3_ENDPOINT: string
      S3_REGION: string
      GMAIL_USER: string
      GMAIL_PASS: string
      GMAIL_NAME: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}

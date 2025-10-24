import { Media } from '@/collections/Media'
import { s3Storage } from '@payloadcms/storage-s3'

/**
 * Get Cloudflare R2 storage adapter configuration
 * @returns S3 storage adapter for Cloudflare R2
 */
export function getCloudfareAdapter() {
  return s3Storage({
    collections: {
      [Media.slug]: true,
    },
    bucket: process.env.S3_BUCKET || '',
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET || '',
      },
      region: 'auto',
      endpoint: process.env.S3_ENDPOINT || '',
    },
  })
}

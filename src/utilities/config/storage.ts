import { Media } from '@/collections/Media'
import { s3Storage } from '@payloadcms/storage-s3'

/**
 * Get Cloudflare R2 storage adapter configuration
 * @returns S3 storage adapter for Cloudflare R2
 */
export function getCloudfareAdapter() {
  return s3Storage({
    collections: {
      [Media.slug]: {
        prefix: 'media',

        signedDownloads: {
          shouldUseSignedURL: ({ filename }: { filename: string }) => {
            const extensions = ['.mp4', '.webm', '.m3u8', '.pdf']
            return extensions.some((ext) => filename.toLowerCase().endsWith(ext))
          },
          expiresIn: 3600, // 1 hour
        },
      },
    },

    // Bucket privado por defecto
    acl: 'private',

    // Deshabilitar almacenamiento local
    disableLocalStorage: true,

    // Configuración del bucket
    bucket: process.env.S3_BUCKET,

    // Configuración de AWS SDK para Cloudflare R2
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET,
      },
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      // Configuraciones específicas para R2
      forcePathStyle: true,
    },
  })
}

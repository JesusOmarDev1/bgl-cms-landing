import { Media } from '@/collections/Media'
import { s3Storage } from '@payloadcms/storage-s3'
import { isProd } from '@/utilities/payload/isProd'

/**
 * Get Cloudflare R2 storage adapter configuration
 * @returns S3 storage adapter for Cloudflare R2
 */
export function getBucketAdapter() {
  if (!isProd) {
    if (
      !process.env.DEV_S3_BUCKET ||
      !process.env.DEV_S3_ACCESS_KEY_ID ||
      !process.env.DEV_S3_SECRET ||
      !process.env.DEV_S3_REGION ||
      !process.env.DEV_S3_ENDPOINT
    ) {
      throw new Error('Las claves del bucket de Cloudfare para desarrollo no estan definidas')
    }

    return s3Storage({
      collections: {
        [Media.slug]: {
          prefix: 'media',

          signedDownloads: {
            shouldUseSignedURL: ({ filename }: { filename: string }) => {
              const extensions = ['.mp4', '.webm', '.m3u8', '.pdf', '.xlsx', '.csv', '.docx']
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
      bucket: process.env.DEV_S3_BUCKET,

      // Configuración de AWS SDK para Cloudflare R2
      config: {
        credentials: {
          accessKeyId: process.env.DEV_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.DEV_S3_SECRET,
        },
        region: process.env.DEV_S3_REGION,
        endpoint: process.env.DEV_S3_ENDPOINT,
        // Configuraciones específicas para R2
        forcePathStyle: true,
      },
    })
  } else {
    if (
      !process.env.PROD_S3_BUCKET ||
      !process.env.PROD_S3_ACCESS_KEY_ID ||
      !process.env.PROD_S3_SECRET ||
      !process.env.PROD_S3_REGION ||
      !process.env.PROD_S3_ENDPOINT
    ) {
      throw new Error('Las claves del bucket de Cloudfare para produccion no estan definidas')
    }

    return s3Storage({
      collections: {
        [Media.slug]: {
          prefix: 'media',

          signedDownloads: {
            shouldUseSignedURL: ({ filename }: { filename: string }) => {
              const extensions = ['.mp4', '.webm', '.m3u8', '.pdf', '.xlsx', '.csv', '.docx']
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
      bucket: process.env.PROD_S3_BUCKET,

      // Configuración de AWS SDK para Cloudflare R2
      config: {
        credentials: {
          accessKeyId: process.env.PROD_S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.DEV_S3_SECRET,
        },
        region: process.env.PROD_S3_REGION,
        endpoint: process.env.PROD_S3_ENDPOINT,
        // Configuraciones específicas para R2
        forcePathStyle: true,
      },
    })
  }
}

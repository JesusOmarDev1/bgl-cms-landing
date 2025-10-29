import { getClientSideURL } from '../url/utils'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url - The original URL from the resource
 * @param cacheTag - Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Si la URL ya tiene protocolo (http/https), es una URL completa
  // Esto incluye URLs firmadas generadas por el S3 storage adapter
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // Para URLs relativas, usar la URL base del cliente
  // Esto es un fallback para casos donde no se use S3 storage
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}

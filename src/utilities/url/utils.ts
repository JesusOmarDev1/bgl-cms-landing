/**
 * URL utility functions
 */
import canUseDOM from '../browser'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/**
 * Generate absolute URL for the given path
 * @param path - The path to make absolute
 * @returns The absolute URL
 */
export function absoluteUrl(path: string): string {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:3000${path}`
    : `${NEXT_PUBLIC_SERVER_URL}${path}`
}

/**
 * Get the server-side URL
 * @returns The server URL
 */
export function getServerSideURL(): string {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

/**
 * Get the client-side URL
 * @returns The client URL
 */
export function getClientSideURL(): string {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}

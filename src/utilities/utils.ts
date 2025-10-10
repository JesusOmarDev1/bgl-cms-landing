export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GroupBy<T, K extends keyof T> = Record<string, T[]>

export function groupBy<T, K extends keyof T>(array: T[], key: K): GroupBy<T, K> {
  return array.reduce(
    (acc, item) => {
      const keyValue = String(item[key])
      if (!acc[keyValue]) {
        acc[keyValue] = []
      }
      acc[keyValue].push(item)
      return acc
    },
    {} as GroupBy<T, K>,
  )
}

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

export function absoluteUrl(path: string) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:3000${path}`
    : `https://${NEXT_PUBLIC_SERVER_URL}${path}`
}

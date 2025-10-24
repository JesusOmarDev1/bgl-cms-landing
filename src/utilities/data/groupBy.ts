/**
 * Groups an array of objects by a specified key
 */

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

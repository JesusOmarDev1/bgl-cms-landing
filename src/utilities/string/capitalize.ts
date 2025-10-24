/**
 * Converts a string to uppercase format
 * @param string - The string to convert
 * @returns The upper-case formatted string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

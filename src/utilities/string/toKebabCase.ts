/**
 * Converts a string to kebab-case format
 * @param string - The string to convert
 * @returns The kebab-case formatted string
 */
export const toKebabCase = (string: string): string =>
  string
    ?.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

/**
 * Format a string to be used as a slug
 * @param val - The string to format
 * @returns Formatted slug string
 */
export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export default formatSlug

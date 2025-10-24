import { readingTime as calculateReadingTime } from 'reading-time-estimator'

/**
 * Calculate reading time for a given text
 * @param text - The text to analyze
 * @returns Reading time in minutes
 */
export function readingTime(text: string): number {
  const readingTimeResult = calculateReadingTime(text, 300, 'es')
  return readingTimeResult.minutes
}

export default readingTime

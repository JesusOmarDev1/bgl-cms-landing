import { readingTime } from 'reading-time-estimator'

export default function getReadingTime(text: string) {
  const readingTimeResult = readingTime(text, 300, 'es')
  return readingTimeResult.minutes
}

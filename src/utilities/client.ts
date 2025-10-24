// Client-side only utilities
// This file should only export utilities that can be used in client components

// String utilities
export {
  capitalize,
  toKebabCase,
  replaceDoubleCurlys,
  formatSlug as formatSlugString,
} from './string'

// Array and object utilities
export { groupBy, deepMerge } from './data'

// Date and time utilities
export { formatDateTime, readingTime } from './date'

// URL and path utilities (client-safe only)
export { absoluteUrl, getClientSideURL } from './url'

// UI and styling utilities
export { cn, useClickableCard } from './ui'

// React hooks
export {
  useDebounce,
  useDebounceWindowed,
  useWindowSize,
  useDebouncedWindowSize,
  useDelayedMount,
  useIsMobile,
  useNetworkStatus,
  useCountdown,
  CountdownDisplay,
  useCopyToClipboard,
  useShare,
} from './hooks'

// Browser utilities
export { default as canUseDOM } from './browser'

// Content utilities (client-safe only)
export { serializeLexical, formatAuthors } from './content'

// Media utilities
export { getMediaUrl, placeholder } from './media'

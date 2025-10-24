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

// URL and path utilities
export { absoluteUrl, getServerSideURL, getClientSideURL, generatePreviewPath } from './url'

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

// Payload CMS utilities
export {
  getCachedDocument,
  getDocument,
  getGlobals,
  getCachedGlobal,
  getMeUser,
  getRedirects,
  getCachedRedirects,
  formatSlug as formatSlugHook,
  populatePublishedAt,
  revalidateRedirects,
} from './payload'

// Content utilities
export { serializeLexical, formatAuthors } from './content'

// Media utilities
export { getMediaUrl, placeholder } from './media'

// Metadata utilities
export { generateMeta, generalMetadata, adminMetadata, mergeOpenGraph } from './meta'

// Configuration utilities
export { getEmailAdapter, getCloudfareAdapter, app } from './config'

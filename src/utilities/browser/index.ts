/**
 * Browser environment detection utility
 * Checks if DOM is available (client-side)
 */
export default !!(typeof window !== 'undefined' && window.document && window.document.createElement)

/**
 * Checks if the app is running in development mode
 * @returns {boolean} True if the app is running in production mode, false otherwise
 */
const isProd = process.env.NODE_ENV === 'production'

export { isProd }

import { useState, useCallback, useEffect } from 'react'
import Cookies from 'js-cookie'

export interface CookieOptions {
  expires?: number | Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export interface UseCookiesReturn {
  // Basic cookie operations
  getCookie: (name: string) => string | undefined
  setCookie: (name: string, value: string, options?: CookieOptions) => void
  removeCookie: (name: string, options?: CookieOptions) => void
  getAllCookies: () => Record<string, string>

  // Announcement-specific operations
  isAnnouncementDismissed: (announcementId: string) => boolean
  dismissAnnouncement: (announcementId: string, expirationDays?: number) => void
  undismissAnnouncement: (announcementId: string) => void

  // User preferences operations
  setUserPreference: (key: string, value: string, days?: number) => void
  getUserPreference: (key: string) => string | undefined

  // Consent management
  hasConsentForType: (type: 'analytics' | 'marketing' | 'preferences') => boolean
}

/**
 * Unified hook for managing browser cookies using js-cookie
 * Includes announcement management and user preferences
 * @returns Object with comprehensive cookie management functions
 */
export const useCookies = (): UseCookiesReturn => {
  const [, forceUpdate] = useState({})

  // Force re-render when cookies change
  const triggerUpdate = useCallback(() => {
    forceUpdate({})
  }, [])

  // Get a specific cookie
  const getCookie = useCallback((name: string): string | undefined => {
    return Cookies.get(name)
  }, [])

  // Set a cookie
  const setCookie = useCallback(
    (name: string, value: string, options: CookieOptions = {}) => {
      const cookieOptions: Cookies.CookieAttributes = {
        path: options.path || '/',
        domain: options.domain,
        secure: options.secure,
        sameSite: options.sameSite,
      }

      // Handle expires
      if (options.expires) {
        if (typeof options.expires === 'number') {
          cookieOptions.expires = options.expires
        } else {
          cookieOptions.expires = options.expires
        }
      }

      Cookies.set(name, value, cookieOptions)
      triggerUpdate()
    },
    [triggerUpdate],
  )

  // Remove a cookie
  const removeCookie = useCallback(
    (name: string, options: CookieOptions = {}) => {
      const cookieOptions: Cookies.CookieAttributes = {
        path: options.path || '/',
        domain: options.domain,
      }

      Cookies.remove(name, cookieOptions)
      triggerUpdate()
    },
    [triggerUpdate],
  )

  // Get all cookies
  const getAllCookies = useCallback((): Record<string, string> => {
    return Cookies.get()
  }, [])

  // Check if user has consent for specific cookie types
  const hasConsentForType = useCallback(
    (type: 'analytics' | 'marketing' | 'preferences'): boolean => {
      const consentSettings = getCookie('cookie-consent-settings')
      if (!consentSettings) return false

      try {
        const settings = JSON.parse(consentSettings)
        return settings[type] === true
      } catch {
        return false
      }
    },
    [getCookie],
  )

  // Announcement-specific functions
  const isAnnouncementDismissed = useCallback(
    (announcementId: string): boolean => {
      const dismissed = getCookie(`announcement_dismissed_${announcementId}`)
      return dismissed === 'true'
    },
    [getCookie],
  )

  const dismissAnnouncement = useCallback(
    (announcementId: string, expirationDays: number = 30) => {
      setCookie(`announcement_dismissed_${announcementId}`, 'true', {
        expires: expirationDays,
        path: '/',
      })
    },
    [setCookie],
  )

  const undismissAnnouncement = useCallback(
    (announcementId: string) => {
      removeCookie(`announcement_dismissed_${announcementId}`)
    },
    [removeCookie],
  )

  // User preferences functions
  const setUserPreference = useCallback(
    (key: string, value: string, days: number = 365) => {
      // Only set preferences if user has consented
      if (hasConsentForType('preferences')) {
        setCookie(`pref_${key}`, value, {
          expires: days,
          path: '/',
        })
      }
    },
    [setCookie, hasConsentForType],
  )

  const getUserPreference = useCallback(
    (key: string): string | undefined => {
      return getCookie(`pref_${key}`)
    },
    [getCookie],
  )

  // Listen for cookie changes (optional, for cross-tab synchronization)
  useEffect(() => {
    const handleFocus = () => {
      triggerUpdate()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [triggerUpdate])

  return {
    // Basic operations
    getCookie,
    setCookie,
    removeCookie,
    getAllCookies,

    // Announcement operations
    isAnnouncementDismissed,
    dismissAnnouncement,
    undismissAnnouncement,

    // Preferences operations
    setUserPreference,
    getUserPreference,

    // Consent operations
    hasConsentForType,
  }
}

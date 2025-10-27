'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useCookies } from '@/utilities/hooks/useCookies'
import type { CookiesContextType, CookieConsentSettings } from './types'
import { CONSENT_COOKIE_NAME, CONSENT_SETTINGS_COOKIE_NAME, defaultConsentSettings } from './types'

const CookiesContext = createContext<CookiesContextType | undefined>(undefined)

export function CookiesProvider({ children }: { children: React.ReactNode }) {
  const { getCookie, setCookie, removeCookie } = useCookies()
  const [hasConsent, setHasConsent] = useState(false)
  const [consentSettings, setConsentSettings] =
    useState<CookieConsentSettings>(defaultConsentSettings)
  const [showConsentBanner, setShowConsentBanner] = useState(false)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Initialize consent state from cookies
  useEffect(() => {
    setIsClient(true)

    const consent = getCookie(CONSENT_COOKIE_NAME)
    const settings = getCookie(CONSENT_SETTINGS_COOKIE_NAME)

    if (consent === 'true') {
      setHasConsent(true)
      setShowConsentBanner(false)

      if (settings) {
        try {
          const parsedSettings = JSON.parse(settings)
          setConsentSettings({ ...defaultConsentSettings, ...parsedSettings })
        } catch (error) {
          console.error('Error parsing consent settings:', error)
          setConsentSettings(defaultConsentSettings)
        }
      }
    } else {
      setShowConsentBanner(true)
    }
  }, [getCookie])

  // Internal function to update consent without toast
  const updateConsentInternal = useCallback(
    (newSettings: Partial<CookieConsentSettings>) => {
      const updatedSettings = { ...consentSettings, ...newSettings, necessary: true }
      setConsentSettings(updatedSettings)

      // Save to cookies
      setCookie(CONSENT_COOKIE_NAME, 'true', { expires: 365 }) // 1 year
      setCookie(CONSENT_SETTINGS_COOKIE_NAME, JSON.stringify(updatedSettings), { expires: 365 })

      setHasConsent(true)
      setShowConsentBanner(false)
      setShowConsentModal(false)
    },
    [consentSettings, setCookie],
  )

  // Update consent settings
  const updateConsent = useCallback(
    (newSettings: Partial<CookieConsentSettings>) => {
      updateConsentInternal(newSettings)
    },
    [updateConsentInternal],
  )

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const allAccepted: CookieConsentSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }

    updateConsentInternal(allAccepted)
  }, [updateConsentInternal])

  // Reject all non-necessary cookies
  const rejectAll = useCallback(() => {
    updateConsentInternal(defaultConsentSettings)
  }, [updateConsentInternal])

  // Hide consent banner
  const hideConsentBanner = useCallback(() => {
    setShowConsentBanner(false)
  }, [])

  // Enhanced cookie functions that respect consent
  const enhancedSetCookie = useCallback(
    (name: string, value: string, days: number = 30) => {
      // Always allow necessary cookies
      if (hasConsent || name.startsWith('necessary_')) {
        setCookie(name, value, { expires: days, path: '/' })
      }
    },
    [hasConsent, setCookie],
  )

  const enhancedRemoveCookie = useCallback(
    (name: string) => {
      removeCookie(name, { path: '/' })
    },
    [removeCookie],
  )

  // Wrapper to convert undefined to null for consistency
  const wrappedGetCookie = useCallback(
    (name: string): string | undefined => {
      return getCookie(name)
    },
    [getCookie],
  )

  const contextValue: CookiesContextType = {
    hasConsent,
    consentSettings,
    updateConsent,
    acceptAll,
    rejectAll,
    getCookie: wrappedGetCookie,
    setCookie: enhancedSetCookie,
    removeCookie: enhancedRemoveCookie,
    showConsentBanner: showConsentBanner && isClient,
    hideConsentBanner,
    showConsentModal,
    setShowConsentModal,
  }

  return <CookiesContext.Provider value={contextValue}>{children}</CookiesContext.Provider>
}

export function useCookiesContext(): CookiesContextType {
  const context = useContext(CookiesContext)
  if (context === undefined) {
    throw new Error('useCookiesContext must be used within a CookiesProvider')
  }
  return context
}

export default CookiesProvider

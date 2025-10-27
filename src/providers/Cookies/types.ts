export interface CookieConsentSettings {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

export interface CookiesContextType {
  // Consent management
  hasConsent: boolean
  consentSettings: CookieConsentSettings
  updateConsent: (settings: Partial<CookieConsentSettings>) => void
  acceptAll: () => void
  rejectAll: () => void

  // Cookie management
  getCookie: (name: string) => string | undefined
  setCookie: (name: string, value: string, days?: number) => void
  removeCookie: (name: string) => void

  // UI state
  showConsentBanner: boolean
  hideConsentBanner: () => void
  showConsentModal: boolean
  setShowConsentModal: (show: boolean) => void
}

export const defaultConsentSettings: CookieConsentSettings = {
  necessary: true, // Always true, can't be disabled
  analytics: true,
  marketing: true,
  preferences: true,
}

export const CONSENT_COOKIE_NAME = 'cookie-consent'
export const CONSENT_SETTINGS_COOKIE_NAME = 'cookie-consent-settings'

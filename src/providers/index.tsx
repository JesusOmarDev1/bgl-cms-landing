import React from 'react'
import { Toaster } from 'sonner'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import NetworkStatusProvider from './NetworkStatus'
import CookiesProvider from './Cookies'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <CookiesProvider>
        <NetworkStatusProvider>
          <HeaderThemeProvider>
            {children}
            <Toaster position="top-right" richColors closeButton theme="system" />
          </HeaderThemeProvider>
        </NetworkStatusProvider>
      </CookiesProvider>
    </ThemeProvider>
  )
}

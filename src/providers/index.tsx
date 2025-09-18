import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import NetworkStatusProvider from './NetworkStatus'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <NetworkStatusProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </NetworkStatusProvider>
    </ThemeProvider>
  )
}

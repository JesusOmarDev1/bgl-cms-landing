/**
 * Application configuration constants
 */

export const app = {
  VERSION: 'v0.0.1',
  NAME: 'BGL BASCULAS CMS',
  SHORT_NAME: 'BGL CMS',
  DESCRIPTION:
    'Sistema de gestión de contenidos (CMS) corporativo desarrollado específicamente para BGL BASCULAS INDUSTRIALES, empresa líder en soluciones de pesaje industrial y básculas de alta precisión.',
} as const

// Legacy exports for backward compatibility
export const VERSION = app.VERSION
export const APP_NAME = app.NAME
export const APP_SHORT_NAME = app.SHORT_NAME
export const APP_DESCRIPTION = app.DESCRIPTION

import { useEffect, useCallback } from 'react'

interface UseKeyboardShortcutsOptions {
  onToggleSearch?: () => void
  onEscape?: () => void
  enabled?: boolean
}

/**
 * Hook para manejar atajos de teclado del buscador global
 */
export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const { onToggleSearch, onEscape, enabled = true } = options

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Cmd/Ctrl + K para abrir/cerrar búsqueda
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onToggleSearch?.()
        return
      }

      // Escape para cerrar
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape?.()
        return
      }
    },
    [enabled, onToggleSearch, onEscape],
  )

  useEffect(() => {
    if (!enabled) return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, enabled])

  return {
    // Función para registrar manualmente un atajo
    registerShortcut: useCallback(
      (
        key: string,
        callback: () => void,
        modifiers?: {
          ctrl?: boolean
          meta?: boolean
          shift?: boolean
          alt?: boolean
        },
      ) => {
        const handler = (event: KeyboardEvent) => {
          if (event.key !== key) return

          const { ctrl = false, meta = false, shift = false, alt = false } = modifiers || {}

          if (
            event.ctrlKey === ctrl &&
            event.metaKey === meta &&
            event.shiftKey === shift &&
            event.altKey === alt
          ) {
            event.preventDefault()
            callback()
          }
        }

        document.addEventListener('keydown', handler)

        return () => {
          document.removeEventListener('keydown', handler)
        }
      },
      [],
    ),
  }
}

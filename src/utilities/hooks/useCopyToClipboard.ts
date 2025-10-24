'use client'

import { useState, useCallback } from 'react'

interface UseCopyToClipboardOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

interface UseCopyToClipboardReturn {
  copyToClipboard: (text: string) => Promise<void>
  isCopied: boolean
  error: string | null
  isSupported: boolean
}

function useCopyToClipboard(options: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn {
  const { onSuccess, onError, timeout = 2000 } = options

  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isSupported =
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    navigator !== null &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'

  const copyToClipboard = useCallback(
    async (text: string): Promise<void> => {
      if (typeof window === 'undefined') {
        throw new Error('useCopyToClipboard solo se puede utilizar en el entorno del navegador')
      }

      setError(null)

      try {
        if (isSupported) {
          // Use modern Clipboard API
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea')
          textArea.value = text
          textArea.style.position = 'fixed'
          textArea.style.left = '-999999px'
          textArea.style.top = '-999999px'
          document.body.appendChild(textArea)
          textArea.focus()
          textArea.select()

          try {
            const successful = document.execCommand('copy')
            if (!successful) {
              throw new Error('No se pudo copiar el texto usando el método de respaldo')
            }
          } finally {
            document.body.removeChild(textArea)
          }
        }

        setIsCopied(true)
        onSuccess?.()

        // Reset copied state after timeout
        setTimeout(() => setIsCopied(false), timeout)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'No se pudo copiar al portapapeles'
        setError(errorMessage)
        onError?.(err instanceof Error ? err : new Error(errorMessage))
        throw err
      }
    },
    [isSupported, onSuccess, onError, timeout],
  )

  return {
    copyToClipboard,
    isCopied,
    error,
    isSupported,
  }
}

export { useCopyToClipboard }
export default useCopyToClipboard

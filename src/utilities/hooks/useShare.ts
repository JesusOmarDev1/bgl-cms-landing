'use client'

import { useState, useCallback } from 'react'
import { useCopyToClipboard } from './useCopyToClipboard'
import { toast } from 'sonner'

interface ShareData {
  title?: string
  text?: string
  url?: string
  files?: File[]
}

interface UseShareOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  fallbackCopy?: boolean
}

interface UseShareReturn {
  share: (data: ShareData) => Promise<void>
  isSupported: boolean
  isSharing: boolean
  error: string | null
}

export default function useShare(options: UseShareOptions = {}): UseShareReturn {
  const { onSuccess, onError, fallbackCopy = true } = options

  const [isSharing, setIsSharing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { copyToClipboard } = useCopyToClipboard()

  const isSupported =
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    navigator !== null &&
    'share' in navigator &&
    typeof navigator.share === 'function'

  const share = useCallback(
    async (data: ShareData): Promise<void> => {
      if (typeof window === 'undefined') {
        throw new Error('useShare solo se puede usar en entorno de navegador')
      }

      setIsSharing(true)
      setError(null)

      try {
        if (isSupported) {
          // Use native Web Share API
          const shareData: ShareData = {}

          if (data.title) shareData.title = data.title
          if (data.text) shareData.text = data.text
          if (data.url) shareData.url = data.url
          if (data.files && data.files.length > 0) {
            // Check if files sharing is supported
            if (
              typeof navigator !== 'undefined' &&
              navigator !== null &&
              navigator.canShare &&
              navigator.canShare({ files: data.files })
            ) {
              shareData.files = data.files
            }
          }

          if (typeof navigator !== 'undefined' && navigator !== null && navigator.share) {
            await navigator.share(shareData)
          } else {
            toast.warning('La API de Web Share no es compatible')
          }
          onSuccess?.()
        } else if (fallbackCopy) {
          // Fallback to copying to clipboard
          let textToCopy = ''

          if (data.title) textToCopy += data.title + '\n'
          if (data.text) textToCopy += data.text + '\n'
          if (data.url) textToCopy += data.url

          if (textToCopy.trim()) {
            await copyToClipboard(textToCopy.trim())
            onSuccess?.()
          } else {
            toast.warning('No hay contenido para compartir')
          }
        } else {
          toast.error(
            'La API de Web Share no es compatible y la función de respaldo está deshabilitada',
          )
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al compartir'
        setError(errorMessage)
        onError?.(err instanceof Error ? err : new Error(errorMessage))
        throw err
      } finally {
        setIsSharing(false)
      }
    },
    [isSupported, fallbackCopy, onSuccess, onError, copyToClipboard],
  )

  return {
    share,
    isSupported,
    isSharing,
    error,
  }
}

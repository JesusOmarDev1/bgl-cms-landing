'use client'
import React from 'react'
import { Button } from './button'
import { MicIcon, MicOffIcon, AlertCircleIcon } from 'lucide-react'
import { useSpeechRecognition } from '@/utilities/hooks/useSpeechRecognition'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { cn } from '@/utilities/ui/cn'

interface VoiceInputProps {
  onTranscript?: (transcript: string, confidence: number) => void
  onError?: (error: string) => void
  className?: string
  size?: 'sm' | 'lg' | 'default' | 'icon'
  variant?: 'default' | 'outline' | 'ghost'
  lang?: string
  continuous?: boolean
  disabled?: boolean
}

/**
 * Reusable voice input component that can be used anywhere in the app
 * Uses the useSpeechRecognition hook internally
 */
export function VoiceInput({
  onTranscript,
  onError,
  className,
  size = 'default',
  variant = 'ghost',
  lang = 'es-ES',
  continuous = false,
  disabled = false,
}: VoiceInputProps) {
  const {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    errorMessage: _errorMessage,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    lang,
    continuous,
    onResult: (transcriptText, confidenceScore, isFinal) => {
      if (isFinal || !continuous) {
        onTranscript?.(transcriptText, confidenceScore)
      }
    },
    onError: (errorType, message) => {
      onError?.(message || errorType)
    },
  })

  if (!isSupported) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={size}
              disabled
              className={cn('opacity-50 cursor-not-allowed', className)}
            >
              <MicOffIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reconocimiento de voz no soportado</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const buttonIcon = error ? (
    <AlertCircleIcon className="h-4 w-4" />
  ) : isListening ? (
    <MicIcon className="h-4 w-4 animate-pulse" />
  ) : (
    <MicIcon className="h-4 w-4" />
  )

  const buttonClass = cn(
    'transition-colors',
    {
      'text-red-500': isListening,
      'text-red-400': error,
      'hover:text-red-600': isListening,
    },
    className,
  )

  const tooltipText = error
    ? `Error: ${error}`
    : isListening
      ? 'Detener grabación'
      : 'Iniciar grabación de voz'

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={isListening ? stopListening : startListening}
            disabled={disabled}
            className={buttonClass}
          >
            {buttonIcon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
          {transcript && (
            <div className="mt-1 text-xs text-muted-foreground">
              Último: &ldquo;{transcript}&rdquo; ({Math.round(confidence * 100)}%)
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default VoiceInput

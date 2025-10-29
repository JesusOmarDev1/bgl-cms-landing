'use client'

import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
  VideoPlayerPlaybackRateButton,
} from '@/components/ui/video-player'

import { cn } from '@/utilities/ui/cn'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/media/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const [useNativeControls, setUseNativeControls] = React.useState(false) // Probar media-chrome primero
  const [videoError, setVideoError] = React.useState(false)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      const handleSuspend = () => {
        // Video suspended - normal behavior for some browsers
      }

      const handleError = (e: Event) => {
        setVideoError(true)
        setUseNativeControls(true)
      }

      const handleLoadStart = () => {
        // Video loading started
      }

      const handleLoadedData = () => {
        // Video loaded successfully
      }

      // Si el video no se carga en 10 segundos, usar controles nativos
      const fallbackTimer = setTimeout(() => {
        if (video.readyState === 0) {
          setUseNativeControls(true)
        }
      }, 10000)

      video.addEventListener('suspend', handleSuspend)
      video.addEventListener('error', handleError)
      video.addEventListener('loadstart', handleLoadStart)
      video.addEventListener('loadeddata', handleLoadedData)

      return () => {
        clearTimeout(fallbackTimer)
        video.removeEventListener('suspend', handleSuspend)
        video.removeEventListener('error', handleError)
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url } = resource

    const videoUrl = getMediaUrl(url)

    // Si hay error o se debe usar controles nativos, mostrar video nativo
    if (useNativeControls || videoError) {
      return (
        <div className="overflow-hidden rounded-lg border">
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className={cn('w-full h-auto', videoClassName)}
            onClick={onClick}
            onLoadStart={() => {}}
            onCanPlay={() => {}}
            onError={() => {}}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          {videoError && (
            <p className="text-xs text-muted-foreground p-2">
              Usando controles nativos del navegador
            </p>
          )}
        </div>
      )
    }

    // Usar media-chrome por defecto
    return (
      <VideoPlayer className="overflow-hidden rounded-lg border">
        <VideoPlayerContent
          onClick={onClick}
          className={cn(videoClassName)}
          ref={videoRef}
          source={videoUrl}
        />
        <VideoPlayerControlBar>
          <VideoPlayerPlayButton />
          <VideoPlayerSeekBackwardButton />
          <VideoPlayerSeekForwardButton />
          <VideoPlayerTimeRange />
          <VideoPlayerTimeDisplay showDuration />
          <VideoPlayerMuteButton />
          <VideoPlayerVolumeRange />
          <VideoPlayerPlaybackRateButton />
        </VideoPlayerControlBar>
      </VideoPlayer>
    )
  }

  return null
}

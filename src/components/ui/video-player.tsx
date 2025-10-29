'use client'
import 'hls-video-element'

import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
  MediaDurationDisplay,
  MediaFullscreenButton,
  MediaTooltip,
  MediaPreviewThumbnail,
  MediaLoadingIndicator,
  MediaCaptionsButton,
  MediaPipButton,
  MediaPlaybackRateButton,
} from 'media-chrome/react'

import type { ComponentProps, CSSProperties } from 'react'
import { cn } from '@/utilities/ui/cn'
import { getClientSideURL } from '@/utilities/url/utils'

export type VideoPlayerProps = ComponentProps<typeof MediaController>

const variables = {
  '--media-primary-color': 'var(--primary)',
  '--media-secondary-color': 'var(--background)',
  '--media-text-color': 'var(--foreground)',
  '--media-background-color': 'var(--background)',
  '--media-control-hover-background': 'var(--accent)',
  '--media-font-family': 'var(--font-sans)',
  '--media-live-button-icon-color': 'var(--muted-foreground)',
  '--media-live-button-indicator-color': 'var(--destructive)',
  '--media-range-track-background': 'var(--border)',
} as CSSProperties

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...variables,
      ...style,
    }}
    suppressHydrationWarning
    {...props}
  />
)

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
)

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>

export const VideoPlayerTimeRange = ({ className, ...props }: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerTimeDisplayProps = ComponentProps<typeof MediaTimeDisplay>

export const VideoPlayerTimeDisplay = ({ className, ...props }: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerVolumeRangeProps = ComponentProps<typeof MediaVolumeRange>

export const VideoPlayerVolumeRange = ({ className, ...props }: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>

export const VideoPlayerPlayButton = ({ className, ...props }: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<typeof MediaSeekBackwardButton>

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerSeekForwardButtonProps = ComponentProps<typeof MediaSeekForwardButton>

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>

export const VideoPlayerMuteButton = ({ className, ...props }: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerFullscreenButtonProps = ComponentProps<typeof MediaFullscreenButton>

export const VideoPlayerFullscreenButton = ({
  className,
  ...props
}: VideoPlayerFullscreenButtonProps) => (
  <MediaFullscreenButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerDurationDisplayProps = ComponentProps<typeof MediaDurationDisplay>

export const VideoPlayerDurationDisplay = ({
  className,
  ...props
}: VideoPlayerDurationDisplayProps) => (
  <MediaDurationDisplay className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerTooltipProps = ComponentProps<typeof MediaTooltip>

export const VideoPlayerTooltip = ({ className, ...props }: VideoPlayerTooltipProps) => (
  <MediaTooltip className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerPreviewThumbnailProps = ComponentProps<typeof MediaPreviewThumbnail>

export const VideoPlayerPreviewThumbnail = ({
  className,
  ...props
}: VideoPlayerPreviewThumbnailProps) => (
  <MediaPreviewThumbnail className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerLoadingIndicatorProps = ComponentProps<typeof MediaLoadingIndicator>

export const VideoPlayerLoadingIndicator = ({
  className,
  ...props
}: VideoPlayerLoadingIndicatorProps) => (
  <MediaLoadingIndicator className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerCaptionsButtonProps = ComponentProps<typeof MediaCaptionsButton>

export const VideoPlayerCaptionsButton = ({
  className,
  ...props
}: VideoPlayerCaptionsButtonProps) => (
  <MediaCaptionsButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerPipButtonProps = ComponentProps<typeof MediaPipButton>

export const VideoPlayerPipButton = ({ className, ...props }: VideoPlayerPipButtonProps) => (
  <MediaPipButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerPlaybackRateButtonProps = ComponentProps<typeof MediaPlaybackRateButton>

export const VideoPlayerPlaybackRateButton = ({
  className,
  ...props
}: VideoPlayerPlaybackRateButtonProps) => (
  <MediaPlaybackRateButton className={cn('p-2.5', className)} {...props} />
)

export type VideoPlayerContentProps = ComponentProps<'video'> & {
  source: string | undefined | null
  sources?: Array<{ src: string; type: string; label?: string; res?: string }>
  onClick?: () => void
  onDoubleClick?: () => void
}

export const VideoPlayerContent = ({
  className,
  source,
  sources,
  onClick,
  onDoubleClick,
  ...props
}: VideoPlayerContentProps) => {
  // Determinar si usar crossOrigin basado en la URL
  const clientUrl = getClientSideURL()
  const isLocalUrl = source?.startsWith(clientUrl) || source?.startsWith('/api/')
  const crossOriginValue = isLocalUrl ? undefined : 'anonymous'

  return (
    <video
      slot="media"
      playsInline
      preload="metadata"
      crossOrigin={crossOriginValue}
      className={cn(
        'mt-0 mb-0 [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden',
        className,
      )}
      suppressHydrationWarning
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{
        ...props.style,
        // Ocultar completamente los controles nativos
        WebkitAppearance: 'none',
        appearance: 'none',
      }}
      {...props}
    >
      {/* Si hay múltiples fuentes, usarlas */}
      {sources && sources.length > 0 ? (
        sources.map((src, index) => (
          <source key={index} src={src.src} type={src.type} data-res={src.res} />
        ))
      ) : (
        <source src={source || ''} type="video/mp4" />
      )}
      Tu navegador no soporta el video.
    </video>
  )
}

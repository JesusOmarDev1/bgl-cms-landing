import React from 'react'
import { Download, ExternalLink } from 'lucide-react'
import { cn } from '@/utilities/ui/cn'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PdfIcon } from '@/assets/files/pdf'

import type { Media, DownloadLinkBlock as DownloadLinkBlockProps } from '@/payload-types'

type Props = {
  className?: string
} & DownloadLinkBlockProps

const formatFileSize = (bytes: number | null | undefined): string => {
  if (!bytes || bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const DownloadLinkBlock: React.FC<Props> = ({
  className,
  file,
  title,
  description,
  variant = 'default',
  showFileSize = true,
  openInNewTab = true,
}) => {
  if (!file || !title) return null

  // Handle different file types (Media object, ID number, or string URL)
  let fileUrl = ''
  let fileName = ''
  let fileSize = 0

  if (typeof file === 'object' && file !== null) {
    // file is a Media object
    const mediaFile = file as Media
    fileUrl = mediaFile.url || ''
    fileName = mediaFile.filename || ''
    fileSize = mediaFile.filesize || 0
  } else if (typeof file === 'string') {
    // file is a URL string
    fileUrl = file
    fileName = file.split('/').pop() || ''
  }
  // If file is a number (ID), we can't resolve it here without additional data

  if (!fileUrl) return null

  const linkProps = {
    href: fileUrl,
    target: openInNewTab ? '_blank' : '_self',
    rel: openInNewTab ? 'noopener noreferrer' : undefined,
    download: fileName,
  }

  // Default inline variant
  if (variant === 'default') {
    return (
      <div className={cn('inline-flex items-center gap-2 my-2', className)}>
        <a
          {...linkProps}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
        >
          <PdfIcon className="h-4 w-4 flex-shrink-0" />
          <span className="underline underline-offset-2 group-hover:no-underline">{title}</span>
          <Download className="h-3 w-3 flex-shrink-0 opacity-60" />
          {openInNewTab && <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-60" />}
        </a>
        {showFileSize && fileSize > 0 && (
          <span className="text-xs text-muted-foreground">({formatFileSize(fileSize)})</span>
        )}
        {description && (
          <div className="block w-full text-sm text-muted-foreground mt-1">{description}</div>
        )}
      </div>
    )
  }

  // Card variant
  if (variant === 'card') {
    return (
      <Card className={cn('my-4 max-w-sm', className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 p-2 bg-red-50 rounded-lg">
              <PdfIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <a {...linkProps} className="block group">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {title}
                </h4>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">PDF</span>
                  {showFileSize && fileSize > 0 && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(fileSize)}
                      </span>
                    </>
                  )}
                  <Download className="h-3 w-3 text-muted-foreground ml-auto" />
                </div>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Button variant
  if (variant === 'button') {
    return (
      <div className={cn('my-4', className)}>
        <Button asChild variant="outline" className="gap-2">
          <a {...linkProps}>
            <PdfIcon className="h-4 w-4" />
            {title}
            <Download className="h-4 w-4" />
          </a>
        </Button>
        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
        {showFileSize && fileSize > 0 && (
          <p className="text-xs text-muted-foreground mt-1">Tamaño: {formatFileSize(fileSize)}</p>
        )}
      </div>
    )
  }

  return null
}

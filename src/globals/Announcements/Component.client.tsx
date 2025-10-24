'use client'

import React, { useState, useEffect } from 'react'
import { X, AlertCircle, CheckCircle, ExternalLink, Megaphone, Bell } from 'lucide-react'
import { cn } from '@/utilities/client'

import type { Announcement as AnnouncementType } from '@/payload-types'
import { motion } from 'motion/react'

type AnnouncementItem = NonNullable<AnnouncementType['announcements']>[0]

interface AnnouncementsClientProps {
  data: AnnouncementType
}

const typeIcons = {
  info: Bell,
  warning: AlertCircle,
  success: CheckCircle,
  announcement: Megaphone,
}

const typeStyles = {
  info: {
    icon: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    icon: 'text-amber-600 dark:text-amber-400',
  },
  success: {
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  announcement: {
    icon: 'text-purple-600 dark:text-purple-400',
  },
}

export const AnnouncementsClient: React.FC<AnnouncementsClientProps> = ({ data }) => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load dismissed announcements from localStorage
    const stored = localStorage.getItem('dismissed-announcements')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setDismissedIds(new Set(parsed))
      } catch (error) {
        console.error('Error parsing dismissed announcements:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save dismissed announcements to localStorage
    if (isClient && dismissedIds.size > 0) {
      localStorage.setItem('dismissed-announcements', JSON.stringify([...dismissedIds]))
    }
  }, [dismissedIds, isClient])

  // Get announcements from data
  const announcements = data?.announcements || []

  // Filter active and non-dismissed announcements
  const visibleAnnouncements = announcements.filter(
    (announcement) =>
      announcement.active !== false && !dismissedIds.has(announcement.id || announcement.title),
  )

  const handleDismiss = (announcement: AnnouncementItem) => {
    const id = announcement.id || announcement.title
    setDismissedIds((prev) => new Set([...prev, id]))
  }

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient || visibleAnnouncements.length === 0) {
    return null
  }

  // Show only the first announcement as a banner
  const announcement = visibleAnnouncements[0]
  const type = announcement.type || 'announcement'
  const Icon = typeIcons[type as keyof typeof typeIcons]
  const styles = typeStyles[type as keyof typeof typeStyles]

  return (
    <motion.div
      className={cn(
        'w-full border-b fixed mt-[89px] h-fit bg-background backdrop-blur-lg border-border',
      )}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Content */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-1.5 rounded-md bg-muted">
              <Icon className={cn('size-4', styles.icon)} />
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm text-foreground">{announcement.title}</h3>
                {announcement.tag && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-muted text-muted-foreground border-border">
                    {announcement.tag}
                  </span>
                )}
              </div>

              {announcement.message && (
                <p className="text-sm truncate text-muted-foreground">{announcement.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {announcement.link && (
              <a
                href={announcement.link}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors bg-primary hover:bg-primary/90 text-primary-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{announcement.linkText || 'Ver más'}</span>
                <ExternalLink className="size-3" />
              </a>
            )}

            {announcement.dismissible !== false && (
              <button
                onClick={() => handleDismiss(announcement)}
                className={cn(
                  'p-1.5 rounded-md transition-colors hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'focus:ring-black/20 dark:focus:ring-white/20',
                )}
                aria-label="Cerrar anuncio"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { X, AlertCircle, CheckCircle, ExternalLink, Megaphone, Bell } from 'lucide-react'
import { cn } from '@/utilities/ui'

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
    bg: 'bg-blue-50/70 dark:bg-blue-950/70 backdrop-blur-lg',
    border: 'border-blue-200/50 dark:border-blue-800/50',
    text: 'text-blue-900 dark:text-blue-100',
    accent: 'text-blue-600 dark:text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white',
    tag: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  },
  warning: {
    bg: 'bg-amber-50/70 dark:bg-amber-950/70 backdrop-blur-lg',
    border: 'border-amber-200/50 dark:border-amber-800/50',
    text: 'text-amber-900 dark:text-amber-100',
    accent: 'text-amber-600 dark:text-amber-400',
    button: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white',
    tag: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  },
  success: {
    bg: 'bg-emerald-50/70 dark:bg-emerald-950/70 backdrop-blur-lg',
    border: 'border-emerald-200/50 dark:border-emerald-800/50',
    text: 'text-emerald-900 dark:text-emerald-100',
    accent: 'text-emerald-600 dark:text-emerald-400',
    button:
      'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white',
    tag: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
  },
  announcement: {
    bg: 'bg-purple-50/70 dark:bg-purple-950/70 backdrop-blur-lg',
    border: 'border-purple-200/50 dark:border-purple-800/50',
    text: 'text-purple-900 dark:text-purple-100',
    accent: 'text-purple-600 dark:text-purple-400',
    button:
      'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white',
    tag: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700',
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
      className={cn('w-full border-b fixed mt-[89px] h-fit', styles.bg, styles.border)}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Content */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn('p-1.5 rounded-md', styles.tag)}>
              <Icon className="size-4" />
            </div>

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={cn('font-medium text-sm', styles.text)}>{announcement.title}</h3>
                {announcement.tag && (
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                      styles.tag,
                    )}
                  >
                    {announcement.tag}
                  </span>
                )}
              </div>

              {announcement.message && (
                <p className={cn('text-sm truncate', styles.text, 'opacity-75')}>
                  {announcement.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {announcement.link && (
              <a
                href={announcement.link}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  styles.button,
                )}
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

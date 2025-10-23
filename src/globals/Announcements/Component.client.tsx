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
    bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    border: 'border-blue-200/50',
    text: 'text-blue-900',
    accent: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    tag: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
    border: 'border-amber-200/50',
    text: 'text-amber-900',
    accent: 'text-amber-600',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
    tag: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  success: {
    bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
    border: 'border-emerald-200/50',
    text: 'text-emerald-900',
    accent: 'text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    tag: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  announcement: {
    bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50',
    border: 'border-purple-200/50',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
    tag: 'bg-purple-100 text-purple-700 border-purple-200',
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
      className={cn('w-full border-b backdrop-blur-sm fixed mt-24', styles.bg, styles.border)}
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
                  'p-1.5 rounded-md transition-colors hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  'focus:ring-black/20',
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

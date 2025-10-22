'use client'

import React, { useState, useEffect } from 'react'
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/announcement'
import { X, Megaphone, AlertCircle, Info, CheckCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/utilities/ui'

import type { Announcement as AnnouncementType } from '@/payload-types'

type AnnouncementItem = NonNullable<AnnouncementType['announcements']>[0]

interface AnnouncementsClientProps {
  data: AnnouncementType
}

const typeIcons = {
  info: Info,
  warning: AlertCircle,
  success: CheckCircle,
  announcement: Megaphone,
}

const typeColors = {
  info: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
  warning: 'text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100',
  success: 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100',
  announcement: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
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

  return (
    <div className="w-full bg-background border-b animate-in slide-in-from-top-2 duration-500">
      <div className="container px-4 md:px-8 py-3">
        <div className="flex flex-col gap-2">
          {visibleAnnouncements.map((announcement: AnnouncementItem, index: number) => {
            const type = announcement.type || 'announcement'
            const Icon = typeIcons[type as keyof typeof typeIcons]
            const id = announcement.id || announcement.title

            return (
              <Announcement
                key={id || index}
                themed
                className={cn(
                  'relative w-full justify-between transition-all duration-200',
                  typeColors[type as keyof typeof typeColors],
                )}
              >
                <AnnouncementTitle className="flex-1 min-w-0">
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 min-w-0">
                    <span className="font-semibold truncate">{announcement.title}</span>
                    {announcement.message && (
                      <span className="text-sm opacity-90 line-clamp-2 sm:line-clamp-1">
                        {announcement.message}
                      </span>
                    )}
                  </div>
                </AnnouncementTitle>

                <div className="flex items-center gap-2 shrink-0">
                  {announcement.tag && (
                    <AnnouncementTag className="hidden sm:block">
                      {announcement.tag}
                    </AnnouncementTag>
                  )}

                  {announcement.link && (
                    <a
                      href={announcement.link}
                      className="flex items-center gap-1 text-sm font-medium underline hover:no-underline transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="hidden sm:inline">{announcement.linkText || 'Ver más'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {announcement.dismissible !== false && (
                    <button
                      onClick={() => handleDismiss(announcement)}
                      className="p-1 rounded-full hover:bg-black/10 transition-colors"
                      aria-label="Cerrar anuncio"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </Announcement>
            )
          })}
        </div>
      </div>
    </div>
  )
}

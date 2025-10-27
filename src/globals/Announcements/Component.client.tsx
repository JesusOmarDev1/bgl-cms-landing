'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Megaphone,
  Bell,
  Sparkles,
  Gift,
} from 'lucide-react'
import { cn } from '@/utilities/ui/cn'

import type { Announcement as AnnouncementType } from '@/payload-types'
import { motion, AnimatePresence } from 'motion/react'

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
    bg: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    accent: 'bg-blue-500',
  },
  warning: {
    icon: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-gradient-to-r from-amber-50 to-orange-100 dark:from-amber-950/30 dark:to-orange-900/30',
    border: 'border-amber-200 dark:border-amber-800',
    accent: 'bg-amber-500',
  },
  success: {
    icon: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    accent: 'bg-emerald-500',
  },
  announcement: {
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-gradient-to-r from-purple-50 via-pink-50 to-purple-100 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-purple-900/30',
    border: 'border-purple-200 dark:border-purple-800',
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
  },
}

export const AnnouncementsClient: React.FC<AnnouncementsClientProps> = ({ data }) => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  // Auto-rotate announcements every 8 seconds if there are multiple
  useEffect(() => {
    if (visibleAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % visibleAnnouncements.length)
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [visibleAnnouncements.length])

  const handleDismiss = (announcement: AnnouncementItem) => {
    const id = announcement.id || announcement.title
    setDismissedIds((prev) => new Set([...prev, id]))
  }

  // Don't render anything during SSR to avoid hydration mismatch
  if (!isClient || visibleAnnouncements.length === 0) {
    return null
  }

  // Show current announcement (with rotation support)
  const announcement = visibleAnnouncements[currentIndex]
  const type = announcement.type || 'announcement'
  const Icon = typeIcons[type as keyof typeof typeIcons]
  const styles = typeStyles[type as keyof typeof typeStyles]

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'w-full fixed mt-[89px] h-fit backdrop-blur-lg z-40 overflow-hidden',
          styles.bg,
          styles.border,
          'border-b shadow-sm',
        )}
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Decorative accent bar */}
        <div className={cn('h-1 w-full', styles.accent)} />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Multiple announcements indicator */}
            {visibleAnnouncements.length > 1 && (
              <div className="absolute left-4 bottom-2 flex gap-1">
                {visibleAnnouncements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'bg-white/90 dark:bg-gray-300/90 scale-125'
                        : 'bg-white/40 dark:bg-gray-500/40 hover:bg-white/60 dark:hover:bg-gray-400/60',
                    )}
                    aria-label={`Ver anuncio ${index + 1}`}
                  />
                ))}
              </div>
            )}
            {/* Content */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Enhanced Icon with animation */}
              <motion.div
                className={cn(
                  'relative p-2.5 rounded-xl shadow-sm animate-float',
                  'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                  'border border-white/20 dark:border-gray-700/20',
                )}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              >
                <Icon className={cn('size-5', styles.icon)} />

                {/* Sparkle effect for announcements */}
                {type === 'announcement' && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="size-3 text-purple-500" />
                  </motion.div>
                )}
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <motion.h3
                    className={cn(
                      'font-semibold text-sm sm:text-base',
                      'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400',
                      'bg-clip-text text-transparent bg-300% animate-gradient-x',
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {announcement.title}
                  </motion.h3>

                  {announcement.tag && (
                    <motion.span
                      className={cn(
                        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
                        'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
                        'border shadow-sm',
                        type === 'announcement'
                          ? 'border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300'
                          : type === 'success'
                            ? 'border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                            : type === 'warning'
                              ? 'border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                              : 'border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300',
                      )}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3, type: 'spring' }}
                    >
                      {type === 'announcement' && <Gift className="size-3" />}
                      {announcement.tag}
                    </motion.span>
                  )}
                </div>

                {announcement.message && (
                  <motion.p
                    className="text-sm text-muted-foreground line-clamp-1 sm:line-clamp-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {announcement.message}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Actions */}
            <motion.div
              className="flex items-center gap-2 shrink-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {announcement.link && (
                <motion.a
                  href={announcement.link}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
                    'border shadow-sm hover:shadow-md',
                    'hover:scale-105 active:scale-95 hover:animate-shimmer',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2',
                    'relative overflow-hidden',
                    type === 'announcement'
                      ? 'border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:ring-purple-500'
                      : type === 'success'
                        ? 'border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 focus:ring-emerald-500'
                        : type === 'warning'
                          ? 'border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:ring-amber-500'
                          : 'border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{announcement.linkText || 'Ver más'}</span>
                  <ExternalLink className="size-4" />
                </motion.a>
              )}

              {announcement.dismissible !== false && (
                <motion.button
                  onClick={() => handleDismiss(announcement)}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-200',
                    'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm',
                    'border border-white/20 dark:border-gray-700/20',
                    'hover:bg-white/80 dark:hover:bg-gray-800/80',
                    'hover:scale-105 active:scale-95',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
                    'text-muted-foreground hover:text-foreground',
                  )}
                  aria-label="Cerrar anuncio"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="size-4" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

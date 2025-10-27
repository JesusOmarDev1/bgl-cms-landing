import { AnnouncementsClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/payload/getGlobals'
import React from 'react'

import type { Announcement } from '@/payload-types'

export async function Announcements() {
  const announcementsData: Announcement = await getCachedGlobal('announcements', 1)()

  // Si no hay anuncios, no renderizar nada
  if (!announcementsData?.announcements || announcementsData.announcements.length === 0) {
    return null
  }

  // Filtrar solo anuncios activos y no expirados
  const activeAnnouncements = announcementsData.announcements.filter((announcement) => {
    if (!announcement.active) return false
    if (!announcement.expiryDate) return false

    const expiryDate = new Date(announcement.expiryDate)
    const now = new Date()

    return expiryDate > now
  })

  // Si no hay anuncios activos válidos, no renderizar nada
  if (activeAnnouncements.length === 0) {
    return null
  }

  // Crear objeto con anuncios filtrados
  const filteredData = {
    ...announcementsData,
    announcements: activeAnnouncements,
  }

  return <AnnouncementsClient data={filteredData} />
}

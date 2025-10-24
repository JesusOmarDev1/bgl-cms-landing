import { AnnouncementsClient } from './Component.client'
import React from 'react'
import type { Announcement } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/payload'

export async function Announcements() {
  const announcementsData: Announcement = await getCachedGlobal('announcements', 1)()

  return <AnnouncementsClient data={announcementsData} />
}

import { AnnouncementsClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Announcement } from '@/payload-types'

export async function Announcements() {
  const announcementsData: Announcement = await getCachedGlobal('announcements', 1)()

  return <AnnouncementsClient data={announcementsData} />
}

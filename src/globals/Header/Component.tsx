import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/payload/getGlobals'
import React from 'react'

import type { Header, Announcement } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const announcementsData: Announcement = await getCachedGlobal('announcements', 1)()

  return <HeaderClient data={headerData} announcements={announcementsData} />
}

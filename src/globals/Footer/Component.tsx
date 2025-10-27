import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/payload/getGlobals'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  return <FooterClient data={footerData} />
}

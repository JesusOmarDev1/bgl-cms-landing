import { getCachedGlobal } from '@/utilities/getGlobals'
import { Link } from 'next-view-transitions'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Separator } from '@/components/ui/separator'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="w-full flex flex-col items-center justify-center border-t border-zinc-500">
      <div className="flex gap-4 justify-between items-center max-w-7xl mx-auto px-4 py-6">
        <div>
          <Logo />
        </div>
        <div className="flex flex-1 flex-col space-y-2">
          <h3 className="text-xl font-semibold">Compañia</h3>
          <div className="grid grid-cols-4 gap-4">
            <nav className="flex flex-col md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink key={i} {...link} />
              })}
            </nav>
          </div>
        </div>
      </div>
      <Separator className="max-w-7xl" />
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 w-full text-sm">
        <span>© 2025 BGL BASCULAS INDUSTRIALES.</span>
        <span>Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}

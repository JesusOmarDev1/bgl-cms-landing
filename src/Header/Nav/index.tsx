'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import { CMSLink } from '@/components/Link'
import { Link } from 'next-view-transitions'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <header className="flex gap-3 items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Link href="/">Inicio</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Navegacion</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[250px]">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="space-y-2.5 hover:text-red-600" key={i} {...link} />
              })}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

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
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <header className="flex gap-3 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[250px]">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink className="text-sm space-y-2.5 hover:text-red-600" key={i} {...link} />
                )
              })}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </header>
  )
}

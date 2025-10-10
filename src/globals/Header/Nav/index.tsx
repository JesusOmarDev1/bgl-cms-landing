'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  data: HeaderType
  props?: React.HTMLAttributes<HTMLDivElement>
}> = ({ data, props }) => {
  const navItems = data?.navItems || []

  return (
    <div className={cn('flex items-center justify-center', props?.className)}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2">
            {navItems.map(({ link }, i) => {
              return (
                <NavigationMenuLink key={i} asChild>
                  <CMSLink {...link} title={link.label} label={link.label} />
                </NavigationMenuLink>
              )
            })}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

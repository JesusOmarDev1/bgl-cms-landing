'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities/ui'
import { getIconComponent } from '@/fields/iconPicker'

type MenuSection = {
  title?: string | null
  showInNav?: boolean | null
  hasDropdown?: boolean | null
  directLink?: {
    link?: {
      label?: string | null
      url?: string | null
      newTab?: boolean | null
      type?: 'custom' | 'reference' | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: string | number | any
      } | null
    } | null
  } | null
  items?: Array<{
    icon?: string | null
    link?: {
      label?: string | null
      url?: string | null
      newTab?: boolean | null
      type?: 'custom' | 'reference' | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: string | number | any
      } | null
    } | null
  }> | null
}

export const HeaderNav: React.FC<{
  data: HeaderType
  props?: React.HTMLAttributes<HTMLDivElement>
}> = ({ data, props }) => {
  // Extraer todas las secciones del menú
  const menuSections: Array<{ key: string; section: MenuSection }> = []

  if (data?.productsMenu?.showInNav) {
    menuSections.push({ key: 'products', section: data.productsMenu })
  }
  if (data?.servicesMenu?.showInNav) {
    menuSections.push({ key: 'services', section: data.servicesMenu })
  }
  if (data?.resourcesMenu?.showInNav) {
    menuSections.push({ key: 'resources', section: data.resourcesMenu })
  }
  if (data?.companyMenu?.showInNav) {
    menuSections.push({ key: 'company', section: data.companyMenu })
  }
  if (data?.contactMenu?.showInNav) {
    menuSections.push({ key: 'contact', section: data.contactMenu })
  }

  return (
    <div className={cn('flex items-center justify-center', props?.className)}>
      <NavigationMenu>
        <NavigationMenuList>
          {menuSections.map(({ key, section }) => {
            const hasDropdown = section.hasDropdown && section.items && section.items.length > 0
            const directLink = section.directLink?.link

            return (
              <NavigationMenuItem key={key}>
                {hasDropdown ? (
                  <>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      {section.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={cn(
                          'grid gap-2 p-2',
                          (section.items?.length ?? 0) > 1
                            ? 'grid-cols-2 w-[300px]'
                            : 'grid-cols-1 w-[200px]',
                        )}
                      >
                        {section.items?.map((item, i) => {
                          if (!item.link) return null
                          const IconComponent = item.icon ? getIconComponent(item.icon) : null
                          return (
                            <li key={i}>
                              <NavigationMenuLink asChild>
                                <CMSLink
                                  type={item.link.type}
                                  url={item.link.url}
                                  newTab={item.link.newTab}
                                  reference={item.link.reference}
                                  className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="flex items-center gap-2">
                                    {IconComponent && <IconComponent className="h-5 w-5" />}
                                    <span>{item.link.label}</span>
                                  </div>
                                </CMSLink>
                              </NavigationMenuLink>
                            </li>
                          )
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : directLink ? (
                  <NavigationMenuLink asChild>
                    <CMSLink
                      {...directLink}
                      title={directLink.label}
                      label={directLink.label}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    />
                  </NavigationMenuLink>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">{section.title}</span>
                )}
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

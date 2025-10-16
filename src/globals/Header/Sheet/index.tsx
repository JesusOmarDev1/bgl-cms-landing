'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { PanelLeftOpen } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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

export const HeaderSheetNav: React.FC<{
  data: HeaderType
  props?: React.HTMLAttributes<HTMLDivElement>
}> = ({ data, props }) => {
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
    <div className="flex items-center justify-center" {...props}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <PanelLeftOpen />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-3xl">Menú de Navegación</SheetTitle>
            <SheetDescription>Selecciona una opción para navegar</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 p-4">
            {menuSections.map(({ key, section }) => {
              const hasDropdown = section.hasDropdown && section.items && section.items.length > 0
              const directLink = section.directLink?.link

              return (
                <div key={key}>
                  {hasDropdown ? (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={key} className="border-none">
                        <AccordionTrigger className="rounded-md p-2 text-lg font-medium hover:bg-accent hover:text-accent-foreground hover:no-underline">
                          {section.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-2 pt-1">
                          <div className="flex flex-col gap-1 pl-4">
                            {section.items?.map((item, i) => {
                              if (!item.link) return null
                              const IconComponent = item.icon ? getIconComponent(item.icon) : null
                              return (
                                <CMSLink
                                  key={i}
                                  type={item.link.type}
                                  url={item.link.url}
                                  newTab={item.link.newTab}
                                  reference={item.link.reference}
                                  className="block rounded-md px-4 py-2 text-base hover:bg-accent hover:text-accent-foreground"
                                >
                                  <div className="flex items-center gap-2">
                                    {IconComponent && <IconComponent className="h-5 w-5" />}
                                    <span>{item.link.label}</span>
                                  </div>
                                </CMSLink>
                              )
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : directLink ? (
                    <CMSLink
                      {...directLink}
                      title={directLink.label}
                      label={directLink.label}
                      className="block rounded-md px-4 py-3 text-lg font-medium hover:bg-accent hover:text-accent-foreground"
                    />
                  ) : (
                    <span className="block px-4 py-3 text-lg font-medium text-muted-foreground">
                      {section.title}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

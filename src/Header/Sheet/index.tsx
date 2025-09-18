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

export const HeaderSheetNav: React.FC<{
  data: HeaderType
  props?: React.HTMLAttributes<HTMLDivElement>
}> = ({ data, props }) => {
  const navItems = data?.navItems || []

  return (
    <div className="flex items-center justify-center" {...props}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={'ghost'} size={'icon'}>
            <PanelLeftOpen />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-3xl">Menu de Navegación</SheetTitle>
            <SheetDescription>Selecciona una opción para navegar</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} className="w-full text-lg" />
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

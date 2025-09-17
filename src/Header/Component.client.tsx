'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, useScroll } from 'motion/react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Link } from 'next-view-transitions'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { PanelLeftOpen, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { HeaderSheetNav } from './Sheet'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface HeaderClientProps {
  data: Header
  display?: 'sticky' | 'fixed'
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, display = 'fixed' }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const { scrollYProgress } = useScroll()

  return (
    <header
      className={cn(
        display === 'sticky' ? 'sticky' : 'fixed',
        'top-0 w-full h-fit z-20 backdrop-filter backdrop-blur-lg bg-background/70 dark:bg-background/70 border-b',
      )}
    >
      <div className="flex flex-col">
        <motion.div
          id="scroll-indicator"
          style={{
            scaleX: scrollYProgress,
            position: display === 'sticky' ? 'sticky' : 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            originX: 0,
          }}
          className="bg-[#EC2224]"
        />
        <nav className="p-4 flex justify-between items-center ">
          <div className="flex gap-4 justify-center items-center">
            <HeaderSheetNav props={{ className: 'lg:hidden' }} data={data} />
            <Link href={'/'} passHref>
              <Logo className="size-14" />
            </Link>
            <HeaderNav props={{ className: 'hidden lg:flex' }} data={data} />
          </div>
          <div className="flex gap-2.5">
            <ThemeSelector />
            <Link passHref href="/search">
              <Button
                className="hidden lg:flex"
                variant={'secondary'}
                icon={SearchIcon}
                iconPlacement="left"
              >
                Buscar
              </Button>
              <Button className="lg:hidden" variant={'secondary'}>
                <SearchIcon />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

/*
{...(theme ? { 'data-theme': theme } : {})}
*/

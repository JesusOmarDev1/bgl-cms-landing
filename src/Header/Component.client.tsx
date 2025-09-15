'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Link } from 'next-view-transitions'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

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

  return (
    <header
      className={cn(
        display === 'sticky' ? 'sticky' : 'fixed',
        'top-0 w-full h-fit z-20 backdrop-filter backdrop-blur-lg bg-background/30 dark:bg-background/30 border-b',
      )}
    >
      <nav className="p-4 flex justify-between items-center ">
        <Link href={'/'} passHref>
          <Logo className="size-14" />
        </Link>
        <HeaderNav data={data} />
        <div className="flex gap-2.5">
          <ThemeSelector />
          <Link passHref href="/search">
            <Button variant={'secondary'} icon={SearchIcon} iconPlacement="left">
              Buscar
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

/*
{...(theme ? { 'data-theme': theme } : {})}
*/

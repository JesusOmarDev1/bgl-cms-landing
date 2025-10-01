'use client'
import { useNav, Hamburger } from '@payloadcms/ui'
import React from 'react'

export const NavHamburger: React.FC<{
  baseClass?: string
}> = ({ baseClass }) => {
  const { navOpen, setNavOpen } = useNav()

  return (
    <div
      className={`${baseClass}__mobile-close`}
      onClick={() => {
        setNavOpen(false)
      }}
      tabIndex={!navOpen ? -1 : undefined}
    >
      <Hamburger closeIcon="x" isActive />
    </div>
  )
}

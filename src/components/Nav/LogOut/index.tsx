'use client'

import { Button, useConfig } from '@payloadcms/ui'
import { LucideLogOut } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export const LogOut: React.FC = () => {
  const {
    config: {
      admin: {
        routes: { logout: logoutRoute },
      },
      routes: { admin },
    },
  } = useConfig()

  return (
    <Link
      href={`${admin}${logoutRoute}#custom`}
      className="flex items-center gap-2 no-underline mt-0"
      passHref
    >
      <Button className="flex items-center justify-center w-full">
        <LucideLogOut className="size-5" />
        <span className="font-semibold ml-1">Cerrar Sesion</span>
      </Button>
    </Link>
  )
}

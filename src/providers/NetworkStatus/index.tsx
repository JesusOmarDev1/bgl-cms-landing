'use client'

import React, { useEffect, useRef } from 'react'
import useNetwork from '@/hooks/useNetwork'
import { toast } from 'sonner'

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const isOnline = useNetwork()
  const wasOffline = useRef(false)

  useEffect(() => {
    if (isOnline) {
      if (wasOffline.current) {
        toast.success('¡Conexión restablecida!')
        wasOffline.current = false
      }
    } else {
      wasOffline.current = true
      toast.error('Oops parece que no tienes conexión a internet')
    }
  }, [isOnline])

  return <>{children}</>
}

export default NetworkStatusProvider

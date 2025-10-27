'use client'

import React, { useEffect, useRef } from 'react'
import useNetworkStatus from '@/utilities/hooks/useNetworkStatus'
import { toast } from 'sonner'
import { Wifi, WifiOff } from 'lucide-react'

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOnline } = useNetworkStatus()
  const wasOffline = useRef(false)

  useEffect(() => {
    if (isOnline) {
      if (wasOffline.current) {
        toast.success('¡Conexión restablecida!', {
          icon: <Wifi />,
        })
        wasOffline.current = false
      }
    } else {
      wasOffline.current = true
      toast.error('Oops parece que no tienes conexión a internet', {
        duration: Infinity,
        icon: <WifiOff />,
      })
    }
  }, [isOnline])

  return <>{children}</>
}

export default NetworkStatusProvider

'use client'
import React from 'react'
import { useDelayedMount } from '@/hooks/useDelayedMount'

interface DelayedChartProps {
  children: React.ReactNode
  delay?: number
  fallback?: React.ReactNode
}

export const DelayedChart: React.FC<DelayedChartProps> = ({ 
  children, 
  delay = 0, 
  fallback 
}) => {
  const shouldMount = useDelayedMount(delay)
  
  if (!shouldMount) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

export default DelayedChart

'use client'
import React, { Suspense } from 'react'

interface ChartLoadingProps {
  height?: string
  className?: string
}

const ChartLoading: React.FC<ChartLoadingProps> = ({ 
  height = '300px', 
  className = '' 
}) => (
  <div 
    className={`flex items-center justify-center bg-muted/50 rounded-lg animate-pulse ${className}`}
    style={{ height }}
  >
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground">Cargando gráfico...</span>
    </div>
  </div>
)

interface ChartSuspenseWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  height?: string
  className?: string
}

export const ChartSuspenseWrapper: React.FC<ChartSuspenseWrapperProps> = ({
  children,
  fallback,
  height = '300px',
  className = ''
}) => (
  <Suspense 
    fallback={fallback || <ChartLoading height={height} className={className} />}
  >
    {children}
  </Suspense>
)

export default ChartSuspenseWrapper

import { cn } from '@/utilities/ui/cn'
import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width = 100 }) => {
  return (
    <div className={cn(className)} style={{ maxWidth: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}

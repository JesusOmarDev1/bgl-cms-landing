'use client'

import React from 'react'
import { getIconComponent } from '@/fields/iconPicker'

interface LucideIconProps {
  name: string
  size?: number
  className?: string
  color?: string
  strokeWidth?: number
}

/**
 * Componente para renderizar iconos de Lucide React dinámicamente
 * 
 * Uso:
 * ```tsx
 * <LucideIcon name="Home" size={24} />
 * <LucideIcon name="User" size={32} className="text-blue-500" />
 * ```
 */
export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  size = 24,
  className = '',
  color,
  strokeWidth,
}) => {
  const IconComponent = getIconComponent(name)

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Lucide React`)
    return null
  }

  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
    />
  )
}

export default LucideIcon

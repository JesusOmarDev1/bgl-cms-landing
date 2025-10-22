'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

// Color utility functions
const hexToHsv = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  let s = 0
  const v = max

  if (diff !== 0) {
    s = diff / max
    switch (max) {
      case r:
        h = ((g - b) / diff) % 6
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h = h * 60
    if (h < 0) h += 360
  }

  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)]
}

const hsvToHex = (h: number, s: number, v: number): string => {
  const hNorm = h / 360
  const sNorm = s / 100
  const vNorm = v / 100

  const c = vNorm * sNorm
  const x = c * (1 - Math.abs(((hNorm * 6) % 2) - 1))
  const m = vNorm - c

  let r = 0,
    g = 0,
    b = 0

  if (0 <= hNorm && hNorm < 1 / 6) {
    r = c
    g = x
    b = 0
  } else if (1 / 6 <= hNorm && hNorm < 2 / 6) {
    r = x
    g = c
    b = 0
  } else if (2 / 6 <= hNorm && hNorm < 3 / 6) {
    r = 0
    g = c
    b = x
  } else if (3 / 6 <= hNorm && hNorm < 4 / 6) {
    r = 0
    g = x
    b = c
  } else if (4 / 6 <= hNorm && hNorm < 5 / 6) {
    r = x
    g = 0
    b = c
  } else if (5 / 6 <= hNorm && hNorm < 1) {
    r = c
    g = 0
    b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

const normalizeHex = (hex: string): string => {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  return hex
}

// Color Picker Components
interface ColorAreaProps {
  hue: number
  saturation: number
  value: number
  onChange: (s: number, v: number) => void
}

const ColorArea: React.FC<ColorAreaProps> = ({ hue, saturation, value, onChange }) => {
  const areaRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updateColor(e)
  }, [])

  const updateColor = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!areaRef.current) return

      const rect = areaRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height))

      onChange(Math.round(x * 100), Math.round(y * 100))
    },
    [onChange],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateColor(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updateColor])

  const areaStyle = {
    background: `
      linear-gradient(to top, #000, transparent),
      linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))
    `,
  }

  const pointerStyle = {
    left: `${saturation}%`,
    top: `${100 - value}%`,
  }

  return (
    <div
      ref={areaRef}
      className="relative w-full h-48 cursor-crosshair rounded-lg overflow-hidden"
      style={areaStyle}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={pointerStyle}
      />
    </div>
  )
}

interface HueSliderProps {
  hue: number
  onChange: (hue: number) => void
}

const HueSlider: React.FC<HueSliderProps> = ({ hue, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updateHue(e)
  }, [])

  const updateHue = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      onChange(Math.round(x * 360))
    },
    [onChange],
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateHue(e)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updateHue])

  const sliderStyle = {
    background:
      'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
  }

  const thumbStyle = {
    left: `${(hue / 360) * 100}%`,
  }

  return (
    <div className="relative w-full h-4 mt-4">
      <div
        ref={sliderRef}
        className="w-full h-full rounded-lg cursor-pointer"
        style={sliderStyle}
        onMouseDown={handleMouseDown}
      />
      <div
        className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2"
        style={thumbStyle}
      />
    </div>
  )
}

// Main Color Picker Component
export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#ff0000',
  onChange,
  disabled = false,
  className,
}) => {
  const initialColor = value || defaultValue
  const [inputValue, setInputValue] = useState(initialColor)
  const [hsv, setHsv] = useState(() => {
    const validHex = isValidHex(initialColor) ? normalizeHex(initialColor) : '#ff0000'
    return hexToHsv(validHex)
  })

  // Update HSV when value prop changes
  useEffect(() => {
    if (value && isValidHex(value)) {
      const normalizedHex = normalizeHex(value)
      setInputValue(normalizedHex)
      setHsv(hexToHsv(normalizedHex))
    }
  }, [value])

  const handleHsvChange = useCallback(
    (newH?: number, newS?: number, newV?: number) => {
      const [h, s, v] = hsv
      const updatedHsv: [number, number, number] = [
        newH !== undefined ? newH : h,
        newS !== undefined ? newS : s,
        newV !== undefined ? newV : v,
      ]

      const hexColor = hsvToHex(...updatedHsv)

      // Update state in batch to avoid multiple renders
      setHsv(updatedHsv)
      setInputValue(hexColor)

      // Call onChange only if the color actually changed
      if (onChange && hexColor !== hsvToHex(...hsv)) {
        onChange(hexColor)
      }
    },
    [hsv, onChange],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)

      if (isValidHex(newValue)) {
        const normalizedHex = normalizeHex(newValue)
        setHsv(hexToHsv(normalizedHex))
        onChange?.(normalizedHex)
      }
    },
    [onChange],
  )

  const handleInputBlur = useCallback(() => {
    if (!isValidHex(inputValue)) {
      // Reset to current valid color if input is invalid
      const currentHex = hsvToHex(...hsv)
      setInputValue(currentHex)
    }
  }, [inputValue, hsv])

  const [h, s, v] = hsv
  const currentColor = hsvToHex(h, s, v)

  return (
    <div className={cn('p-4 bg-background border rounded-lg shadow-lg', className)}>
      <div className="space-y-4">
        {/* Color Area */}
        <ColorArea
          hue={h}
          saturation={s}
          value={v}
          onChange={(newS, newV) => handleHsvChange(undefined, newS, newV)}
        />

        {/* Hue Slider */}
        <HueSlider hue={h} onChange={(newH) => handleHsvChange(newH)} />

        {/* Color Preview and Input */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-10 rounded border-2 border-border flex-shrink-0"
            style={{ backgroundColor: currentColor }}
          />
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            placeholder="#000000"
            className="font-mono text-sm"
          />
        </div>
      </div>
    </div>
  )
}

// Color Picker with Trigger (Dropdown)
export interface ColorPickerWithTriggerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export const ColorPickerWithTrigger: React.FC<ColorPickerWithTriggerProps> = ({
  value,
  defaultValue = '#ff0000',
  onChange,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempValue, setTempValue] = useState(value || defaultValue)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Update temp value when value changes
  useEffect(() => {
    setTempValue(value || defaultValue)
  }, [value, defaultValue])

  const handleColorChange = (newColor: string) => {
    setTempValue(newColor)
    onChange?.(newColor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setTempValue(newValue)

    // Only call onChange if it's a valid color
    if (isValidHex(newValue)) {
      onChange?.(normalizeHex(newValue))
    }
  }

  const getContrastColor = (hexColor: string): string => {
    if (!hexColor || !hexColor.startsWith('#')) return '#000000'

    const r = parseInt(hexColor.slice(1, 3), 16)
    const g = parseInt(hexColor.slice(3, 5), 16)
    const b = parseInt(hexColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          variant="outline"
          className="w-12 h-10 p-0 border-2"
          style={{ backgroundColor: tempValue || '#FFFFFF' }}
          aria-label="Open color picker"
        >
          <span className="text-xs font-medium" style={{ color: getContrastColor(tempValue) }}>
            {tempValue && tempValue.length <= 7 ? tempValue.toUpperCase() : '●'}
          </span>
        </Button>
        <div className="flex-1">
          <Input
            value={tempValue}
            onChange={handleInputChange}
            placeholder="#000000"
            disabled={disabled}
            className="font-mono transition-colors"
            style={{
              backgroundColor: isValidHex(tempValue) ? `${tempValue}10` : undefined,
              borderColor: isValidHex(tempValue) ? tempValue : undefined,
            }}
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-12 left-0 z-50">
          <ColorPicker value={tempValue} onChange={handleColorChange} className="w-80" />
        </div>
      )}
    </div>
  )
}

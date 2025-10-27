'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui/cn'

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

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      updateColor(e)
    },
    [updateColor],
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

  const updateHue = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!sliderRef.current) return

      const rect = sliderRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      onChange(Math.round(x * 360))
    },
    [onChange],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      updateHue(e)
    },
    [updateHue],
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
  const validInitialColor = isValidHex(initialColor) ? normalizeHex(initialColor) : '#ff0000'

  const [inputValue, setInputValue] = useState(validInitialColor)
  const [hsv, setHsv] = useState(() => hexToHsv(validInitialColor))

  // Update HSV when value prop changes
  useEffect(() => {
    const currentValue = value || defaultValue
    if (currentValue && isValidHex(currentValue)) {
      const normalizedHex = normalizeHex(currentValue)
      // Only update if the value actually changed
      if (normalizedHex !== inputValue) {
        setInputValue(normalizedHex)
        setHsv(hexToHsv(normalizedHex))
      }
    }
  }, [value, defaultValue, inputValue])

  const handleHsvChange = useCallback(
    (newH?: number, newS?: number, newV?: number) => {
      const [h, s, v] = hsv
      const updatedHsv: [number, number, number] = [
        newH !== undefined ? Math.max(0, Math.min(360, newH)) : h,
        newS !== undefined ? Math.max(0, Math.min(100, newS)) : s,
        newV !== undefined ? Math.max(0, Math.min(100, newV)) : v,
      ]

      const hexColor = hsvToHex(...updatedHsv)
      const previousHex = hsvToHex(...hsv)

      // Only update if color actually changed
      if (hexColor !== previousHex) {
        setHsv(updatedHsv)
        setInputValue(hexColor)
        onChange?.(hexColor)
      }
    },
    [hsv, onChange],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.trim()
      setInputValue(newValue)

      if (isValidHex(newValue)) {
        const normalizedHex = normalizeHex(newValue)
        const newHsv = hexToHsv(normalizedHex)
        setHsv(newHsv)
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
    } else {
      // Normalize the hex value
      const normalizedHex = normalizeHex(inputValue)
      if (normalizedHex !== inputValue) {
        setInputValue(normalizedHex)
      }
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
          <div className="relative">
            <div
              className="w-12 h-10 rounded-md flex-shrink-0"
              style={{ backgroundColor: currentColor }}
            />
            {/* Checkerboard pattern for transparency preview */}
            <div
              className="absolute inset-0 rounded-md opacity-20 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #ccc 25%, transparent 25%),
                  linear-gradient(-45deg, #ccc 25%, transparent 25%),
                  linear-gradient(45deg, transparent 75%, #ccc 75%),
                  linear-gradient(-45deg, transparent 75%, #ccc 75%)
                `,
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              }}
            />
          </div>

          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              disabled={disabled}
              className="px-[15px] py-2 h-12 border-[#ddd] bg-white shadow dark:border-[#3c3c3c] border rounded-lg hover: dark:bg-[#222]"
            />
          </div>
        </div>

        {/* HSV Values Display */}
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="text-center">
            <div className="font-medium">H</div>
            <div>{Math.round(h)}°</div>
          </div>
          <div className="text-center">
            <div className="font-medium">S</div>
            <div>{Math.round(s)}%</div>
          </div>
          <div className="text-center">
            <div className="font-medium">V</div>
            <div>{Math.round(v)}%</div>
          </div>
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
  defaultValue = '#000000',
  onChange,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempValue, setTempValue] = useState(() => {
    const initialValue = value || defaultValue
    return isValidHex(initialValue) ? normalizeHex(initialValue) : '#000000'
  })
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  // Update temp value when value prop changes
  useEffect(() => {
    const newValue = value || defaultValue
    if (newValue && isValidHex(newValue)) {
      const normalizedValue = normalizeHex(newValue)
      // Only update if the value actually changed
      if (normalizedValue !== tempValue) {
        setTempValue(normalizedValue)
      }
    }
  }, [value, defaultValue, tempValue])

  const handleColorChange = useCallback(
    (newColor: string) => {
      if (isValidHex(newColor)) {
        const normalizedColor = normalizeHex(newColor)
        setTempValue(normalizedColor)
        onChange?.(normalizedColor)
      }
    },
    [onChange],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.trim()
      setTempValue(newValue)

      // Only call onChange if it's a valid color
      if (isValidHex(newValue)) {
        const normalizedColor = normalizeHex(newValue)
        onChange?.(normalizedColor)
      }
    },
    [onChange],
  )

  const handleInputBlur = useCallback(() => {
    // Reset to last valid color if input is invalid
    if (!isValidHex(tempValue)) {
      const fallbackValue = value || defaultValue
      setTempValue(isValidHex(fallbackValue) ? normalizeHex(fallbackValue) : '#000000')
    }
  }, [tempValue, value, defaultValue])

  const previewColor = isValidHex(tempValue) ? tempValue : '#FFFFFF'
  const isValidColor = isValidHex(tempValue)

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <div className="flex items-center gap-3">
        {/* Color Preview Button */}
        <Button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          variant="outline"
          className={cn(
            'size-12 p-1 border-0 transition-all duration-200 hover:scale-105 rounded-full border-zinc-400 dark:border-zinc-600',
            isOpen && 'ring-0',
            !isValidColor && 'border-destructive',
          )}
          aria-label="Abrir selector de color"
        >
          <div
            className="w-full h-full rounded-full border-0 shadow-inner"
            style={{ backgroundColor: previewColor }}
          >
            {!isValidColor && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-destructive">?</span>
              </div>
            )}
          </div>
        </Button>

        {/* Color Input */}
        <div className="flex-1">
          <Input
            value={tempValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            className="px-[15px] py-2 h-12 border-[#ddd] bg-white shadow dark:border-[#3c3c3c] border rounded-lg hover: dark:bg-[#222]"
            readOnly
          />
        </div>
      </div>

      {/* Color Picker Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-12 left-0 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="bg-white border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600 rounded-lg shadow-lg">
            <ColorPicker
              value={tempValue}
              onChange={handleColorChange}
              className="border-0 shadow-none"
            />

            {/* Quick Color Presets */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-600">
              <div className="text-base font-semibold text-muted-foreground mb-1">
                Colores rápidos
              </div>
              <div className="grid grid-cols-8 gap-1 my-2">
                {[
                  '#000000',
                  '#FFFFFF',
                  '#FF0000',
                  '#00FF00',
                  '#0000FF',
                  '#FFFF00',
                  '#FF00FF',
                  '#00FFFF',
                  '#800000',
                  '#808080',
                  '#FF8000',
                  '#80FF00',
                  '#8000FF',
                  '#FF0080',
                  '#0080FF',
                  '#80FFFF',
                ].map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className={cn(
                      'size-8 rounded-full border border-zinc-400 dark:border-zinc-600 hover:scale-80 transition-transform',
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

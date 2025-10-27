'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/hooks/useDebounceWindowed'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'
import { usePopularSearches } from '@/utilities/hooks/usePopularSearches'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()
  const { popularSearches, recordSearch } = usePopularSearches()

  const debouncedValue = useDebounce(value, 300)

  // Separar la navegación del registro de búsqueda
  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  // Registrar búsqueda solo cuando hay un valor válido y ha cambiado
  useEffect(() => {
    if (debouncedValue && debouncedValue.trim().length > 2) {
      recordSearch(debouncedValue)
    }
  }, [debouncedValue, recordSearch])

  return (
    <div className="max-w-4xl mx-5 md:mx-auto">
      {/* Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="relative"
      >
        <Label htmlFor="search" className="sr-only">
          Buscar
        </Label>

        {/* Search Container */}
        <div
          className={`
          relative w-full transition-all duration-300 ease-out
          ${
            isFocused
              ? 'transform scale-[1.02] drop-shadow-2xl'
              : 'drop-shadow-lg hover:drop-shadow-xl'
          }
        `}
        >
          {/* Main Search Input */}
          <div
            className={`
            relative rounded-3xl overflow-hidden transition-all duration-200 ring-1 ring-zinc-200 dark:ring-zinc-900
          `}
          >
            <SearchIcon
              className={`
              absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200
              ${isFocused ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}
            `}
            />

            <Input
              id="search"
              value={value}
              placeholder="Ej: Necesito una bascula para mi empresa..."
              className={`
                pl-14 pr-12 py-6 text-lg ring-0 outline-0 border-0 bg-background
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                transition-all duration-200
              `}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(event) => {
                setValue(event.target.value)
              }}
            />

            {/* Clear Button */}
            {value && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setValue('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 transform hover:scale-110"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              </Button>
            )}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Búsquedas populares:</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {popularSearches.map((tag) => (
              <Button
                key={tag}
                type="button"
                variant={'secondary'}
                size={'sm'}
                onClick={() => {
                  setValue(tag)
                }}
                className="px-4 py-2 rounded-full transition-all hover:scale-90"
              >
                {tag}
              </Button>
            ))}
          </div>
          {popularSearches.length === 0 && (
            <div className="text-xs text-gray-400 mt-2">
              Las búsquedas populares aparecerán aquí basadas en tu actividad
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

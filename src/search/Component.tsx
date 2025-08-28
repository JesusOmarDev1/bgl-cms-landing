'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Buscar
        </Label>
        <div className="relative h-10 w-full">
          <SearchIcon className="absolute left-3 top-[18px] transform -translate-y-1/2 text-gray-500 z-10 size-4" />
          <Input
            className="pl-8 pr-3 py-2 text-md w-full text-ellipsis border border-gray-300 rounded-4xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
            id="search"
            onChange={(event) => {
              setValue(event.target.value)
            }}
            placeholder="Describe qué estás buscando y te guiaremos hacia la solución."
          />
        </div>
        <Button type="submit" className="sr-only">
          Enviar
        </Button>
      </form>
    </div>
  )
}

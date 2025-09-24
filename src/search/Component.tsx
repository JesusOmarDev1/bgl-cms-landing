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
    <div className="max-w-3xl mx-5 md:mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Buscar
        </Label>
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Describe qué estás buscando y te guiaremos hacia la solución."
            className="pl-10 rounded-3xl truncate"
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />
        </div>
        <Button type="submit" className="sr-only">
          Enviar
        </Button>
      </form>
    </div>
  )
}

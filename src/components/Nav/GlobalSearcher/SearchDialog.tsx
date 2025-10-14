'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ChevronRightIcon, SearchIcon } from 'lucide-react'
import { Search } from '@/payload-types'
import { useDebounce } from '@/utilities/useDebounce'
import Link from 'next/link'
import { searchContent } from './searchAction'
import { getNavIcon } from '@/components/Nav/navIconMap'

interface SearchDialogProps {
  initialResults: Search[]
}

const collectionLabels = {
  posts: 'Publicaciones',
  products: 'Productos',
  manuals: 'Manuales',
  services: 'Servicios',
  pages: 'Páginas',
  categories: 'Categorías',
  media: 'Medios',
  users: 'Usuarios',
  brands: 'Marcas',
  models: 'Modelos',
  suppliers: 'Proveedores',
  clients: 'Clientes',
  forms: 'Formularios',
  'form-submissions': 'Envíos',
} as const

export const SearchDialog: React.FC<SearchDialogProps> = ({ initialResults }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Search[]>(initialResults)
  const [totalDocs, setTotalDocs] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults(initialResults)
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const response = await searchContent(debouncedQuery, 10)
        if (!abortController.signal.aborted) {
          setResults(response.docs)
          setTotalDocs(response.totalDocs)
          setHasMore(response.hasMore)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        console.error('Error searching:', error)
        if (!abortController.signal.aborted) {
          setResults([])
          setTotalDocs(0)
          setHasMore(false)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    performSearch()

    return () => {
      abortController.abort()
    }
  }, [debouncedQuery, initialResults])

  const groupedResults = useMemo(() => {
    return results.reduce(
      (acc, result) => {
        const collection = result.doc.relationTo
        if (!acc[collection]) {
          acc[collection] = []
        }
        acc[collection].push(result)
        return acc
      },
      {} as Record<string, Search[]>,
    )
  }, [results])

  const handleSelect = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <>
      <div
        id="global-searcher"
        data-slot="command-input-wrapper"
        className="flex h-9 items-center gap-1.5 border mb-4 rounded-3xl border-zinc-200 dark:border-zinc-800 px-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
        onClick={handleOpen}
      >
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Buscar contenido...</p>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="border-zinc-200 dark:border-zinc-800 border w-full mx-auto md:min-w-[600px] lg:min-w-[1200px]"
        shouldFilter={false}
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Buscar publicaciones, productos, manuales..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {loading ? (
            <div className="py-6 text-center text-sm text-zinc-500">Buscando...</div>
          ) : results.length === 0 ? (
            <CommandEmpty>
              {query ? 'No se encontraron resultados' : 'Escribe para buscar'}
            </CommandEmpty>
          ) : (
            <>
              {Object.entries(groupedResults).map(([collection, items]) => {
                const Icon = getNavIcon(collection)
                const label =
                  collectionLabels[collection as keyof typeof collectionLabels] || collection

                return (
                  <CommandGroup key={collection} heading={label}>
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/admin/collections/${collection}/${typeof item.doc.value === 'object' ? item.doc.value.id : item.doc.value}`}
                        onClick={handleSelect}
                        className="no-underline hover:underline"
                      >
                        <CommandItem className="cursor-pointer px-2">
                          {Icon && (
                            <Icon className="mr-2 size-4 md:size-6 lg:size-8 shrink-0 dark:stroke-zinc-50" />
                          )}
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="truncate font-medium text-base">
                              {item.title || 'Sin título'}
                            </span>
                            {item.meta?.description && (
                              <span className="text-sm text-zinc-500 truncate">
                                {item.meta.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                )
              })}
              {hasMore && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleSelect}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    <span>Ver todos los resultados ({totalDocs})</span>
                    <ChevronRightIcon className="size-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

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
import { useDebounce } from '@/utilities/hooks/useDebounceWindowed'
import Link from 'next/link'
import { searchContent, loadMoreSearchResults } from './searchAction'
import { getNavIcon } from '@/components/Nav/navIconMap'
import type { SearchResult } from './types'
import { getCollectionLabels, SEARCH_SETTINGS } from './config'
import { groupResultsByCollection } from './utils'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SearchDialogProps {
  initialResults: SearchResult[]
}

// Obtener etiquetas de colecciones desde la configuración
const collectionLabels = getCollectionLabels()

/**
 * Hook personalizado para manejar el estado de búsqueda
 */
const useSearchState = (initialResults: SearchResult[]) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>(initialResults)
  const [totalDocs, setTotalDocs] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedQuery = useDebounce(query, SEARCH_SETTINGS.debounceMs)

  return {
    open,
    setOpen,
    query,
    setQuery,
    results,
    setResults,
    totalDocs,
    setTotalDocs,
    hasMore,
    setHasMore,
    loading,
    setLoading,
    loadingMore,
    setLoadingMore,
    error,
    setError,
    currentPage,
    setCurrentPage,
    debouncedQuery,
  }
}

/**
 * Componente de elemento de resultado de búsqueda
 */
const SearchResultItem: React.FC<{
  item: SearchResult
  collection: string
  onSelect: () => void
}> = ({ item, collection, onSelect }) => {
  const Icon = getNavIcon(collection)

  return (
    <Link
      key={item.id}
      href={`/admin/collections/${collection}/${item.id}`}
      onClick={onSelect}
      className="no-underline"
    >
      <CommandItem className="cursor-pointer px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
        {Icon && <Icon className="mr-3 size-5 shrink-0 text-zinc-600 dark:text-zinc-400" />}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="truncate font-medium text-base text-zinc-900 dark:text-zinc-100">
            {item.title || 'Sin título'}
          </span>
        </div>
      </CommandItem>
    </Link>
  )
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ initialResults }) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    results,
    setResults,
    totalDocs,
    setTotalDocs,
    hasMore,
    setHasMore,
    loading,
    setLoading,
    loadingMore,
    setLoadingMore,
    error,
    setError,
    currentPage,
    setCurrentPage,
    debouncedQuery,
  } = useSearchState(initialResults)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen])

  // Efecto para realizar búsquedas
  useEffect(() => {
    const abortController = new AbortController()

    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults(initialResults)
        setTotalDocs(0)
        setHasMore(false)
        setError(null)
        setCurrentPage(1)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await searchContent(debouncedQuery, SEARCH_SETTINGS.maxSearchResults)

        if (!abortController.signal.aborted) {
          setResults(response.docs)
          setTotalDocs(response.totalDocs)
          setHasMore(response.hasMore)
          setCurrentPage(1)
        }
      } catch (searchError) {
        if (searchError instanceof Error && searchError.name === 'AbortError') {
          return
        }

        console.error('Error searching:', searchError)

        if (!abortController.signal.aborted) {
          setResults([])
          setTotalDocs(0)
          setHasMore(false)
          setCurrentPage(1)
          setError('Error al realizar la búsqueda. Inténtalo de nuevo.')
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
  }, [
    debouncedQuery,
    initialResults,
    setResults,
    setTotalDocs,
    setHasMore,
    setError,
    setLoading,
    setCurrentPage,
  ])

  // Agrupar resultados por colección
  const groupedResults = useMemo(() => groupResultsByCollection(results), [results])

  const handleSelect = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [setOpen, setQuery])

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  // Función para cargar más resultados
  const handleLoadMore = useCallback(async () => {
    if (!debouncedQuery.trim() || loadingMore) return

    setLoadingMore(true)
    setError(null)

    try {
      const response = await loadMoreSearchResults(debouncedQuery, results, currentPage + 1)
      setResults(response.docs)
      setHasMore(response.hasMore)
      setCurrentPage(currentPage + 1)
    } catch (error) {
      console.error('Error loading more results:', error)
      setError('Error al cargar más resultados. Inténtalo de nuevo.')
    } finally {
      setLoadingMore(false)
    }
  }, [
    debouncedQuery,
    results,
    currentPage,
    loadingMore,
    setLoadingMore,
    setError,
    setResults,
    setHasMore,
    setCurrentPage,
  ])

  return (
    <>
      <div
        id="global-searcher"
        data-slot="command-input-wrapper"
        className="flex h-9 items-center gap-1.5 border mb-4 rounded-3xl border-zinc-200 dark:border-zinc-800 px-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
        onClick={handleOpen}
      >
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <p className="text-lg text-zinc-500 dark:text-zinc-400">Buscar contenido...</p>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-600 dark:text-zinc-400 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="border-zinc-200 dark:border-zinc-800 border w-full mx-auto md:min-w-[600px] xl:min-w-[1200px]"
        shouldFilter={false}
        showCloseButton={false}
      >
        <CommandInput
          placeholder="Buscar publicaciones, productos, manuales..."
          value={query}
          onValueChange={setQuery}
          className="w-full border-0 bg-transparent outline-none text-base placeholder:text-zinc-500 dark:placeholder:text-zinc-400 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800"
        />

        {/* Indicador de resultados */}
        {query && !loading && results.length > 0 && (
          <div className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between">
              <span>
                {results.length} de {totalDocs} resultados
              </span>
              {hasMore && (
                <span className="text-xs text-zinc-500 dark:text-zinc-500">
                  Hay más disponibles
                </span>
              )}
            </div>
          </div>
        )}

        <CommandList className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-500"></div>
              Buscando...
            </div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-red-500 bg-red-50 dark:bg-red-900/20 mx-4 my-2 rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          ) : results.length === 0 ? (
            <CommandEmpty className="py-8 text-center text-zinc-500 dark:text-zinc-400">
              {query ? (
                <div className="space-y-2">
                  <div className="text-base">No se encontraron resultados</div>
                  <div className="text-sm opacity-75">Intenta con otros términos de búsqueda</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-base">Escribe para buscar</div>
                  <div className="text-sm opacity-75">
                    Busca en publicaciones, productos y manuales
                  </div>
                </div>
              )}
            </CommandEmpty>
          ) : (
            <>
              {Object.entries(groupedResults).map(([collection, items]) => {
                const label =
                  collectionLabels[collection as keyof typeof collectionLabels] || collection

                return (
                  <CommandGroup key={collection} heading={label}>
                    {items.map((item: SearchResult) => (
                      <SearchResultItem
                        key={item.id}
                        item={item}
                        collection={collection}
                        onSelect={handleSelect}
                      />
                    ))}
                  </CommandGroup>
                )
              })}

              {/* Botón Ver más para búsquedas */}
              {query && hasMore && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-3 bg-zinc-50 dark:bg-zinc-900/50">
                  <Button
                    variant={'secondary'}
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-lg hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-500"></div>
                        Cargando más...
                      </>
                    ) : (
                      <>
                        <span>Ver más resultados</span>
                      </>
                    )}
                  </Button>

                  {/* Enlace a página de búsqueda completa */}
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleSelect}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors rounded-md hover:bg-white dark:hover:bg-zinc-800"
                  >
                    <span>Ver todos los resultados ({totalDocs}) en página completa</span>
                  </Link>
                </div>
              )}

              {/* Enlace para resultados iniciales sin búsqueda */}
              {!query && results.length > 0 && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="text-center text-sm text-zinc-500 dark:text-zinc-500 py-2">
                    Mostrando documentos recientes. Escribe para buscar contenido específico.
                  </div>
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

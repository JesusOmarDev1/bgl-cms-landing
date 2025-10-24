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
import { ChevronRightIcon, SearchIcon, Loader2 } from 'lucide-react'
import { useDebounce } from '@/utilities/useDebounce'
import Link from 'next/link'
import { searchContent, loadMoreSearchResults } from './searchAction'
import { getNavIcon } from '@/components/Nav/navIconMap'
import type { SearchResult } from './types'
import { getCollectionLabels, SEARCH_SETTINGS } from './config'
import { groupResultsByCollection } from './utils'

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
      className="no-underline hover:underline"
    >
      <CommandItem className="cursor-pointer px-2">
        {Icon && <Icon className="mr-2 size-4 md:size-6 lg:size-8 shrink-0 dark:stroke-zinc-50" />}
        <div className="flex flex-col flex-1 min-w-0">
          <span className="truncate font-medium text-base">{item.title || 'Sin título'}</span>

          {/* Meta descripción */}
          {item.meta?.description && (
            <span className="text-sm text-zinc-500 truncate">{item.meta.description}</span>
          )}

          {/* Información específica de productos */}
          {collection === 'products' && 'brand' in item && (item.brand || item.model) && (
            <span className="text-xs text-zinc-400 truncate">
              {[item.brand, item.model].filter(Boolean).join(' - ')}
            </span>
          )}

          {/* Descripción alternativa */}
          {!item.meta?.description && 'description' in item && item.description && (
            <span className="text-sm text-zinc-500 truncate">{item.description}</span>
          )}
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
  }, [debouncedQuery, initialResults, setResults, setTotalDocs, setHasMore, setError, setLoading])

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
  }, [debouncedQuery, results, currentPage, loadingMore])

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
        />

        {/* Indicador de resultados */}
        {query && !loading && results.length > 0 && (
          <div className="px-3 py-2 text-xs text-zinc-500 dark:text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
            {results.length} de {totalDocs} resultados
            {hasMore && ' (hay más disponibles)'}
          </div>
        )}
        <CommandList>
          {loading ? (
            <div className="py-6 text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Buscando...
            </div>
          ) : error ? (
            <div className="py-6 text-center text-sm text-red-500">{error}</div>
          ) : results.length === 0 ? (
            <CommandEmpty>
              {query ? 'No se encontraron resultados' : 'Escribe para buscar'}
            </CommandEmpty>
          ) : (
            <>
              {Object.entries(groupedResults).map(([collection, items]) => {
                const label = collectionLabels[collection] || collection

                return (
                  <CommandGroup key={collection} heading={label}>
                    {items.map((item) => (
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
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-3 space-y-2">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-200 dark:border-zinc-700"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Cargando más...
                      </>
                    ) : (
                      <>
                        <span>Ver más resultados</span>
                        <ChevronRightIcon className="size-4" />
                      </>
                    )}
                  </button>

                  {/* Enlace a página de búsqueda completa */}
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={handleSelect}
                    className="flex items-center justify-center gap-2 w-full py-1 text-xs text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                  >
                    <span>Ver todos los resultados ({totalDocs}) en página completa</span>
                  </Link>
                </div>
              )}

              {/* Enlace para resultados iniciales sin búsqueda */}
              {!query && results.length > 0 && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-2">
                  <div className="text-center text-xs text-zinc-500 dark:text-zinc-500 py-2">
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

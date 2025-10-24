import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/utilities/hooks/useDebounceWindowed'
import { searchContent, loadMoreSearchResults } from '../searchAction'
import type { SearchResult } from '../types'
import { SEARCH_SETTINGS } from '../config'

interface UseGlobalSearchOptions {
  initialResults?: SearchResult[]
  debounceMs?: number
  limit?: number
}

interface UseGlobalSearchReturn {
  // Estado
  query: string
  results: SearchResult[]
  loading: boolean
  loadingMore: boolean
  error: string | null
  totalDocs: number
  hasMore: boolean
  currentPage: number

  // Acciones
  setQuery: (query: string) => void
  clearSearch: () => void
  retry: () => void
  loadMore: () => Promise<void>
}

/**
 * Hook personalizado para manejar la lógica de búsqueda global
 */
export function useGlobalSearch(options: UseGlobalSearchOptions = {}): UseGlobalSearchReturn {
  const {
    initialResults = [],
    debounceMs = SEARCH_SETTINGS.debounceMs,
    limit = SEARCH_SETTINGS.defaultLimit,
  } = options

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>(initialResults)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalDocs, setTotalDocs] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedQuery = useDebounce(query, debounceMs)

  // Función para realizar búsqueda
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
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
        const response = await searchContent(searchQuery, limit)
        setResults(response.docs)
        setTotalDocs(response.totalDocs)
        setHasMore(response.hasMore)
        setCurrentPage(1)
      } catch (searchError) {
        console.error('Error in search:', searchError)
        setError('Error al realizar la búsqueda. Inténtalo de nuevo.')
        setResults([])
        setTotalDocs(0)
        setHasMore(false)
        setCurrentPage(1)
      } finally {
        setLoading(false)
      }
    },
    [initialResults, limit],
  )

  // Efecto para búsqueda con debounce
  useEffect(() => {
    const abortController = new AbortController()

    performSearch(debouncedQuery)

    return () => {
      abortController.abort()
    }
  }, [debouncedQuery, performSearch])

  // Función para cargar más resultados
  const loadMore = useCallback(async () => {
    if (!query.trim() || loadingMore) return

    setLoadingMore(true)
    setError(null)

    try {
      const response = await loadMoreSearchResults(query, results, currentPage + 1)
      setResults(response.docs)
      setHasMore(response.hasMore)
      setCurrentPage(currentPage + 1)
    } catch (searchError) {
      console.error('Error loading more results:', searchError)
      setError('Error al cargar más resultados. Inténtalo de nuevo.')
    } finally {
      setLoadingMore(false)
    }
  }, [query, results, currentPage, loadingMore])

  // Función para limpiar búsqueda
  const clearSearch = useCallback(() => {
    setQuery('')
    setResults(initialResults)
    setTotalDocs(0)
    setHasMore(false)
    setError(null)
    setCurrentPage(1)
    setLoading(false)
    setLoadingMore(false)
  }, [initialResults])

  // Función para reintentar búsqueda
  const retry = useCallback(() => {
    if (query.trim()) {
      performSearch(query)
    }
  }, [query, performSearch])

  return {
    query,
    results,
    loading,
    loadingMore,
    error,
    totalDocs,
    hasMore,
    currentPage,
    setQuery,
    clearSearch,
    retry,
    loadMore,
  }
}

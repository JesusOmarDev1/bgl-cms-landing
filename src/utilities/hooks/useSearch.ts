'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from './useDebounceWindowed'

export interface SearchFilters {
  types: string[]
  dateRange?: {
    from?: Date
    to?: Date
  }
}

export interface SearchState {
  query: string
  filters: SearchFilters
  isLoading: boolean
  hasSearched: boolean
}

export function useSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchState, setSearchState] = useState<SearchState>({
    query: searchParams.get('q') || '',
    filters: {
      types: searchParams.get('type')?.split(',').filter(Boolean) || ['all'],
    },
    isLoading: false,
    hasSearched: Boolean(searchParams.get('q')),
  })

  const debouncedQuery = useDebounce(searchState.query, 300)

  // Update URL when search state changes
  useEffect(() => {
    const params = new URLSearchParams()

    if (debouncedQuery) {
      params.set('q', debouncedQuery)
      setSearchState((prev) => ({ ...prev, hasSearched: true }))
    }

    if (searchState.filters.types.length > 0 && !searchState.filters.types.includes('all')) {
      params.set('type', searchState.filters.types.join(','))
    }

    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`
    router.push(newUrl)
  }, [debouncedQuery, searchState.filters, router])

  // Handle loading state
  useEffect(() => {
    if (searchState.query !== debouncedQuery) {
      setSearchState((prev) => ({ ...prev, isLoading: true }))
    } else {
      setSearchState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [searchState.query, debouncedQuery])

  const updateQuery = useCallback((query: string) => {
    setSearchState((prev) => ({ ...prev, query }))
  }, [])

  const updateFilters = useCallback((filters: Partial<SearchFilters>) => {
    setSearchState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }))
  }, [])

  const clearSearch = useCallback(() => {
    setSearchState({
      query: '',
      filters: { types: ['all'] },
      isLoading: false,
      hasSearched: false,
    })
  }, [])

  const addRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return

    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const updated = [query, ...recent.filter((q: string) => q !== query)].slice(0, 5)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }, [])

  const getRecentSearches = useCallback((): string[] => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]')
    } catch {
      return []
    }
  }, [])

  return {
    searchState,
    updateQuery,
    updateFilters,
    clearSearch,
    addRecentSearch,
    getRecentSearches,
    debouncedQuery,
  }
}

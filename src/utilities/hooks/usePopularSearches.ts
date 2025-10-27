'use client'
import { useState, useEffect, useCallback } from 'react'

interface PopularSearch {
  query: string
  count: number
}

// Búsquedas por defecto relacionadas con el negocio
const defaultSearches = [
  'Bascula Comercial',
  'Servicio de Mantenimiento',
  'Balanza Analitica',
  'Renta de Basculas',
  'Servicio de Calibracion',
  'Bascula Industrial',
  'Repuestos para Basculas',
  'Certificacion de Basculas',
]

export function usePopularSearches() {
  const [popularSearches, setPopularSearches] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [lastRecordedQuery, setLastRecordedQuery] = useState<string>('')

  useEffect(() => {
    // Obtener búsquedas recientes del localStorage
    const getRecentSearches = (): string[] => {
      try {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]')
      } catch {
        return []
      }
    }

    // Obtener estadísticas de búsquedas populares del localStorage
    const getPopularSearchStats = (): PopularSearch[] => {
      try {
        return JSON.parse(localStorage.getItem('popularSearchStats') || '[]')
      } catch {
        return []
      }
    }

    const recent = getRecentSearches()
    const popularStats = getPopularSearchStats()

    // Combinar búsquedas populares con las por defecto
    const combinedSearches = new Set<string>()

    // Agregar las más populares basadas en estadísticas
    popularStats
      .sort((a, b) => b.count - a.count)
      .slice(0, 4)
      .forEach((item) => combinedSearches.add(item.query))

    // Agregar búsquedas recientes (máximo 2)
    recent.slice(0, 2).forEach((query) => combinedSearches.add(query))

    // Completar con búsquedas por defecto si no hay suficientes
    defaultSearches.forEach((query) => {
      if (combinedSearches.size < 5) {
        combinedSearches.add(query)
      }
    })

    setPopularSearches(Array.from(combinedSearches).slice(0, 5))
    setRecentSearches(recent)
  }, [])

  // Función para registrar una búsqueda (memoizada para evitar re-renders)
  const recordSearch = useCallback(
    (query: string) => {
      if (!query.trim() || query === lastRecordedQuery) return

      setLastRecordedQuery(query)

      try {
        const stats = JSON.parse(
          localStorage.getItem('popularSearchStats') || '[]',
        ) as PopularSearch[]
        const existingIndex = stats.findIndex(
          (item) => item.query.toLowerCase() === query.toLowerCase(),
        )

        if (existingIndex >= 0) {
          stats[existingIndex].count += 1
        } else {
          stats.push({ query: query.trim(), count: 1 })
        }

        // Mantener solo las 20 búsquedas más populares
        const sortedStats = stats.sort((a, b) => b.count - a.count).slice(0, 20)
        localStorage.setItem('popularSearchStats', JSON.stringify(sortedStats))

        // Actualizar el estado
        const newPopular = new Set<string>()

        // Agregar las más populares
        sortedStats.slice(0, 4).forEach((item) => newPopular.add(item.query))

        // Agregar búsquedas recientes
        const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]')
        recent.slice(0, 2).forEach((q: string) => newPopular.add(q))

        // Completar con búsquedas por defecto
        defaultSearches.forEach((q) => {
          if (newPopular.size < 5) {
            newPopular.add(q)
          }
        })

        setPopularSearches(Array.from(newPopular).slice(0, 5))
      } catch (error) {
        console.error('Error recording search:', error)
      }
    },
    [lastRecordedQuery],
  )

  return {
    popularSearches,
    recentSearches,
    recordSearch,
  }
}

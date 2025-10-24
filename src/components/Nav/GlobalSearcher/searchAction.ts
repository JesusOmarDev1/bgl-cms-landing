'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { SearchResponse, SearchResult, CollectionSlug } from './types'
import { getSearchableCollections, getCollectionConfig, SEARCH_SETTINGS } from './config'
import {
  normalizeSearchText,
  createFlexiblePattern,
  createSearchConditions,
  transformToSearchResult,
  sortSearchResults,
  isValidSearchQuery,
  sanitizeSearchQuery,
} from './utils'

/**
 * Busca contenido en una colección específica con paginación
 */
async function searchInCollection(
  collection: CollectionSlug,
  query: string,
  flexiblePattern: string,
  limit: number,
  page: number = 1,
): Promise<{ results: SearchResult[]; totalDocs: number }> {
  try {
    const payload = await getPayload({ config: configPromise })
    const config = getCollectionConfig(collection)

    if (!config) {
      console.warn(`No configuration found for collection: ${collection}`)
      return { results: [], totalDocs: 0 }
    }

    const searchConditions = createSearchConditions(query, flexiblePattern, collection)

    const response = await payload.find({
      collection,
      where: searchConditions,
      limit,
      page,
      sort: '-updatedAt',
      depth: 0,
      select: config.selectFields,
    })

    const transformedResults = response.docs.map((doc) =>
      transformToSearchResult(doc as unknown as Record<string, unknown>, collection),
    )

    return {
      results: transformedResults,
      totalDocs: response.totalDocs,
    }
  } catch (error) {
    console.error(`Error searching in collection ${collection}:`, error)
    return { results: [], totalDocs: 0 }
  }
}

/**
 * Función principal de búsqueda que busca en todas las colecciones
 */
export async function searchContent(
  rawQuery: string,
  limit: number = SEARCH_SETTINGS.defaultLimit,
  page: number = 1,
): Promise<SearchResponse> {
  // Validar y limpiar la consulta
  const query = sanitizeSearchQuery(rawQuery)

  if (!isValidSearchQuery(query)) {
    return { docs: [], totalDocs: 0, hasMore: false, limit }
  }

  try {
    const normalizedQuery = normalizeSearchText(query)
    const flexiblePattern = createFlexiblePattern(normalizedQuery)
    const collections = getSearchableCollections() as CollectionSlug[]

    const allResults: SearchResult[] = []
    let totalDocs = 0

    // Calcular límite por colección
    const limitPerCollection = Math.ceil(limit / collections.length) + 2

    // Buscar en paralelo en todas las colecciones
    const searchPromises = collections.map((collection) =>
      searchInCollection(collection, query, flexiblePattern, limitPerCollection, page),
    )

    const searchResults = await Promise.allSettled(searchPromises)

    // Procesar resultados
    searchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allResults.push(...result.value.results)
        totalDocs += result.value.totalDocs
      } else {
        console.error(`Search failed for collection ${collections[index]}:`, result.reason)
      }
    })

    // Ordenar por relevancia y limitar resultados
    const sortedResults = sortSearchResults(allResults, query).slice(0, limit)

    const totalPages = Math.ceil(totalDocs / limit)

    return {
      docs: sortedResults,
      totalDocs,
      hasMore: totalDocs > sortedResults.length,
      limit,
      page,
      totalPages,
    }
  } catch (error) {
    console.error('Error in searchContent:', error)
    return { docs: [], totalDocs: 0, hasMore: false, limit }
  }
}

/**
 * Función para cargar más resultados de búsqueda
 */
export async function loadMoreSearchResults(
  query: string,
  currentResults: SearchResult[],
  page: number,
): Promise<SearchResponse> {
  const response = await searchContent(query, SEARCH_SETTINGS.loadMoreIncrement, page)

  // Combinar resultados existentes con los nuevos, evitando duplicados
  const existingIds = new Set(currentResults.map((r) => r.id))
  const newResults = response.docs.filter((r) => !existingIds.has(r.id))

  return {
    ...response,
    docs: [...currentResults, ...newResults],
  }
}

/**
 * Obtiene resultados iniciales recientes de todas las colecciones
 */
export async function getInitialResults(): Promise<SearchResult[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const collections = getSearchableCollections() as CollectionSlug[]
    const allResults: SearchResult[] = []

    // Obtener documentos recientes de cada colección
    const fetchPromises = collections.map(async (collection) => {
      try {
        const config = getCollectionConfig(collection)
        if (!config) return []

        const response = await payload.find({
          collection,
          limit: SEARCH_SETTINGS.initialResultsPerCollection,
          sort: '-updatedAt',
          depth: 0,
          select: config.selectFields,
        })

        return response.docs.map((doc) =>
          transformToSearchResult(doc as unknown as Record<string, unknown>, collection),
        )
      } catch (error) {
        console.error(`Error fetching initial results from ${collection}:`, error)
        return []
      }
    })

    const results = await Promise.allSettled(fetchPromises)

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allResults.push(...result.value)
      }
    })

    // Ordenar por fecha y limitar
    return allResults
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, SEARCH_SETTINGS.maxInitialResults)
  } catch (error) {
    console.error('Error fetching initial results:', error)
    return []
  }
}

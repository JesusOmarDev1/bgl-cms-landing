import type { SearchConditions, SearchResult, CollectionSlug } from './types'
import { ACCENT_MAP, getCollectionConfig } from './config'

/**
 * Normaliza el texto de búsqueda removiendo acentos y caracteres especiales
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Crea un patrón flexible para búsqueda con acentos
 */
export function createFlexiblePattern(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map((char) => ACCENT_MAP[char] || char)
    .join('')
}

/**
 * Crea las condiciones de búsqueda para una colección específica
 */
export function createSearchConditions(
  query: string,
  flexiblePattern: string,
  collection: CollectionSlug,
): SearchConditions {
  const config = getCollectionConfig(collection)
  if (!config) {
    throw new Error(`No search configuration found for collection: ${collection}`)
  }

  const conditions: Record<string, unknown>[] = []

  // Crear condiciones para cada campo de búsqueda configurado
  config.searchFields.forEach((field) => {
    conditions.push({ [field]: { like: query } }, { [field]: { like: flexiblePattern } })
  })

  return { or: conditions } as SearchConditions
}

/**
 * Transforma un documento de Payload a SearchResult
 */
export function transformToSearchResult(
  doc: Record<string, unknown>,
  collection: CollectionSlug,
): SearchResult {
  const baseResult = {
    id: String(doc.id),
    title: (doc.title as string) || 'Sin título',
    slug: doc.slug as string | undefined,
    meta: doc.meta || null,
    collection,
    updatedAt: (doc.updatedAt as string) || new Date().toISOString(),
  }

  // Agregar campos específicos por colección
  switch (collection) {
    case 'posts':
      return {
        ...baseResult,
        collection: 'posts',
        publishedAt: (doc.publishedAt as string) || null,
        categories: (doc.categories as Array<{ id: string | number; title: string }>) || null,
      }

    case 'products':
      return {
        ...baseResult,
        collection: 'products',
        brand: (doc.brand as string) || null,
        model: (doc.model as string) || null,
        stock: doc.stock as string | number | null,
        description: (doc.description as string) || null,
      }

    case 'manuals':
      return {
        ...baseResult,
        collection: 'manuals',
        description: (doc.description as string) || null,
      }

    case 'services':
      return {
        ...baseResult,
        collection: 'services',
        description: (doc.description as string) || null,
      }

    case 'pages':
      return {
        ...baseResult,
        collection: 'pages',
        description: (doc.description as string) || null,
      }

    case 'suppliers':
      return {
        ...baseResult,
        collection: 'suppliers',
        description: (doc.description as string) || null,
      }

    case 'clients':
      return {
        ...baseResult,
        collection: 'clients',
        description: (doc.description as string) || null,
      }

    default:
      return baseResult as SearchResult
  }
}

/**
 * Calcula la relevancia de un resultado basado en la consulta
 */
export function calculateRelevance(result: SearchResult, query: string): number {
  const queryLower = query.toLowerCase()
  const titleLower = result.title.toLowerCase()

  let score = 0

  // Coincidencia exacta en título (mayor puntuación)
  if (titleLower === queryLower) score += 100
  // Título comienza con la consulta
  else if (titleLower.startsWith(queryLower)) score += 50
  // Título contiene la consulta
  else if (titleLower.includes(queryLower)) score += 25

  // Coincidencia en slug
  if (result.slug?.toLowerCase().includes(queryLower)) score += 10

  // Coincidencia en meta descripción
  if (result.meta?.description?.toLowerCase().includes(queryLower)) score += 5

  // Bonificación por fecha reciente (últimos 30 días)
  const daysSinceUpdate =
    (Date.now() - new Date(result.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
  if (daysSinceUpdate <= 30) score += Math.max(0, 10 - daysSinceUpdate / 3)

  return score
}

/**
 * Ordena los resultados por relevancia y fecha
 */
export function sortSearchResults(results: SearchResult[], query: string): SearchResult[] {
  return results.sort((a, b) => {
    const relevanceA = calculateRelevance(a, query)
    const relevanceB = calculateRelevance(b, query)

    // Primero por relevancia
    if (relevanceA !== relevanceB) {
      return relevanceB - relevanceA
    }

    // Luego por fecha de actualización
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

/**
 * Agrupa los resultados por colección
 */
export function groupResultsByCollection(results: SearchResult[]): Record<string, SearchResult[]> {
  return results.reduce(
    (acc, result) => {
      const collection = result.collection
      if (!acc[collection]) {
        acc[collection] = []
      }
      acc[collection].push(result)
      return acc
    },
    {} as Record<string, SearchResult[]>,
  )
}

/**
 * Valida si una cadena es una consulta de búsqueda válida
 */
export function isValidSearchQuery(query: string): boolean {
  return query.trim().length >= 2
}

/**
 * Limpia y valida una consulta de búsqueda
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().slice(0, 100) // Limitar a 100 caracteres
}

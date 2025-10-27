import type { Where } from 'payload'
import type { SEARCHABLE_COLLECTIONS } from './config'

// Tipos generados automáticamente a partir de la configuración
export type CollectionSlug = keyof typeof SEARCHABLE_COLLECTIONS

// Resultado de búsqueda simplificado y escalable
export interface SearchResult {
  id: string
  title: string
  slug?: string
  collection: CollectionSlug
  updatedAt: string
}

// Respuesta de búsqueda
export interface SearchResponse {
  docs: SearchResult[]
  totalDocs: number
  hasMore: boolean
  limit: number
  page?: number
  totalPages?: number
}

// Parámetros de búsqueda paginada
export interface SearchParams {
  query: string
  limit?: number
  page?: number
  collections?: CollectionSlug[]
}

// Configuración de búsqueda por colección (generada automáticamente)
export interface CollectionSearchConfig {
  slug: string
  label: string
  searchFields: string[]
  selectFields: Record<string, boolean>
}

// Condiciones de búsqueda
export type SearchConditions = Where

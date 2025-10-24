import type { Where } from 'payload'

// Tipos específicos para las colecciones
export type CollectionSlug =
  | 'posts'
  | 'products'
  | 'manuals'
  | 'services'
  | 'pages'
  | 'suppliers'
  | 'clients'

// Metadatos específicos por tipo
export interface SearchMeta {
  title?: string | null
  description?: string | null
  image?:
    | {
        id: string | number
        url?: string
        alt?: string
      }
    | string
    | number
    | null
}

// Resultado de búsqueda base
export interface BaseSearchResult {
  id: string
  title: string
  slug?: string
  meta?: SearchMeta | null
  collection: CollectionSlug
  updatedAt: string
}

// Extensiones específicas por colección
export interface PostSearchResult extends BaseSearchResult {
  collection: 'posts'
  publishedAt?: string | null
  categories?: Array<{
    id: string | number
    title: string
  }> | null
}

export interface ProductSearchResult extends BaseSearchResult {
  collection: 'products'
  brand?: string | null
  model?: string | null
  stock?: string | number | null
  description?: string | null
}

export interface ManualSearchResult extends BaseSearchResult {
  collection: 'manuals'
  description?: string | null
}

export interface ServiceSearchResult extends BaseSearchResult {
  collection: 'services'
  description?: string | null
}

export interface PageSearchResult extends BaseSearchResult {
  collection: 'pages'
  description?: string | null
}

export interface SupplierSearchResult extends BaseSearchResult {
  collection: 'suppliers'
  description?: string | null
}
export interface ClientSearchResult extends BaseSearchResult {
  collection: 'clients'
  description?: string | null
}

// Unión de todos los tipos de resultados
export type SearchResult =
  | PostSearchResult
  | ProductSearchResult
  | ManualSearchResult
  | ServiceSearchResult
  | PageSearchResult
  | SupplierSearchResult
  | ClientSearchResult

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

// Configuración de búsqueda por colección
export interface CollectionSearchConfig {
  slug: CollectionSlug
  label: string
  searchFields: string[]
  selectFields: Record<string, boolean>
  icon?: string
}

// Condiciones de búsqueda
export type SearchConditions = Where

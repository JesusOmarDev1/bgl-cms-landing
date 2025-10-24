import type { CollectionSearchConfig } from './types'

// Configuración de colecciones buscables
export const SEARCH_CONFIG: Record<string, CollectionSearchConfig> = {
  posts: {
    slug: 'posts',
    label: 'Publicaciones',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
      publishedAt: true,
      categories: true,
    },
  },
  products: {
    slug: 'products',
    label: 'Productos',
    searchFields: ['title', 'brand', 'model', 'meta.title', 'meta.description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
      brand: true,
      model: true,
      stock: true,
      description: true,
    },
  },
  manuals: {
    slug: 'manuals',
    label: 'Manuales',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description', 'description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
      description: true,
    },
  },
  services: {
    slug: 'services',
    label: 'Servicios',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description', 'description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
      description: true,
    },
  },
  pages: {
    slug: 'pages',
    label: 'Páginas',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
    },
  },
  clients: {
    slug: 'clients',
    label: 'Clientes',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
    },
  },
  suppliers: {
    slug: 'suppliers',
    label: 'Proveedores',
    searchFields: ['title', 'slug', 'meta.title', 'meta.description'] as string[],
    selectFields: {
      id: true,
      title: true,
      slug: true,
      meta: true,
      updatedAt: true,
    },
  },
} as const

// Configuración general de búsqueda
export const SEARCH_SETTINGS = {
  debounceMs: 300,
  defaultLimit: 8, // Reducido para mostrar menos resultados inicialmente
  initialResultsPerCollection: 2, // Menos resultados iniciales por colección
  maxInitialResults: 6, // Menos resultados iniciales totales
  loadMoreIncrement: 10, // Cuántos más cargar al hacer "Ver más"
  maxSearchResults: 50, // Máximo de resultados en búsqueda en tiempo real
} as const

// Mapeo de acentos para búsqueda flexible
export const ACCENT_MAP: Record<string, string> = {
  a: '[aáàäâã]',
  e: '[eéèëê]',
  i: '[iíìïî]',
  o: '[oóòöôõ]',
  u: '[uúùüû]',
  n: '[nñ]',
  c: '[cç]',
} as const

// Obtener todas las colecciones configuradas
export const getSearchableCollections = () => Object.keys(SEARCH_CONFIG)

// Obtener configuración de una colección específica
export const getCollectionConfig = (collection: string) => SEARCH_CONFIG[collection]

// Obtener etiquetas de colecciones para el UI
export const getCollectionLabels = () =>
  Object.fromEntries(Object.entries(SEARCH_CONFIG).map(([key, config]) => [key, config.label]))

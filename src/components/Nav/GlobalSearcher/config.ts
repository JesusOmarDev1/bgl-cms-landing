export const SEARCHABLE_COLLECTIONS = {
  posts: 'Publicaciones',
  products: 'Productos',
  manuals: 'Manuales',
  services: 'Servicios',
  pages: 'Páginas',
  clients: 'Clientes',
  suppliers: 'Proveedores',
  forms: 'Formularios',
} as const

// Configuración automática generada a partir de SEARCHABLE_COLLECTIONS
export const SEARCH_CONFIG = Object.fromEntries(
  Object.entries(SEARCHABLE_COLLECTIONS).map(([slug, label]) => [
    slug,
    {
      slug,
      label,
      searchFields: ['title'],
      selectFields: {
        id: true,
        title: true,
        slug: true,
        updatedAt: true,
      },
    },
  ]),
)

// Configuración general de búsqueda
export const SEARCH_SETTINGS = {
  debounceMs: 300,
  defaultLimit: 8, // Reducido para mostrar menos resultados inicialmente
  initialResultsPerCollection: 3, // Menos resultados iniciales por colección
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

// Funciones de utilidad escalables
export const getSearchableCollections = () => Object.keys(SEARCHABLE_COLLECTIONS)

export const getCollectionConfig = (collection: string) => SEARCH_CONFIG[collection]

export const getCollectionLabels = () => SEARCHABLE_COLLECTIONS

// Función para agregar nuevas colecciones fácilmente
export const isValidCollection = (
  collection: string,
): collection is keyof typeof SEARCHABLE_COLLECTIONS => {
  return collection in SEARCHABLE_COLLECTIONS
}

import { FC, Suspense } from 'react'
import { Payload } from 'payload'
import { SearchDialog } from './SearchDialog'
import { getInitialResults } from './searchAction'
import { Skeleton } from '@/components/ui/skeleton'

interface GlobalSearcherProps {
  payload: Payload
}

/**
 * Componente de carga para el buscador usando Skeleton de shadcn/ui
 */
const SearcherSkeleton = () => (
  <div className="flex h-9 items-center gap-1.5 border mb-4 rounded-3xl border-zinc-200 dark:border-zinc-800 px-3">
    <Skeleton className="size-4 shrink-0" />
    <Skeleton className="h-4 flex-1 max-w-32" />
    <Skeleton className="h-5 w-8 ml-auto" />
  </div>
)

/**
 * Componente interno que maneja la carga de datos
 */
const SearcherContent: FC = async () => {
  try {
    const initialResults = await getInitialResults()
    return <SearchDialog initialResults={initialResults} />
  } catch (error) {
    console.error('Error loading initial search results:', error)
    // Fallback con resultados vacíos
    return <SearchDialog initialResults={[]} />
  }
}

/**
 * Componente principal del buscador global
 * Proporciona una interfaz de búsqueda unificada para todas las colecciones
 */
export const GlobalSearcher: FC<GlobalSearcherProps> = ({ payload: _payload }) => {
  return (
    <Suspense fallback={<SearcherSkeleton />}>
      <SearcherContent />
    </Suspense>
  )
}

export default GlobalSearcher

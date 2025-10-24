import { SearchX } from 'lucide-react'
import { Empty, EmptyContent, EmptyTitle, EmptyDescription } from '../ui/empty'

export default function NoSearchResults() {
  return (
    <Empty>
      <div className="flex flex-col items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <SearchX className="size-6 text-muted-foreground" />
        </div>
        <EmptyTitle className="text-base font-medium" role="log">
          No se encontraron resultados
        </EmptyTitle>
        <EmptyDescription className="text-sm text-center max-w-sm">
          Intenta ajustar tu búsqueda o usar términos diferentes
        </EmptyDescription>
      </div>
    </Empty>
  )
}

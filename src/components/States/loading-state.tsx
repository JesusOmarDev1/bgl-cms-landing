import { Loader2 } from 'lucide-react'
import { Empty, EmptyTitle, EmptyDescription } from '../ui/empty'
import { Skeleton } from '../ui/skeleton'

interface LoadingStateProps {
  title?: string
  description?: string
  showSkeleton?: boolean
}

export default function LoadingState({
  title = 'Cargando...',
  description = 'Por favor espera mientras cargamos el contenido',
  showSkeleton = false,
}: LoadingStateProps) {
  if (showSkeleton) {
    return (
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Empty>
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="size-6 text-primary animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <EmptyTitle className="text-base font-medium" role="status" aria-live="polite">
            {title}
          </EmptyTitle>
          <EmptyDescription className="text-sm max-w-sm">{description}</EmptyDescription>
        </div>
      </div>
    </Empty>
  )
}

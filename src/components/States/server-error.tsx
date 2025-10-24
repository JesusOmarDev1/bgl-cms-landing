import { ServerCrash } from 'lucide-react'
import { Empty, EmptyContent, EmptyTitle, EmptyDescription } from '../ui/empty'
import { Button } from '../ui/button'

interface ServerErrorProps {
  onRetry?: () => void
  title?: string
  description?: string
}

export default function ServerError({
  onRetry,
  title = 'Error del servidor',
  description = 'Algo salió mal en nuestros servidores. Por favor, inténtalo de nuevo más tarde.',
}: ServerErrorProps) {
  return (
    <Empty>
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <ServerCrash className="size-6 text-destructive" />
        </div>
        <div className="text-center space-y-2">
          <EmptyTitle className="text-base font-medium text-destructive" role="alert">
            {title}
          </EmptyTitle>
          <EmptyDescription className="text-sm max-w-sm">{description}</EmptyDescription>
        </div>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Reintentar
          </Button>
        )}
      </div>
    </Empty>
  )
}

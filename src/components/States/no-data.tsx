import { Database } from 'lucide-react'
import { Empty, EmptyContent, EmptyTitle, EmptyDescription } from '../ui/empty'
import { Button } from '../ui/button'

interface NoDataProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function NoData({
  title = 'No hay datos disponibles',
  description = 'No se encontraron elementos para mostrar en este momento.',
  actionLabel,
  onAction,
}: NoDataProps) {
  return (
    <Empty>
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <Database className="size-6 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <EmptyTitle className="text-base font-medium" role="status">
            {title}
          </EmptyTitle>
          <EmptyDescription className="text-sm max-w-sm">{description}</EmptyDescription>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} size="sm">
            {actionLabel}
          </Button>
        )}
      </div>
    </Empty>
  )
}

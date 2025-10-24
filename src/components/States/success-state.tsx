import { CheckCircle } from 'lucide-react'
import { Empty, EmptyTitle, EmptyDescription } from '../ui/empty'
import { Button } from '../ui/button'

interface SuccessStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export default function SuccessState({
  title = '¡Operación exitosa!',
  description = 'La acción se completó correctamente.',
  actionLabel,
  onAction,
}: SuccessStateProps) {
  return (
    <Empty>
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <CheckCircle className="size-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="text-center space-y-2">
          <EmptyTitle
            className="text-base font-medium text-green-700 dark:text-green-300"
            role="status"
          >
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

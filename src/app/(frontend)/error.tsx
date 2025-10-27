'use client'

import { Button } from '@/components/ui/button'
import { StaticLogo } from '@/components/Logo/StaticLogo'
import { Badge } from '@/components/ui/badge'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 w-full h-dvh -mt-36">
      <StaticLogo className="size-24" />
      <Badge>Error</Badge>
      <h2>Lo sentimos, algo salió mal.</h2>
      <Button onClick={() => reset()}>Intenta de nuevo</Button>
    </div>
  )
}

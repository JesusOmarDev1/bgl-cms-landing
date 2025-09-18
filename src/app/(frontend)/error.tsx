'use client'

import { Button } from '@/components/ui/button'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 w-full h-dvh">
      <h1>Error</h1>
      <h2>Lo sentimos, algo salió mal.</h2>
      <Button onClick={() => reset()}>Intenta de nuevo</Button>
    </div>
  )
}

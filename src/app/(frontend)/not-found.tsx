import { Link } from 'next-view-transitions'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4 -mt-24 h-dvh w-full">
      <div className="max-w-2xl mx-auto text-center">
        <div>
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-4">Página no encontrada</h2>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. Te ayudamos a encontrar lo
            que necesitas.
          </p>
        </div>

        <div className="space-y-2">
          <Button asChild size="lg">
            <Link prefetch href="/">
              Volver al inicio
            </Link>
          </Button>

          <p className="text-sm tetx-zinc-500">
            ¿Necesitas ayuda? Contacta con nuestro{' '}
            <Link prefetch href={'/support'} className="underline hover:text-primary">
              equipo de soporte técnico
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

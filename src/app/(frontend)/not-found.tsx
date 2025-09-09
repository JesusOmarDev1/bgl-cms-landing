import { Link } from 'next-view-transitions'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Message */}
        <div>
          <h1 className="text-8xl font-bold text-zinc-800 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-zinc-700 mb-4">Página no encontrada</h2>
          <p className="text-lg text-zinc-600 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida. Te ayudamos a encontrar lo
            que necesitas.
          </p>
        </div>

        {/* Main CTA */}
        <div className="space-y-2">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <Link href="/">Volver al inicio</Link>
          </Button>

          <p className="text-sm text-slate-500">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte técnico
          </p>
        </div>
      </div>
    </div>
  )
}

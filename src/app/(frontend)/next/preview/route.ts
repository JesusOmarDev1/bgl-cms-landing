import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('No tienes permiso para obtener una vista previa de esta página.', {
      status: 403,
    })
  }

  if (!path || !collection || !slug) {
    return new Response('Parámetros de búsqueda insuficientes. Recarga la pagina de nuevo.', {
      status: 404,
    })
  }

  if (!path.startsWith('/')) {
    return new Response('Este punto final solo se puede utilizar para vistas previas relativas', {
      status: 500,
    })
  }

  let user

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
  } catch (error) {
    payload.logger.error({ err: error }, 'Error al verificar el token para la vista previa en vivo')
    return new Response('No tienes permiso para obtener una vista previa de esta página.', {
      status: 403,
    })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('No tienes permiso para obtener una vista previa de esta página.', {
      status: 403,
    })
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable()

  redirect(path)
}

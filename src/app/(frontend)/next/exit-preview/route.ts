import { draftMode } from 'next/headers'

export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  return new Response('El modo borrador está deshabilitado')
}

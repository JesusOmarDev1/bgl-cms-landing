import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()

  // Verificar si el cliente soporta Brotli
  const acceptEncoding = request.headers.get('accept-encoding') || ''

  // Agregar headers de compresión
  if (acceptEncoding.includes('br')) {
    response.headers.set('Accept-Encoding', 'br, gzip, deflate')
  }

  // Headers adicionales para optimización
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

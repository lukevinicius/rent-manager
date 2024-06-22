import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const user = JSON.parse(cookies().get('session')?.value || '{}')

  if (request.nextUrl.pathname === '/auth/login') {
    return NextResponse.next()
  }

  if (!user.id) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

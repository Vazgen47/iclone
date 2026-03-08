import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// Authentication middleware for admin routes
export function middleware(request) {
  const { pathname } = request.nextUrl

  // Check if trying to access admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check authentication in localStorage (this will be checked on client side)
    // For now, allow the request to continue and let client handle auth
    return NextResponse.next()
  }

  // Allow all other routes
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session_token')?.value;

  // Protect all /admin/* pages — redirect to login if no session cookie present
  if (pathname.startsWith('/admin')) {
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect already-logged-in users away from login/signup pages
  if ((pathname === '/login' || pathname === '/signup') && sessionToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match admin pages, login, and signup — skip API routes and static files
  matcher: ['/admin/:path*', '/login', '/signup'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Main domain from environment variable
const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'kutubxona.uz';

// Next.js 16+ requires either named "proxy" export or default export
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Extract subdomain
  const subdomain = extractSubdomain(hostname, MAIN_DOMAIN);

  // Create response
  const response = NextResponse.next();

  // Attach subdomain to response headers for use in app
  if (subdomain) {
    response.headers.set('x-subdomain', subdomain);
  }

  // For site-specific routes, verify site exists and is active
  // Skip for admin routes and API routes
  if (subdomain && !pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    // Note: In production, you'd verify the site exists in DB here
    // For now, we'll handle it in the page components to avoid DB calls in middleware
    response.headers.set('x-site-context', 'true');
  }

  // Protected admin routes
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Superadmin can access from any domain
    // Site admins must access from their site's subdomain
    // This will be enforced at the API level
  }

  // Protected profile routes
  if (pathname.startsWith('/profile')) {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

// Extract subdomain from hostname
function extractSubdomain(hostname: string, mainDomain: string): string | null {
  // Remove port if present
  const host = hostname.split(':')[0];
  
  // For localhost development
  if (host === 'localhost' || host === '127.0.0.1') {
    return null;
  }

  // Check if hostname ends with main domain
  if (!host.endsWith(mainDomain)) {
    return null;
  }

  // Remove main domain to get subdomain
  const subdomain = host.replace(`.${mainDomain}`, '');
  
  // If subdomain equals hostname or main domain, there's no subdomain
  if (subdomain === host || subdomain === mainDomain || subdomain === '') {
    return null;
  }

  return subdomain;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};

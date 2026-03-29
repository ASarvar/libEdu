import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession, User } from './auth';
import { rateLimiter, getClientIP, RATE_LIMITS } from './rate-limit';
import { validateCsrfRequest } from './csrf';
import { hasAnyRole, UserRole } from './roles';

/**
 * Verify admin authentication for API routes
 * @param allowedRoles - Array of roles that can access this endpoint
 * @returns User object if authenticated and authorized, null otherwise
 */
export async function verifyAdminAuth(
  allowedRoles: UserRole[] = ['superadmin', 'admin']
): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  if (!sessionToken) {
    return null;
  }

  const user = await verifySession(sessionToken);
  
  if (!user || !hasAnyRole(user.role, allowedRoles)) {
    return null;
  }

  return user;
}

/**
 * Higher-order function to protect API routes with authentication
 * @param handler - The API route handler
 * @param options - Configuration options
 */
export function withAuth(
  handler: (request: NextRequest, user: User) => Promise<NextResponse>,
  options: {
    allowedRoles?: UserRole[];
    requireActive?: boolean;
  } = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const { allowedRoles = ['superadmin', 'admin'], requireActive = true } = options;

    if (!validateCsrfRequest(request)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'CSRF validation failed' },
        { status: 403 }
      );
    }

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No session token provided' },
        { status: 401 }
      );
    }

    const user = await verifySession(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (requireActive && !user.is_active) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Account is not active' },
        { status: 403 }
      );
    }

    if (!hasAnyRole(user.role, allowedRoles)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request, user);
  };
}

/**
 * Apply rate limiting to API routes
 * @param key - Unique identifier for rate limiting (e.g., IP or email)
 * @param config - Rate limit configuration
 * @returns NextResponse with 429 status if rate limit exceeded, null otherwise
 */
export function checkRateLimit(
  key: string,
  config: { maxRequests: number; windowMs: number }
): Promise<NextResponse | null> {
  return (async () => {
    const isLimited = await rateLimiter.check(key, config.maxRequests, config.windowMs);

    if (isLimited) {
      const resetTime = await rateLimiter.getResetTime(key);
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(resetTime / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(resetTime / 1000).toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + resetTime).toISOString(),
          },
        }
      );
    }

    return null;
  })();
}

/**
 * Higher-order function to add rate limiting to API routes
 */
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: { maxRequests: number; windowMs: number } = RATE_LIMITS.API
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const ip = getClientIP(request.headers);
    const rateLimitResponse = await checkRateLimit(ip, config);

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    return handler(request);
  };
}

/**
 * Combined auth + rate limiting wrapper
 */
export function withAuthAndRateLimit(
  handler: (request: NextRequest, user: User) => Promise<NextResponse>,
  options: {
    allowedRoles?: UserRole[];
    requireActive?: boolean;
    rateLimit?: { maxRequests: number; windowMs: number };
  } = {}
) {
  const {
    allowedRoles = ['superadmin', 'admin'],
    requireActive = true,
    rateLimit = RATE_LIMITS.API,
  } = options;

  return async (request: NextRequest): Promise<NextResponse> => {
    if (!validateCsrfRequest(request)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'CSRF validation failed' },
        { status: 403 }
      );
    }

    // Check rate limit first
    const ip = getClientIP(request.headers);
    const rateLimitResponse = await checkRateLimit(ip, rateLimit);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Then check auth
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No session token provided' },
        { status: 401 }
      );
    }

    const user = await verifySession(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (requireActive && !user.is_active) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Account is not active' },
        { status: 403 }
      );
    }

    if (!hasAnyRole(user.role, allowedRoles)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request, user);
  };
}

/**
 * Combined auth + rate limiting wrapper for dynamic routes with context params.
 */
export function withAuthAndRateLimitWithContext<TContext>(
  handler: (request: NextRequest, user: User, context: TContext) => Promise<NextResponse>,
  options: {
    allowedRoles?: UserRole[];
    requireActive?: boolean;
    rateLimit?: { maxRequests: number; windowMs: number };
  } = {}
) {
  const {
    allowedRoles = ['superadmin', 'admin'],
    requireActive = true,
    rateLimit = RATE_LIMITS.API,
  } = options;

  return async (request: NextRequest, context: TContext): Promise<NextResponse> => {
    if (!validateCsrfRequest(request)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'CSRF validation failed' },
        { status: 403 }
      );
    }

    // Check rate limit first
    const ip = getClientIP(request.headers);
    const rateLimitResponse = await checkRateLimit(ip, rateLimit);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Then check auth
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No session token provided' },
        { status: 401 }
      );
    }

    const user = await verifySession(sessionToken);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    if (requireActive && !user.is_active) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Account is not active' },
        { status: 403 }
      );
    }

    if (!hasAnyRole(user.role, allowedRoles)) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    return handler(request, user, context);
  };
}

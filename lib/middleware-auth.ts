import { NextRequest } from 'next/server';
import { query } from './db';
import { hasAnyRole, UserRole } from './roles';

export interface MiddlewareUser {
  id: string;
  role: UserRole;
  is_active: boolean;
}

/**
 * Verify session and get user in middleware context
 * Lightweight version of verifySession for middleware use
 */
export async function verifySessionMiddleware(
  sessionToken: string
): Promise<MiddlewareUser | null> {
  try {
    const result = await query(
      `SELECT u.id, u.role, u.is_active
       FROM users u
       INNER JOIN sessions s ON u.id = s.user_id
       WHERE s.session_token = $1 AND s.expires_at > CURRENT_TIMESTAMP AND u.is_active = true`,
      [sessionToken]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Middleware auth error:', error);
    return null;
  }
}

/**
 * Check if user has required role(s)
 */
export function hasRole(
  user: MiddlewareUser,
  allowedRoles: UserRole[]
): boolean {
  return hasAnyRole(user.role, allowedRoles);
}

/**
 * Get session token from request
 */
export function getSessionToken(request: NextRequest): string | null {
  return request.cookies.get('session_token')?.value || null;
}

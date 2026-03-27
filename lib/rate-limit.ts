/**
 * Simple in-memory rate limiter for authentication endpoints
 * For production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  /**
   * Check if request should be rate limited
   * @param key - Identifier (usually IP address or email)
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns true if rate limit exceeded, false otherwise
   */
  check(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired entry
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return false;
    }

    if (entry.count >= maxRequests) {
      return true; // Rate limit exceeded
    }

    entry.count++;
    return false;
  }

  /**
   * Get remaining time until rate limit reset
   */
  getResetTime(key: string): number {
    const entry = this.limits.get(key);
    if (!entry) return 0;
    return Math.max(0, entry.resetTime - Date.now());
  }

  /**
   * Get current request count for a key
   */
  getCount(key: string): number {
    const entry = this.limits.get(key);
    return entry?.count || 0;
  }

  /**
   * Manually reset rate limit for a key
   */
  reset(key: string): void {
    this.limits.delete(key);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Clear all rate limits (useful for testing)
   */
  clear(): void {
    this.limits.clear();
  }

  /**
   * Cleanup on shutdown
   */
  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.limits.clear();
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Preset configurations
export const RATE_LIMITS = {
  // Login: 5 attempts per 15 minutes per IP
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  },
  // Register: 3 attempts per hour per IP
  REGISTER: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
  },
  // Password reset: 3 attempts per hour per email
  PASSWORD_RESET: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
  },
  // API: 100 requests per minute per IP
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000,
  },
};

/**
 * Get client IP address from request
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}

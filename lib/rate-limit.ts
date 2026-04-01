/**
 * Rate limiter with optional Redis REST backend and in-memory fallback.
 * Configure Redis via REDIS_REST_URL and REDIS_REST_TOKEN.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;
  private redisRestUrl: string | null;
  private redisRestToken: string | null;
  private redisPrefix: string;

  constructor() {
    this.redisRestUrl = process.env.REDIS_REST_URL || null;
    this.redisRestToken = process.env.REDIS_REST_TOKEN || null;
    this.redisPrefix = process.env.REDIS_KEY_PREFIX || 'libedu:ratelimit';

    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  private get hasRedisBackend(): boolean {
    return Boolean(this.redisRestUrl && this.redisRestToken);
  }

  private getRedisKey(key: string): string {
    return `${this.redisPrefix}:${key}`;
  }

  private async runRedisPipeline(commands: Array<Array<string | number>>): Promise<any[]> {
    const response = await fetch(`${this.redisRestUrl}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.redisRestToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Redis pipeline failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Redis pipeline response is not an array');
    }

    return data;
  }

  private parseRedisResult<T>(entry: any, fallback: T): T {
    if (!entry || typeof entry !== 'object') {
      return fallback;
    }
    if ('error' in entry && entry.error) {
      throw new Error(String(entry.error));
    }
    if (!('result' in entry)) {
      return fallback;
    }
    return entry.result as T;
  }

  private async checkWithRedis(key: string, maxRequests: number, windowMs: number): Promise<boolean> {
    const redisKey = this.getRedisKey(key);

    const [incrEntry, ttlEntry] = await this.runRedisPipeline([
      ['INCR', redisKey],
      ['PTTL', redisKey],
    ]);

    const count = Number(this.parseRedisResult<number | string>(incrEntry, 1));
    let ttlMs = Number(this.parseRedisResult<number | string>(ttlEntry, -1));

    if (Number.isNaN(ttlMs) || ttlMs < 0) {
      await this.runRedisPipeline([
        ['PEXPIRE', redisKey, windowMs],
      ]);
      ttlMs = windowMs;
    }

    return count > maxRequests;
  }

  private async getResetTimeWithRedis(key: string): Promise<number> {
    const redisKey = this.getRedisKey(key);
    const [ttlEntry] = await this.runRedisPipeline([
      ['PTTL', redisKey],
    ]);
    const ttlMs = Number(this.parseRedisResult<number | string>(ttlEntry, 0));
    return ttlMs > 0 ? ttlMs : 0;
  }

  private async getCountWithRedis(key: string): Promise<number> {
    const redisKey = this.getRedisKey(key);
    const [countEntry] = await this.runRedisPipeline([
      ['GET', redisKey],
    ]);
    const raw = this.parseRedisResult<string | number | null>(countEntry, null);
    if (raw === null || raw === undefined) {
      return 0;
    }
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  private async resetWithRedis(key: string): Promise<void> {
    const redisKey = this.getRedisKey(key);
    await this.runRedisPipeline([
      ['DEL', redisKey],
    ]);
  }

  /**
   * Check if request should be rate limited
   * @param key - Identifier (usually IP address or email)
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns true if rate limit exceeded, false otherwise
   */
  async check(key: string, maxRequests: number, windowMs: number): Promise<boolean> {
    if (this.hasRedisBackend) {
      try {
        return await this.checkWithRedis(key, maxRequests, windowMs);
      } catch (error) {
        console.error('Redis rate limit check failed, falling back to memory:', error);
      }
    }

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
  async getResetTime(key: string): Promise<number> {
    if (this.hasRedisBackend) {
      try {
        return await this.getResetTimeWithRedis(key);
      } catch (error) {
        console.error('Redis reset-time lookup failed, falling back to memory:', error);
      }
    }

    const entry = this.limits.get(key);
    if (!entry) return 0;
    return Math.max(0, entry.resetTime - Date.now());
  }

  /**
   * Get current request count for a key
   */
  async getCount(key: string): Promise<number> {
    if (this.hasRedisBackend) {
      try {
        return await this.getCountWithRedis(key);
      } catch (error) {
        console.error('Redis count lookup failed, falling back to memory:', error);
      }
    }

    const entry = this.limits.get(key);
    return entry?.count || 0;
  }

  /**
   * Manually reset rate limit for a key
   */
  async reset(key: string): Promise<void> {
    if (this.hasRedisBackend) {
      try {
        await this.resetWithRedis(key);
      } catch (error) {
        console.error('Redis reset failed, falling back to memory:', error);
      }
    }

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
  // Email verification resend: 3 attempts per hour per IP/email
  EMAIL_VERIFICATION_RESEND: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
  },
  // API: 100 requests per minute per IP
  API: {
    maxRequests: 100,
    windowMs: 60 * 1000,
  },
  // Contact form: 5 submissions per hour per IP
  CONTACT: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000,
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

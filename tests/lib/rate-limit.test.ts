import { describe, expect, it } from 'vitest';
import { rateLimiter } from '@/lib/rate-limit';

describe('rate limiter memory fallback', () => {
  it('limits requests after threshold is reached', async () => {
    const key = `test-limit-${Date.now()}`;

    expect(await rateLimiter.check(key, 2, 1000)).toBe(false);
    expect(await rateLimiter.check(key, 2, 1000)).toBe(false);
    expect(await rateLimiter.check(key, 2, 1000)).toBe(true);

    await rateLimiter.reset(key);
    expect(await rateLimiter.check(key, 2, 1000)).toBe(false);
  });
});

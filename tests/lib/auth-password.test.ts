import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from '@/lib/auth';

describe('auth password helpers', () => {
  it('hashes and verifies a password', async () => {
    const plain = 'S3cureP@ssword!';
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(await verifyPassword(plain, hash)).toBe(true);
    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });
});

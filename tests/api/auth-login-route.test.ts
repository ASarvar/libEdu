import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCheck,
  mockGetResetTime,
  mockAuthenticateUser,
  mockDeleteSession,
  mockCookieSet,
} = vi.hoisted(() => ({
  mockCheck: vi.fn(),
  mockGetResetTime: vi.fn(),
  mockAuthenticateUser: vi.fn(),
  mockDeleteSession: vi.fn(),
  mockCookieSet: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({
  rateLimiter: {
    check: mockCheck,
    getResetTime: mockGetResetTime,
  },
  getClientIP: () => '127.0.0.1',
  RATE_LIMITS: {
    LOGIN: {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000,
    },
  },
}));

vi.mock('@/lib/auth', () => ({
  authenticateUser: mockAuthenticateUser,
  deleteSession: mockDeleteSession,
}));

vi.mock('next/headers', () => ({
  cookies: async () => ({
    set: mockCookieSet,
  }),
}));

import { POST } from '@/app/api/auth/login/route';

function createRequest(body: Record<string, unknown>) {
  return new Request('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '127.0.0.1',
    },
    body: JSON.stringify(body),
  }) as any;
}

describe('POST /api/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCheck.mockResolvedValue(false);
    mockGetResetTime.mockResolvedValue(0);
    process.env.ENFORCE_EMAIL_VERIFICATION = 'false';
  });

  it('returns 400 when email or password is missing', async () => {
    const response = await POST(createRequest({ email: '' }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe('Email and password are required');
  });

  it('returns 401 when credentials are invalid', async () => {
    mockAuthenticateUser.mockResolvedValue(null);

    const response = await POST(
      createRequest({
        email: 'user@example.com',
        password: 'bad',
      }),
    );

    expect(response.status).toBe(401);
  });

  it('returns 403 for unverified users and deletes session', async () => {
    process.env.ENFORCE_EMAIL_VERIFICATION = 'true';

    mockAuthenticateUser.mockResolvedValue({
      user: {
        id: 'u-1',
        full_name: 'Test User',
        email: 'user@example.com',
        role: 'user',
        email_verified: false,
      },
      sessionToken: 'session-token',
    });

    const response = await POST(
      createRequest({
        email: 'user@example.com',
        password: 'good-pass',
      }),
    );

    expect(response.status).toBe(403);
    expect(mockDeleteSession).toHaveBeenCalledWith('session-token');
  });

  it('sets cookie and returns success for verified user', async () => {
    mockAuthenticateUser.mockResolvedValue({
      user: {
        id: 'u-1',
        full_name: 'Test User',
        email: 'user@example.com',
        role: 'admin',
        email_verified: true,
      },
      sessionToken: 'session-token',
    });

    const response = await POST(
      createRequest({
        email: 'user@example.com',
        password: 'good-pass',
      }),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(mockCookieSet).toHaveBeenCalledOnce();
  });
});

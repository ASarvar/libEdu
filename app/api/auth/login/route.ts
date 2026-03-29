import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, deleteSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { rateLimiter, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 attempts per 15 minutes per IP)
    const ip = getClientIP(request.headers);
    const rateLimitKey = `login:${ip}`;
    
    if (await rateLimiter.check(rateLimitKey, RATE_LIMITS.LOGIN.maxRequests, RATE_LIMITS.LOGIN.windowMs)) {
      const resetTime = await rateLimiter.getResetTime(rateLimitKey);
      return NextResponse.json(
        { 
          error: 'Too many login attempts',
          message: 'Please try again later',
          retryAfter: Math.ceil(resetTime / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(resetTime / 1000).toString()
          }
        }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    const result = await authenticateUser(email, password);

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const { user, sessionToken } = result;

    if (!user.email_verified) {
      await deleteSession(sessionToken);
      return NextResponse.json(
        {
          error: 'Email not verified',
          message: 'Please verify your email before logging in. You can request a new verification email from the signup page.',
        },
        { status: 403 }
      );
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Login error details:', {
        message: error?.message,
        stack: error?.stack,
      });
    } else {
      console.error('Login error:', error?.message || 'unknown error');
    }
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

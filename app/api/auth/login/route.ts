import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import { rateLimiter, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 attempts per 15 minutes per IP)
    const ip = getClientIP(request.headers);
    const rateLimitKey = `login:${ip}`;
    
    if (rateLimiter.check(rateLimitKey, RATE_LIMITS.LOGIN.maxRequests, RATE_LIMITS.LOGIN.windowMs)) {
      const resetTime = rateLimiter.getResetTime(rateLimitKey);
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

    console.log('Login API called from IP:', ip);
    const body = await request.json();
    console.log('Request body:', { email: body.email });
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      console.log('Validation failed: missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Attempting to authenticate user:', email);
    // Authenticate user
    const result = await authenticateUser(email, password);
    console.log('Authentication result:', result ? 'success' : 'failed');

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const { user, sessionToken } = result;

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    console.log('Login successful for user:', user.email);
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
    console.error('Login error details:', {
      message: error?.message,
      stack: error?.stack,
      error: error
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    );
  }
}

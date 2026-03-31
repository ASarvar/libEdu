import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { RATE_LIMITS, getClientIP, rateLimiter } from '@/lib/rate-limit';

const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request.headers);
    const isRateLimited = await rateLimiter.check(
      ip,
      RATE_LIMITS.REGISTER.maxRequests,
      RATE_LIMITS.REGISTER.windowMs
    );

    if (isRateLimited) {
      const retryAfterSeconds = Math.ceil((await rateLimiter.getResetTime(ip)) / 1000);
      return NextResponse.json(
        {
          error: 'Too many signup attempts. Please try again later.',
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, password, confirmPassword } = body;
    void request;

    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (!STRONG_PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' },
        { status: 400 }
      );
    }

    // Email validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    try {
      // Create user (default role: user)
      const user = await createUser({
        full_name: fullName,
        email,
        phone,
        password,
        role: 'user',
        email_verified: true,
      });

      return NextResponse.json({
        success: true,
        message: 'Registration successful! You can now log in.',
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      // Check for unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

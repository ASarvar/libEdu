import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordByToken } from '@/lib/auth';
import { rateLimiter, getClientIP, RATE_LIMITS } from '@/lib/rate-limit';

function isStrongEnough(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP to prevent token brute-forcing
    const ip = getClientIP(request.headers);
    const isRateLimited = await rateLimiter.check(
      `reset-password:${ip}`,
      RATE_LIMITS.PASSWORD_RESET.maxRequests,
      RATE_LIMITS.PASSWORD_RESET.windowMs
    );

    if (isRateLimited) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const token = typeof body?.token === 'string' ? body.token.trim() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    const confirmPassword = typeof body?.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!token || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Token, password, and confirmPassword are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (!isStrongEnough(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' },
        { status: 400 }
      );
    }

    const result = await resetPasswordByToken(token, password);

    if (!result.success) {
      if (result.reason === 'expired') {
        return NextResponse.json(
          { error: 'Reset token has expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (result.reason === 'already-used') {
        return NextResponse.json(
          { error: 'Reset token has already been used.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. Please log in with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

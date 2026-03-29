import { NextRequest, NextResponse } from 'next/server';
import { createPasswordResetToken, getUserByEmail } from '@/lib/auth';
import { RATE_LIMITS, getClientIP, rateLimiter } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request.headers);
    const ipKey = `forgot-password:ip:${ip}`;

    if (await rateLimiter.check(ipKey, RATE_LIMITS.PASSWORD_RESET.maxRequests, RATE_LIMITS.PASSWORD_RESET.windowMs)) {
      const retryAfter = Math.ceil((await rateLimiter.getResetTime(ipKey)) / 1000);
      return NextResponse.json(
        {
          error: 'Too many reset attempts. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const emailKey = `forgot-password:email:${email}`;
    if (await rateLimiter.check(emailKey, RATE_LIMITS.PASSWORD_RESET.maxRequests, RATE_LIMITS.PASSWORD_RESET.windowMs)) {
      const retryAfter = Math.ceil((await rateLimiter.getResetTime(emailKey)) / 1000);
      return NextResponse.json(
        {
          error: 'Too many reset attempts for this email. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
          },
        }
      );
    }

    const user = await getUserByEmail(email);

    // Always return a generic response to avoid account enumeration.
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    const token = await createPasswordResetToken(user.id);
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const appOrigin = process.env.NEXT_PUBLIC_APP_URL || `${proto}://${host}`;
    const resetUrl = `${appOrigin}/api/auth/reset-password?token=${token}`;

    if (process.env.NODE_ENV === 'development') {
      console.log('Password reset URL:', resetUrl);
    }

    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
      reset_url: process.env.NODE_ENV === 'development' ? resetUrl : undefined,
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

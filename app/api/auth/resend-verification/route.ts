import { NextRequest, NextResponse } from 'next/server';
import { createEmailVerificationToken, getUserByEmail } from '@/lib/auth';
import { RATE_LIMITS, getClientIP, rateLimiter } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request.headers);
    const ipKey = `resend-verification:ip:${ip}`;

    if (
      await rateLimiter.check(
        ipKey,
        RATE_LIMITS.EMAIL_VERIFICATION_RESEND.maxRequests,
        RATE_LIMITS.EMAIL_VERIFICATION_RESEND.windowMs
      )
    ) {
      const retryAfter = Math.ceil((await rateLimiter.getResetTime(ipKey)) / 1000);
      return NextResponse.json(
        {
          error: 'Too many verification requests. Please try again later.',
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

    const emailKey = `resend-verification:email:${email}`;
    if (
      await rateLimiter.check(
        emailKey,
        RATE_LIMITS.EMAIL_VERIFICATION_RESEND.maxRequests,
        RATE_LIMITS.EMAIL_VERIFICATION_RESEND.windowMs
      )
    ) {
      const retryAfter = Math.ceil((await rateLimiter.getResetTime(emailKey)) / 1000);
      return NextResponse.json(
        {
          error: 'Too many verification requests for this email. Please try again later.',
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

    // Do not reveal whether email exists.
    if (!user || user.email_verified) {
      return NextResponse.json({
        success: true,
        message: 'If your account exists and is not verified, a new verification email has been sent.',
      });
    }

    const token = await createEmailVerificationToken(user.id);
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const appOrigin = process.env.NEXT_PUBLIC_APP_URL || `${proto}://${host}`;
    const verificationUrl = `${appOrigin}/api/auth/verify-email?token=${token}`;

    if (process.env.NODE_ENV === 'development') {
      console.log('Resend verification URL:', verificationUrl);
    }

    return NextResponse.json({
      success: true,
      message: 'If your account exists and is not verified, a new verification email has been sent.',
      verification_url: process.env.NODE_ENV === 'development' ? verificationUrl : undefined,
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

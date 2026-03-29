import { NextResponse } from 'next/server';
import { CSRF_COOKIE_NAME, generateCsrfToken, withCsrfCookie } from '@/lib/csrf';

export async function GET() {
  const token = generateCsrfToken();
  const response = NextResponse.json({
    success: true,
    csrfToken: token,
  });

  withCsrfCookie(response, token);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(CSRF_COOKIE_NAME, '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return response;
}

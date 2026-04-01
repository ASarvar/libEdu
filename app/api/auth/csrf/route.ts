import { NextRequest, NextResponse } from 'next/server';
import { CSRF_COOKIE_NAME, generateCsrfToken, withCsrfCookie } from '@/lib/csrf';

export async function GET(request: NextRequest) {
  const token = generateCsrfToken();
  const response = NextResponse.json({
    success: true,
    csrfToken: token,
  });

  withCsrfCookie(response, token, request);
  return response;
}

export async function DELETE(request: NextRequest) {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  const isSecure = forwardedProto
    ? forwardedProto.split(',')[0].trim().toLowerCase() === 'https'
    : request.nextUrl.protocol === 'https:';

  const response = NextResponse.json({ success: true });
  response.cookies.set(CSRF_COOKIE_NAME, '', {
    httpOnly: false,
    secure: isSecure,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return response;
}

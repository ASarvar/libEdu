import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const CSRF_COOKIE_NAME = 'csrf_token';
export const CSRF_HEADER_NAME = 'x-csrf-token';

function isSecureRequest(request: NextRequest): boolean {
  const forwardedProto = request.headers.get('x-forwarded-proto');
  if (forwardedProto) {
    return forwardedProto.split(',')[0].trim().toLowerCase() === 'https';
  }

  return request.nextUrl.protocol === 'https:';
}

function getRequestOrigin(request: NextRequest): string {
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || request.headers.get('host') || request.nextUrl.host;
  const protocol = forwardedProto || request.nextUrl.protocol.replace(':', '');
  return `${protocol}://${host}`;
}

function parseOrigin(value: string | null): string | null {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isStateChangingMethod(method: string): boolean {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase());
}

function isSameOriginRequest(request: NextRequest): boolean {
  const requestOrigin = getRequestOrigin(request);
  const originHeader = parseOrigin(request.headers.get('origin'));
  const refererHeader = parseOrigin(request.headers.get('referer'));

  if (originHeader && originHeader === requestOrigin) {
    return true;
  }

  if (refererHeader && refererHeader === requestOrigin) {
    return true;
  }

  return false;
}

function isTokenValid(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  if (!cookieToken || !headerToken) {
    return false;
  }

  return cookieToken === headerToken;
}

export function validateCsrfRequest(request: NextRequest): boolean {
  if (!isStateChangingMethod(request.method)) {
    return true;
  }

  // Same-origin API calls are allowed without custom headers.
  if (isSameOriginRequest(request)) {
    return true;
  }

  // For clients without origin headers, require double-submit token.
  return isTokenValid(request);
}

export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function withCsrfCookie(response: NextResponse, token: string, request: NextRequest): NextResponse {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false,
    secure: isSecureRequest(request),
    sameSite: 'strict',
    path: '/',
    maxAge: 24 * 60 * 60,
  });

  return response;
}

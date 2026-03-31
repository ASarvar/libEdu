import { NextResponse } from 'next/server';

type ErrorBody = {
  code: string;
  message: string;
  details?: unknown;
};

export function apiOk<T extends Record<string, unknown>>(
  payload: T,
  init?: ResponseInit
) {
  return NextResponse.json({ success: true, ...payload }, init);
}

export function apiError(status: number, body: ErrorBody) {
  return NextResponse.json(
    {
      success: false,
      error: body.message,
      errorCode: body.code,
      message: body.message,
      details: body.details,
    },
    { status }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailByToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const result = await verifyEmailByToken(token);

    if (!result.success) {
      if (result.reason === 'expired') {
        return NextResponse.json(
          { error: 'Verification token has expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (result.reason === 'already-used') {
        return NextResponse.json(
          { error: 'Verification token has already been used.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully. You can now log in.',
      email: result.email,
    });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

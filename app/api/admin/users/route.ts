import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, createUser, logAuditAction } from '@/lib/auth';
import { withAuthAndRateLimit } from '@/lib/api-auth';

// GET all users (admin/superadmin only)
export const GET = withAuthAndRateLimit(
  async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const role = searchParams.get('role') || undefined;
      const is_active = searchParams.get('is_active') === 'true' ? true : searchParams.get('is_active') === 'false' ? false : undefined;
      const search = searchParams.get('search') || undefined;

      const users = await getAllUsers({ role, is_active, search });

      return NextResponse.json({ users });
    } catch (error) {
      console.error('Get users error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  },
  {
    allowedRoles: ['admin', 'superadmin'],
  }
);

// POST create new user (admin/superadmin only)
export const POST = withAuthAndRateLimit(
  async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const { fullName, email, phone, password, role } = body;

      // Validate input
      if (!fullName || !email || !password) {
        return NextResponse.json({ error: 'Full name, email, and password are required' }, { status: 400 });
      }

      // Only superadmin can create admin users
      if (role === 'admin' && user.role !== 'superadmin') {
        return NextResponse.json({ error: 'Only superadmin can create admin users' }, { status: 403 });
      }

      // No one can create superadmin
      if (role === 'superadmin') {
        return NextResponse.json({ error: 'Cannot create superadmin users' }, { status: 403 });
      }

      try {
        const newUser = await createUser({
          full_name: fullName,
          email,
          phone,
          password,
          role: role || 'user',
          created_by: user.id,
        });

        await logAuditAction(
          user.id,
          'CREATE_USER',
          'user',
          newUser.id,
          { created_role: newUser.role }
        );

        return NextResponse.json({
          success: true,
          user: newUser,
        });
      } catch (error: any) {
        if (error.code === '23505') {
          return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }
        throw error;
      }
    } catch (error) {
      console.error('Create user error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  },
  {
    allowedRoles: ['admin', 'superadmin'],
  }
);

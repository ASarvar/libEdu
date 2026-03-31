import { NextRequest } from 'next/server';
import { getAllUsers, createUser, logAuditAction } from '@/lib/auth';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import { apiError, apiOk } from '@/lib/api-response';
import { parseCreateUserInput, parseUserFilters, UserInputError } from '@/lib/user-validation';

// GET all users (admin/superadmin only)
export const GET = withAuthAndRateLimit(
  async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url);
      const filters = parseUserFilters(searchParams);
      const users = await getAllUsers(filters);

      return apiOk({ users });
    } catch (error) {
      if (error instanceof UserInputError) {
        return apiError(error.status, {
          code: error.code,
          message: error.message,
        });
      }

      console.error('Get users error:', error);
      return apiError(500, {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
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
      const input = parseCreateUserInput(body);

      if (input.role === 'admin' && user.role !== 'superadmin') {
        return apiError(403, {
          code: 'ADMIN_ROLE_RESTRICTED',
          message: 'Only superadmin can create admin users',
        });
      }

      const newUser = await createUser({
        full_name: input.full_name,
        email: input.email,
        phone: input.phone,
        password: input.password,
        role: input.role,
        created_by: user.id,
        email_verified: true,
      });

      await logAuditAction(
        user.id,
        'CREATE_USER',
        'user',
        newUser.id,
        { created_role: newUser.role }
      );

      return apiOk({ user: newUser });
    } catch (error: any) {
      if (error instanceof UserInputError) {
        return apiError(error.status, {
          code: error.code,
          message: error.message,
        });
      }

      if (error.code === '23505') {
        return apiError(409, {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Email already exists',
        });
      }

      console.error('Create user error:', error);
      return apiError(500, {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
      });
    }
  },
  {
    allowedRoles: ['admin', 'superadmin'],
  }
);

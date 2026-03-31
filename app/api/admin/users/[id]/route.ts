import { NextRequest } from 'next/server';
import { getUserById, updateUser, deleteUser, logAuditAction } from '@/lib/auth';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';
import { apiError, apiOk } from '@/lib/api-response';
import { parseUpdateUserInput, UserInputError } from '@/lib/user-validation';

// GET single user
export const GET = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  currentUser,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    void request;
    void currentUser;

    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return apiError(404, { code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    return apiOk({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, {
  allowedRoles: ['admin', 'superadmin'],
});

// PATCH update user
export const PATCH = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  currentUser,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const targetUser = await getUserById(id);

    if (!targetUser) {
      return apiError(404, { code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    if (targetUser.role === 'superadmin') {
      return apiError(403, {
        code: 'SUPERADMIN_IMMUTABLE',
        message: 'Cannot modify superadmin user',
      });
    }

    const body = await request.json();
    const updates = parseUpdateUserInput(body);

    if (updates.role === 'admin' && currentUser.role !== 'superadmin') {
      return apiError(403, {
        code: 'ADMIN_ROLE_RESTRICTED',
        message: 'Only superadmin can assign admin role',
      });
    }

    const updatedUser = await updateUser(id, updates);

    await logAuditAction(
      currentUser.id,
      'UPDATE_USER',
      'user',
      id,
      { changes: updates }
    );

    return apiOk({ user: updatedUser });
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

    console.error('Update user error:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, {
  allowedRoles: ['admin', 'superadmin'],
});

// DELETE user
export const DELETE = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  currentUser,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    void request;

    const { id } = await params;

    const targetUser = await getUserById(id);

    if (!targetUser) {
      return apiError(404, { code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    if (targetUser.role === 'superadmin') {
      return apiError(403, {
        code: 'SUPERADMIN_IMMUTABLE',
        message: 'Cannot delete superadmin user',
      });
    }

    if (targetUser.role === 'admin' && currentUser.role !== 'superadmin') {
      return apiError(403, {
        code: 'ADMIN_DELETE_RESTRICTED',
        message: 'Only superadmin can delete admin users',
      });
    }

    if (id === currentUser.id) {
      return apiError(403, {
        code: 'SELF_DELETE_FORBIDDEN',
        message: 'Cannot delete your own account',
      });
    }

    await deleteUser(id);

    await logAuditAction(
      currentUser.id,
      'DELETE_USER',
      'user',
      id,
      { deleted_role: targetUser.role }
    );

    return apiOk({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return apiError(500, {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
  }
}, {
  allowedRoles: ['admin', 'superadmin'],
});

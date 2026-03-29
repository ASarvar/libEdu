import { NextRequest, NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser, logAuditAction } from '@/lib/auth';
import { withAuthAndRateLimitWithContext } from '@/lib/api-auth';

// GET single user
export const GET = withAuthAndRateLimitWithContext(async (
  request: NextRequest,
  currentUser,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    void request;

    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    const body = await request.json();
    const { fullName, email, phone, role, isActive } = body;

    // Get target user
    const targetUser = await getUserById(id);

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cannot modify superadmin
    if (targetUser.role === 'superadmin') {
      return NextResponse.json({ error: 'Cannot modify superadmin user' }, { status: 403 });
    }

    // Only superadmin can change role to admin
    if (role === 'admin' && currentUser.role !== 'superadmin') {
      return NextResponse.json({ error: 'Only superadmin can assign admin role' }, { status: 403 });
    }

    // Cannot change to superadmin
    if (role === 'superadmin') {
      return NextResponse.json({ error: 'Cannot assign superadmin role' }, { status: 403 });
    }

    const updatedUser = await updateUser(id, {
      full_name: fullName,
      email,
      phone,
      role,
      is_active: isActive,
    });

    await logAuditAction(
      currentUser.id,
      'UPDATE_USER',
      'user',
      id,
      { changes: body }
    );

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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

    // Get target user
    const targetUser = await getUserById(id);

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cannot delete superadmin
    if (targetUser.role === 'superadmin') {
      return NextResponse.json({ error: 'Cannot delete superadmin user' }, { status: 403 });
    }

    // Only superadmin can delete admin users
    if (targetUser.role === 'admin' && currentUser.role !== 'superadmin') {
      return NextResponse.json({ error: 'Only superadmin can delete admin users' }, { status: 403 });
    }

    // Cannot delete yourself
    if (id === currentUser.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 403 });
    }

    await deleteUser(id);

    await logAuditAction(
      currentUser.id,
      'DELETE_USER',
      'user',
      id,
      { deleted_role: targetUser.role }
    );

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, {
  allowedRoles: ['admin', 'superadmin'],
});

export const USER_ROLES = ['superadmin', 'admin', 'moderator', 'user'] as const;

export type UserRole = (typeof USER_ROLES)[number];

const ROLE_LEVEL: Record<UserRole, number> = {
  superadmin: 3,
  admin: 2,
  moderator: 1,
  user: 0,
};

export const ADMIN_PANEL_ROLES: UserRole[] = ['superadmin', 'admin', 'moderator'];
export const ADMIN_API_ROLES: UserRole[] = ['superadmin', 'admin'];

export function isUserRole(value: string): value is UserRole {
  return (USER_ROLES as readonly string[]).includes(value);
}

export function hasAnyRole(role: UserRole, allowedRoles: readonly UserRole[]): boolean {
  return allowedRoles.includes(role);
}

export function hasRoleOrHigher(role: UserRole, minimumRole: UserRole): boolean {
  return ROLE_LEVEL[role] >= ROLE_LEVEL[minimumRole];
}

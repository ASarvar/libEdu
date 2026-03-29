'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ADMIN_PANEL_ROLES, hasAnyRole, UserRole } from './roles';

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
}

interface WithAdminAuthOptions {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Higher-Order Component to protect admin pages
 * Checks authentication and authorization on client-side
 */
export function withAdminAuth<P extends object>(
  Component: React.ComponentType<P & { user: User }>,
  options: WithAdminAuthOptions = {}
) {
  const { allowedRoles = ADMIN_PANEL_ROLES, redirectTo = '/login' } = options;

  return function ProtectedComponent(props: P) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      async function checkAuth() {
        try {
          const response = await fetch('/api/auth/me');
          
          if (!response.ok) {
            router.push(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
          }

          const data = await response.json();
          
          if (!data.user) {
            router.push(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
          }

          // Check if user has required role
          if (!hasAnyRole(data.user.role, allowedRoles)) {
            router.push('/403');
            return;
          }

          setUser(data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          router.push(redirectTo);
        } finally {
          setLoading(false);
        }
      }

      checkAuth();
    }, [router]);

    if (loading) {
      return React.createElement(
        'div',
        { className: 'flex items-center justify-center min-h-screen' },
        React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement('div', {
            className: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'
          }),
          React.createElement('p', { className: 'text-gray-600' }, 'Loading...')
        )
      );
    }

    if (!user) {
      return null;
    }

    return React.createElement(Component, { ...props, user } as any);
  };
}

/**
 * Hook to use current authenticated user
 */
export function useAdminAuth(allowedRoles: UserRole[] = ADMIN_PANEL_ROLES) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        
        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        
        if (!data.user) {
          throw new Error('User not found');
        }

        if (!hasAnyRole(data.user.role, allowedRoles)) {
          setError('Insufficient permissions');
          router.push('/403');
          return;
        }

        setUser(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router, allowedRoles]);

  return { user, loading, error };
}

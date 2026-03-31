import { NextRequest } from 'next/server';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import pool from '@/lib/db';
import { apiError, apiOk } from '@/lib/api-response';

async function getCount(queryText: string, values?: unknown[]): Promise<number> {
  const result = await pool.query(queryText, values);
  return Number.parseInt(result.rows[0].count, 10) || 0;
}

async function getOptionalCount(queryText: string, values?: unknown[]): Promise<number> {
  try {
    return await getCount(queryText, values);
  } catch {
    return 0;
  }
}

export const GET = withAuthAndRateLimit(
  async (request: NextRequest, currentUser) => {
    try {
      void request;

      const totalUsers = await getCount('SELECT COUNT(*) as count FROM users');
      const activeUsers = await getCount('SELECT COUNT(*) as count FROM users WHERE is_active = true');
      const totalAdmins = await getCount(
        "SELECT COUNT(*) as count FROM users WHERE role IN ('admin', 'superadmin')",
      );

      const totalSites =
        currentUser.role === 'superadmin'
          ? await getOptionalCount('SELECT COUNT(*) as count FROM sites')
          : 0;

      const totalBooks = await getOptionalCount('SELECT COUNT(*) as count FROM books');
      const totalCategories = await getOptionalCount('SELECT COUNT(*) as count FROM categories');

      const newUsersThisMonth = await getCount(
        `SELECT COUNT(*) as count FROM users
         WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
      );

      const newBooksThisMonth = await getOptionalCount(
        `SELECT COUNT(*) as count FROM books
         WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
      );

      let totalNews = 0;
      let newNewsThisMonth = 0;

      if (currentUser.role === 'superadmin') {
        totalNews = await getOptionalCount('SELECT COUNT(*) as count FROM news');
        newNewsThisMonth = await getOptionalCount(
          `SELECT COUNT(*) as count FROM news
           WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
        );
      } else if (currentUser.site_id) {
        totalNews = await getOptionalCount('SELECT COUNT(*) as count FROM news WHERE site_id = $1', [
          currentUser.site_id,
        ]);
        newNewsThisMonth = await getOptionalCount(
          `SELECT COUNT(*) as count FROM news
           WHERE site_id = $1 AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
          [currentUser.site_id],
        );
      }

      const recentActivityResult = await pool.query(
        `SELECT
           u.id,
           'user' as type,
           'New user registered: ' || u.full_name as description,
           u.created_at as timestamp
         FROM users u
         ORDER BY u.created_at DESC
         LIMIT 10`,
      );

      return apiOk({
        stats: {
          totalUsers,
          activeUsers,
          totalAdmins,
          totalSites,
          totalBooks,
          totalCategories,
          totalNews,
          newUsersThisMonth,
          newBooksThisMonth,
          newNewsThisMonth,
        },
        recentActivity: recentActivityResult.rows,
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return apiError(500, {
        code: 'INTERNAL_ERROR',
        message: 'Failed to fetch dashboard stats',
      });
    }
  },
  {
    allowedRoles: ['admin', 'superadmin'],
  },
);

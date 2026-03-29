import { NextRequest, NextResponse } from 'next/server';
import { withAuthAndRateLimit } from '@/lib/api-auth';
import pool from '@/lib/db';

export const GET = withAuthAndRateLimit(async (request: NextRequest, currentUser) => {
  try {
    void request;

    // Get total users count
    const totalUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users'
    );
    const totalUsers = parseInt(totalUsersResult.rows[0].count);

    // Get active users count
    const activeUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE is_active = true'
    );
    const activeUsers = parseInt(activeUsersResult.rows[0].count);

    // Get total admins count
    const totalAdminsResult = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE role IN ('admin', 'superadmin')"
    );
    const totalAdmins = parseInt(totalAdminsResult.rows[0].count);

    // Get total sites count (only for superadmin)
    let totalSites = 0;
    if (currentUser.role === 'superadmin') {
      const totalSitesResult = await pool.query(
        'SELECT COUNT(*) as count FROM sites'
      );
      totalSites = parseInt(totalSitesResult.rows[0].count);
    }

    // Get total books count
    let totalBooks = 0;
    try {
      const totalBooksResult = await pool.query(
        'SELECT COUNT(*) as count FROM books'
      );
      totalBooks = parseInt(totalBooksResult.rows[0].count);
    } catch {
      // Optional table in some deployments.
    }

    // Get total categories count
    let totalCategories = 0;
    try {
      const totalCategoriesResult = await pool.query(
        'SELECT COUNT(*) as count FROM categories'
      );
      totalCategories = parseInt(totalCategoriesResult.rows[0].count);
    } catch {
      // Optional table in some deployments.
    }

    // Get new users this month
    const newUsersThisMonthResult = await pool.query(
      `SELECT COUNT(*) as count FROM users 
       WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`
    );
    const newUsersThisMonth = parseInt(newUsersThisMonthResult.rows[0].count);

    // Get new books this month
    let newBooksThisMonth = 0;
    try {
      const newBooksThisMonthResult = await pool.query(
        `SELECT COUNT(*) as count FROM books 
         WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`
      );
      newBooksThisMonth = parseInt(newBooksThisMonthResult.rows[0].count);
    } catch (error) {
      console.log('Books table does not exist for monthly count, setting to 0');
    }

    // Get total news count
    let totalNews = 0;
    try {
      if (currentUser.role === 'superadmin') {
        const totalNewsResult = await pool.query(
          'SELECT COUNT(*) as count FROM news'
        );
        totalNews = parseInt(totalNewsResult.rows[0].count);
      } else if (currentUser.site_id) {
        const totalNewsResult = await pool.query(
          'SELECT COUNT(*) as count FROM news WHERE site_id = $1',
          [currentUser.site_id]
        );
        totalNews = parseInt(totalNewsResult.rows[0].count);
      }
    } catch {
      // Optional table in some deployments.
    }

    // Get new news this month
    let newNewsThisMonth = 0;
    try {
      if (currentUser.role === 'superadmin') {
        const newNewsThisMonthResult = await pool.query(
          `SELECT COUNT(*) as count FROM news 
           WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`
        );
        newNewsThisMonth = parseInt(newNewsThisMonthResult.rows[0].count);
      } else if (currentUser.site_id) {
        const newNewsThisMonthResult = await pool.query(
          `SELECT COUNT(*) as count FROM news 
           WHERE site_id = $1 AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
          [currentUser.site_id]
        );
        newNewsThisMonth = parseInt(newNewsThisMonthResult.rows[0].count);
      }
    } catch {
      // Optional table in some deployments.
    }

    // Get recent activity (last 10 activities)
    const recentActivityResult = await pool.query(
      `SELECT 
        u.id,
        'user' as type,
        'New user registered: ' || u.full_name as description,
        u.created_at as timestamp
       FROM users u
       ORDER BY u.created_at DESC
       LIMIT 10`
    );
    const recentActivity = recentActivityResult.rows;

    const stats = {
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
    };

    return NextResponse.json({ 
      stats,
      recentActivity 
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}, {
  allowedRoles: ['admin', 'superadmin'],
});

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('Dashboard stats API called');
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
      console.log('No session token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await verifySession(sessionToken);
    console.log('Current user:', currentUser);

    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'superadmin')) {
      console.log('User not authorized:', currentUser?.role);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get total users count
    const totalUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users'
    );
    const totalUsers = parseInt(totalUsersResult.rows[0].count);
    console.log('Total users:', totalUsers);

    // Get active users count
    const activeUsersResult = await pool.query(
      'SELECT COUNT(*) as count FROM users WHERE is_active = true'
    );
    const activeUsers = parseInt(activeUsersResult.rows[0].count);
    console.log('Active users:', activeUsers);

    // Get total admins count
    const totalAdminsResult = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE role IN ('admin', 'superadmin')"
    );
    const totalAdmins = parseInt(totalAdminsResult.rows[0].count);
    console.log('Total admins:', totalAdmins);

    // Get total sites count (only for superadmin)
    let totalSites = 0;
    if (currentUser.role === 'superadmin') {
      const totalSitesResult = await pool.query(
        'SELECT COUNT(*) as count FROM sites'
      );
      totalSites = parseInt(totalSitesResult.rows[0].count);
      console.log('Total sites:', totalSites);
    }

    // Get total books count
    let totalBooks = 0;
    try {
      const totalBooksResult = await pool.query(
        'SELECT COUNT(*) as count FROM books'
      );
      totalBooks = parseInt(totalBooksResult.rows[0].count);
      console.log('Total books:', totalBooks);
    } catch (error) {
      console.log('Books table does not exist, setting to 0');
    }

    // Get total categories count
    let totalCategories = 0;
    try {
      const totalCategoriesResult = await pool.query(
        'SELECT COUNT(*) as count FROM categories'
      );
      totalCategories = parseInt(totalCategoriesResult.rows[0].count);
      console.log('Total categories:', totalCategories);
    } catch (error) {
      console.log('Categories table does not exist, setting to 0');
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
      console.log('Total news:', totalNews);
    } catch (error) {
      console.log('News table does not exist, setting to 0');
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
    } catch (error) {
      console.log('News table does not exist for monthly count, setting to 0');
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

    console.log('Final stats object:', stats);
    console.log('Recent activity count:', recentActivity.length);

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
}

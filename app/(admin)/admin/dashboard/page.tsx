"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalAdmins: number;
  totalSites: number;
  totalBooks: number;
  totalCategories: number;
  totalNews: number;
  newUsersThisMonth: number;
  newBooksThisMonth: number;
  newNewsThisMonth: number;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface AdminDashboardProps {
  user: User;
}

const AdminDashboardContent = ({ user }: AdminDashboardProps) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalAdmins: 0,
    totalSites: 0,
    totalBooks: 0,
    totalCategories: 0,
    totalNews: 0,
    newUsersThisMonth: 0,
    newBooksThisMonth: 0,
    newNewsThisMonth: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      console.log('Dashboard stats response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Dashboard stats data:', data);
        setStats(data.stats);
        setRecentActivity(data.recentActivity || []);
      } else {
        const errorData = await response.json();
        console.error('Dashboard stats error:', errorData);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    }
  };

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          {/* Header */}
          <div className="sec-title text-center mb-50">
            <h2>{t('admin.dashboard')}</h2>
            <div className="text-desc">
              {t('common.welcome', { name: user.full_name })} - {user.role}
            </div>
          </div>

          {/* Main Statistics */}
          <div className="row mb-40">
            <div className="col-lg-3 col-md-6 mb-30">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h3>{stats.totalUsers}</h3>
                <p>{t('admin.totalUsers')}</p>
                <div className="stat-footer">
                  <span className="text-success">
                    <i className="fa fa-arrow-up"></i> {stats.activeUsers} {t('admin.active')}
                  </span>
                </div>
              </div>
            </div>

            {user.role === 'superadmin' && (
              <div className="col-lg-3 col-md-6 mb-30">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fa fa-globe"></i>
                  </div>
                  <h3>{stats.totalSites}</h3>
                  <p>{t('admin.sites.title')}</p>
                  <div className="stat-footer">
                    <Link href="/admin/sites" className="stat-link">
                      {t('admin.viewAll')} <i className="fa fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="col-lg-3 col-md-6 mb-30">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa fa-book"></i>
                </div>
                <h3>{stats.totalBooks}</h3>
                <p>{t('admin.books')}</p>
                <div className="stat-footer">
                  <span className="text-info">
                    <i className="fa fa-plus"></i> {stats.newBooksThisMonth} {t('admin.thisMonth')}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-30">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa fa-tags"></i>
                </div>
                <h3>{stats.totalCategories}</h3>
                <p>{t('admin.categories')}</p>
                <div className="stat-footer">
                  <Link href="/admin/categories" className="stat-link">
                    {t('admin.manage')} <i className="fa fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-30">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fa fa-newspaper"></i>
                </div>
                <h3>{stats.totalNews}</h3>
                <p>News Articles</p>
                <div className="stat-footer">
                  <span className="text-info">
                    <i className="fa fa-plus"></i> {stats.newNewsThisMonth} This Month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Statistics */}
          <div className="row mb-40">
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="stat-card secondary">
                <div className="stat-content">
                  <h4>{stats.totalAdmins}</h4>
                  <p>{t('admin.administrators')}</p>
                </div>
                <div className="stat-icon-small">
                  <i className="fa fa-user-shield"></i>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-30">
              <div className="stat-card secondary">
                <div className="stat-content">
                  <h4>{stats.newUsersThisMonth}</h4>
                  <p>{t('admin.newUsersThisMonth')}</p>
                </div>
                <div className="stat-icon-small">
                  <i className="fa fa-user-plus"></i>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-30">
              <div className="stat-card secondary">
                <div className="stat-content">
                  <h4>{stats.activeUsers}</h4>
                  <p>{t('admin.activeUsers')}</p>
                </div>
                <div className="stat-icon-small">
                  <i className="fa fa-check-circle"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row mb-40">
            <div className="col-12">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>{t('admin.quickActions')}</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 mb-20">
                      <Link href="/admin/users" className="quick-action-btn">
                        <i className="fa fa-users"></i>
                        <span>{t('admin.manageUsers')}</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-20">
                      <Link href="/admin/books" className="quick-action-btn">
                        <i className="fa fa-book"></i>
                        <span>{t('admin.manageBooks')}</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-20">
                      <Link href="/admin/categories" className="quick-action-btn">
                        <i className="fa fa-tags"></i>
                        <span>{t('admin.manageCategories')}</span>
                      </Link>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-20">
                      <Link href="/admin/news" className="quick-action-btn">
                        <i className="fa fa-newspaper"></i>
                        <span>Manage News</span>
                      </Link>
                    </div>
                    {user.role === "superadmin" && (
                      <div className="col-lg-3 col-md-6 mb-20">
                        <Link href="/admin/sites" className="quick-action-btn">
                          <i className="fa fa-globe"></i>
                          <span>{t("admin.manageSites")}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {recentActivity.length > 0 && (
            <div className="row">
              <div className="col-12">
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>{t('admin.recentActivity')}</h3>
                  </div>
                  <div className="card-body">
                    <div className="activity-list">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">
                            <i className={`fa fa-${activity.type === 'user' ? 'user' : activity.type === 'book' ? 'book' : 'circle'}`}></i>
                          </div>
                          <div className="activity-content">
                            <p>{activity.description}</p>
                            <span className="activity-time">{new Date(activity.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

const AdminDashboard = withAdminAuth(AdminDashboardContent);

export default AdminDashboard;

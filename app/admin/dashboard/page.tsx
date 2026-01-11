"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/layout/PageHead";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

interface CurrentUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ role: "", search: "" });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser, filter]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (data.user.role !== 'admin' && data.user.role !== 'superadmin') {
        router.push('/profile');
        return;
      }

      setCurrentUser(data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.role) params.append('role', filter.role);
      if (filter.search) params.append('search', filter.search);

      const response = await fetch(`/api/admin/users?${params}`);
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Fetch users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm(t('admin.confirmDelete') || 'Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(t('admin.deleteSuccess') || 'User deleted successfully');
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Failed to delete user');
    }
  };

  if (loading && !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHead headTitle="Admin Dashboard" />
      
      <section className="admin-dashboard">
        <div className="auto-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="row align-items-center mb-40">
              <div className="col-md-6">
                <h1>{t('admin.dashboard')}</h1>
                <p>{t('common.welcome', { name: currentUser?.full_name })} ({currentUser?.role})</p>
              </div>
              <div className="col-md-6 text-right">
                <Link href="/" className="theme-btn btn-style-two mr-2">
                  <span className="btn-title">{t('login.backToHome')}</span>
                </Link>
                <button onClick={handleLogout} className="theme-btn btn-style-one">
                  <span className="btn-title">{t('admin.logout')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="row mb-40">
            <div className="col-lg-3 col-md-6">
              <div className="stat-card">
                <h3>{users.length}</h3>
                <p>{t('admin.totalUsers')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card">
                <h3>{users.filter(u => u.role === 'admin' || u.role === 'superadmin').length}</h3>
                <p>{t('admin.totalAdmins')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card">
                <h3>{users.filter(u => u.role === 'user').length}</h3>
                <p>{t('admin.totalRegularUsers')}</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card">
                <h3>{users.filter(u => u.is_active).length}</h3>
                <p>{t('admin.activeUsers')}</p>
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="row mb-30">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={t('admin.searchPlaceholder')}
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={filter.role}
                onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              >
                <option value="">{t('admin.allRoles')}</option>
                <option value="admin">{t('admin.admin')}</option>
                <option value="user">{t('admin.user')}</option>
              </select>
            </div>
            <div className="col-md-5 text-right">
              <Link href="/admin/users/create" className="theme-btn btn-style-one">
                <i className="fa fa-plus mr-2"></i>
                <span className="btn-title">{t('admin.createUser')}</span>
              </Link>
            </div>
          </div>

          {/* Users Table */}
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>{t('admin.name')}</th>
                  <th>{t('admin.email')}</th>
                  <th>{t('admin.role')}</th>
                  <th>{t('admin.status')}</th>
                  <th>{t('admin.createdAt')}</th>
                  <th>{t('admin.lastLogin')}</th>
                  <th>{t('admin.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge role-${user.role}`}>
                        {t(`admin.${user.role}`)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                        {user.is_active ? t('admin.active') : t('admin.inactive')}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>{user.last_login ? new Date(user.last_login).toLocaleDateString() : t('admin.never')}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="btn-action btn-edit"
                          title={t('admin.edit')}
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        {user.role !== 'superadmin' && user.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn-action btn-delete"
                            title={t('admin.delete')}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && !loading && (
              <div className="no-data">{t('admin.noUsersFound', 'No users found')}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface UserType {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

interface UsersManagementPageProps {
  user: User;
}

const UsersManagementContent: React.FC<UsersManagementPageProps> = ({ user }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ role: "", search: "" });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filter]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.role) params.append('role', filter.role);
      if (filter.search) params.append('search', filter.search);

      const response = await fetch(`/api/admin/users?${params}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm(t('admin.confirmDelete', 'Are you sure you want to delete this user?'))) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      alert('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="preloader">
          <div className="animation-preloader">
            <div className="spinner"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.users')}</h2>
            <div className="text">
              <Link href="/admin/users/create" className="theme-btn btn-style-one">
                <i className="fa fa-plus btn-mr-8"></i>
                <span className="btn-title">{t('admin.createUser')}</span>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-30">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder={t('admin.searchUsers', 'Search users...')}
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-control"
                value={filter.role}
                onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              >
                <option value="">{t('admin.allRoles', 'All Roles')}</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          {users.length === 0 ? (
            <div className="admin-info-alert">
              <i className="fa fa-info-circle"></i>
              {t('admin.noUsersFound', 'No users found')}
            </div>
          ) : (
            <div className="sites-table-container">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t('admin.name', 'Name')}</th>
                      <th>{t('admin.email', 'Email')}</th>
                      <th>{t('admin.role', 'Role')}</th>
                      <th>{t('admin.status', 'Status')}</th>
                      <th>{t('admin.lastLogin', 'Last Login')}</th>
                      <th>{t('admin.actions', 'Actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td style={{ fontWeight: 500 }}>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`status-badge ${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                            {user.is_active ? t('admin.active', 'Active') : t('admin.inactive', 'Inactive')}
                          </span>
                        </td>
                        <td>
                          {user.last_login
                            ? new Date(user.last_login).toLocaleDateString()
                            : t('admin.never', 'Never')}
                        </td>
                        <td>
                          <div className="actions-cell">
                            <Link
                              href={`/admin/users/${user.id}`}
                              className="theme-btn btn-style-one action-btn"
                              title={t('admin.edit', 'Edit')}
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            {user.role !== 'superadmin' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="action-btn toggle-inactive"
                                title={t('admin.delete', 'Delete')}
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
              </div>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

const UsersManagementPage = withAdminAuth(UsersManagementContent);

export default UsersManagementPage;
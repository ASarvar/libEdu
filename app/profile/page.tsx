"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";

interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  email_verified: boolean;
  created_at: string;
  last_login?: string;
}

const UserProfile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      
      // Redirect admins to admin dashboard
      if (data.user.role === 'admin' || data.user.role === 'superadmin') {
        router.push('/admin/dashboard');
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
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

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <PageTitle title={t('profile.title')} />
      
      <section className="profile-section">
        <div className="auto-container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="profile-sidebar">
                <div className="profile-avatar">
                  <div className="avatar-placeholder">
                    <i className="fa fa-user"></i>
                  </div>
                  <h4 className="mt-3">{user.full_name}</h4>
                  <p className="text-muted">{user.email}</p>
                </div>
                <nav className="profile-nav">
                  <ul>
                    <li className="active">
                      <Link href="/profile">
                        <i className="fa fa-user mr-2"></i>
                        {t('profile.personalInfo')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile/borrowed">
                        <i className="fa fa-book mr-2"></i>
                        {t('profile.borrowedBooks')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile/reservations">
                        <i className="fa fa-bookmark mr-2"></i>
                        {t('profile.reservations')}
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile/history">
                        <i className="fa fa-history mr-2"></i>
                        {t('profile.history')}
                      </Link>
                    </li>
                    <li>
                      <a 
                        onClick={handleLogout} 
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      >
                        <i className="fa fa-sign-out mr-2"></i>
                        {t('profile.logout')}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="profile-content-box">
                <h3 className="mb-30">{t('profile.personalInfo')}</h3>

                <div className="info-row">
                  <div className="row">
                    <div className="col-md-4">
                      <label>{t('profile.fullName')}</label>
                    </div>
                    <div className="col-md-8">
                      <p>{user.full_name}</p>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="row">
                    <div className="col-md-4">
                      <label>{t('profile.email')}</label>
                    </div>
                    <div className="col-md-8">
                      <p>
                        {user.email}
                        {user.email_verified ? (
                          <span className="verified-badge ml-2">
                            <i className="fa fa-check-circle"></i> {t('profile.verified')}
                          </span>
                        ) : (
                          <span className="unverified-badge ml-2">
                            <i className="fa fa-exclamation-circle"></i> {t('profile.notVerified')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="row">
                    <div className="col-md-4">
                      <label>{t('profile.phone')}</label>
                    </div>
                    <div className="col-md-8">
                      <p>{user.phone || t('common.notProvided')}</p>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="row">
                    <div className="col-md-4">
                      <label>{t('profile.memberSince')}</label>
                    </div>
                    <div className="col-md-8">
                      <p>{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="info-row">
                  <div className="row">
                    <div className="col-md-4">
                      <label>{t('profile.lastLogin')}</label>
                    </div>
                    <div className="col-md-8">
                      <p>
                        {user.last_login 
                          ? new Date(user.last_login).toLocaleString() 
                          : t('common.firstLogin')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-40">
                  <Link href="/profile/edit" className="theme-btn btn-style-one">
                    <i className="fa fa-edit mr-2"></i>
                    <span className="btn-title">{t('profile.editProfile')}</span>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="row mt-40">
                <div className="col-md-4">
                  <div className="stat-card">
                    <h3>0</h3>
                    <p>{t('profile.booksCount')}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card">
                    <h3>0</h3>
                    <p>{t('profile.reservationsCount')}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card">
                    <h3>0</h3>
                    <p>{t('profile.booksRead')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;

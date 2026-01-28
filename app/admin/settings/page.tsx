"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

const SettingsPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
      if (data.user.role !== 'admin' && data.user.role !== 'superadmin') {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="preloader">
        <div className="animation-preloader">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.settings')}</h2>
          </div>

          <div className="admin-info-alert">
            <i className="fa fa-info-circle"></i>
            {t('common.comingSoon', 'Coming soon...')}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default SettingsPage;
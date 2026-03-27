"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface Site {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
  created_at: string;
  created_by?: string;
  header_style?: string;
  footer_style?: string;
  home_style?: string;
  logo_path?: string;
}

interface SitesManagementPageProps {
  user: User;
}

const SitesManagementPage: React.FC<SitesManagementPageProps> = ({ user }) => {
  const { t } = useTranslation();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/admin/sites');
      if (response.ok) {
        const data = await response.json();
        setSites(data.sites);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/sites/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setSites(sites.map(site => site.id === id ? data.site : site));
      }
    } catch (error) {
      console.error('Error toggling site status:', error);
    }
  };

  const handleDeleteSite = async (id: string, siteName: string) => {
    const confirmed = window.confirm(
      `Haqiqatdan ham "${siteName}" saytini o'chirmoqchimisiz?\n\n` +
      `Bu sayt butunlay o'chiriladi va qaytarib bo'lmaydi!\n` +
      `Barcha ma'lumotlar (yangiliklar, tadbirlar) ham o'chadi.`
    );
    
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/sites/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSites(sites.filter(site => site.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Saytni o\'chirishda xatolik');
      }
    } catch (error) {
      console.error('Error deleting site:', error);
      alert('Saytni o\'chirishda xatolik');
    }
  };

  const handleViewSite = (subdomain: string) => {
    const url = `http://${subdomain}.localhost:3000`;
    window.open(url, '_blank');
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
          {/* Header */}
          <div className="sec-title text-center">
            <h2>{t('admin.sites.title')}</h2>
            <div className="text">
              <Link
                href="/admin/sites/create"
                className="theme-btn btn-style-one"
              >
                <i className="fa fa-plus btn-mr-8"></i>
                <span className="btn-title">{t('admin.sites.createNew')}</span>
              </Link>
            </div>
          </div>

        {/* Sites List */}
        {sites.length === 0 ? (
          <div className="admin-info-alert">
            <i className="fa fa-info-circle"></i>
            {t('admin.sites.noSites')}
          </div>
        ) : (
          <div className="sites-table-container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('admin.sites.subdomain')}</th>
                    <th>{t('admin.sites.name')}</th>
                    <th>Yaratuvchi</th>
                    <th>{t('admin.sites.status')}</th>
                    <th>{t('admin.sites.created')}</th>
                    <th>{t('admin.sites.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site) => (
                    <tr key={site.id}>
                      <td>
                        <code className="subdomain-badge">
                          {site.subdomain}.kutubxona.uz
                        </code>
                      </td>
                      <td style={{ fontWeight: 500 }}>{site.name}</td>
                      <td>
                        <small style={{ color: '#666' }}>
                          {site.created_by || 'System'}
                        </small>
                      </td>
                      <td>
                        <span className={`status-badge ${site.is_active ? 'active' : 'inactive'}`}>
                          {site.is_active ? t('admin.sites.active') : t('admin.sites.inactive')}
                        </span>
                      </td>
                      <td>{new Date(site.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="actions-cell">
                          <button
                            onClick={() => handleViewSite(site.subdomain)}
                            className="theme-btn btn-style-one action-btn"
                            title="Saytni ko'rish"
                          >
                            <i className="fa fa-external-link-alt"></i>
                          </button>
                          <Link
                            href={`/admin/sites/${site.id}`}
                            className="theme-btn btn-style-one action-btn"
                            title={t('admin.sites.edit')}
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleToggleActive(site.id, site.is_active)}
                            className={`action-btn ${site.is_active ? 'toggle-active' : 'toggle-inactive'}`}
                            title={site.is_active ? 'O\'chirish' : 'Faollashtirish'}
                          >
                            <i className={`fa fa-${site.is_active ? 'ban' : 'check'}`}></i>
                          </button>
                          <button
                            onClick={() => handleDeleteSite(site.id, site.name)}
                            className="action-btn delete-btn"
                            title="Butunlay o'chirish"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
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

// Only superadmin can access sites management
export default withAdminAuth(SitesManagementPage, {
  allowedRoles: ['superadmin'],
  redirectTo: '/login'
});

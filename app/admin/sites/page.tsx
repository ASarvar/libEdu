"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";

interface Site {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  is_active: boolean;
  created_at: string;
}

const SitesManagementPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    subdomain: '',
    name: '',
    description: '',
    logo_url: '',
    primary_color: '#3498db',
    secondary_color: '#2ecc71',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
    fetchSites();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (data.user.role !== 'superadmin') {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

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

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSites([data.site, ...sites]);
        setShowCreateModal(false);
        setFormData({
          subdomain: '',
          name: '',
          description: '',
          logo_url: '',
          primary_color: '#3498db',
          secondary_color: '#2ecc71',
          contact_email: '',
          contact_phone: '',
          contact_address: '',
          facebook_url: '',
          instagram_url: '',
          twitter_url: '',
        });
      } else {
        setError(data.error || t('admin.createError'));
      }
    } catch (error) {
      console.error('Error creating site:', error);
      setError(t('common.error'));
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
              <button
                onClick={() => setShowCreateModal(true)}
                className="theme-btn btn-style-one"
              >
                <i className="fa fa-plus btn-mr-8"></i>
                <span className="btn-title">{t('admin.sites.createNew')}</span>
              </button>
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
                    <th>{t('admin.sites.contact')}</th>
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
                      <td className="contact-info-cell">
                        {site.contact_email && (
                          <div>
                            <i className="fa fa-envelope"></i>
                            {site.contact_email}
                          </div>
                        )}
                        {site.contact_phone && (
                          <div>
                            <i className="fa fa-phone"></i>
                            {site.contact_phone}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${site.is_active ? 'active' : 'inactive'}`}>
                          {site.is_active ? t('admin.sites.active') : t('admin.sites.inactive')}
                        </span>
                      </td>
                      <td>{new Date(site.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="actions-cell">
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
                            title={t('admin.sites.toggleStatus')}
                          >
                            <i className={`fa fa-${site.is_active ? 'ban' : 'check'}`}></i>
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

        {/* Create Site Modal */}
        {showCreateModal && (
          <div className="modal fade show modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog modal-lg modal-dialog-admin" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content modal-content-admin">
              <div className="modal-header modal-header-admin">
                <h5 className="modal-title modal-title-admin">
                  {t('admin.sites.createSiteTitle')}
                </h5>
                <button
                  type="button"
                  className="close modal-close-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <form onSubmit={handleCreateSite}>
                <div className="modal-body modal-body-admin">
                  {error && (
                    <div className="alert-error-admin">
                      <i className="fa fa-exclamation-triangle"></i>
                      {error}
                    </div>
                  )}
                  
                  {/* Basic Information */}
                  <h5 className="form-section-heading">
                    {t('admin.sites.basicInfo')}
                  </h5>
                  
                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      {t('admin.sites.subdomainLabel')} * <small className="form-label-required">({t('admin.sites.required')})</small>
                    </label>
                    <div className="input-group-admin">
                      <input
                        type="text"
                        className="form-control form-input-admin"
                        value={formData.subdomain}
                        onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })}
                        required
                        pattern="[a-z0-9-]+"
                        placeholder="tashkent"
                        minLength={3}
                        maxLength={50}
                      />
                      <span className="input-group-addon">
                        .kutubxona.uz
                      </span>
                    </div>
                    <small className="form-help-text">
                      {t('admin.sites.subdomainHelp')}
                    </small>
                  </div>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      {t('admin.sites.siteName')} *
                    </label>
                    <input
                      type="text"
                      className="form-control form-input-admin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Tashkent Regional Library"
                      maxLength={255}
                    />
                  </div>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      {t('admin.sites.description')}
                    </label>
                    <textarea
                      className="form-control form-textarea-admin"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={t('admin.sites.descriptionPlaceholder')}
                      maxLength={1000}
                    />
                    <small className="form-help-text">
                      {formData.description.length}/1000 {t('admin.sites.characters')}
                    </small>
                  </div>

                  <hr className="form-divider" />

                  {/* Theme Configuration */}
                  <h5 className="form-section-heading">
                    {t('admin.sites.theme')}
                  </h5>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      {t('admin.sites.logoUrl')}
                    </label>
                    <input
                      type="url"
                      className="form-control form-input-admin"
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                    <small className="form-help-text">
                      {t('admin.sites.logoHelp')}
                    </small>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group-admin">
                        <label className="form-label-admin">
                          {t('admin.sites.primaryColor')}
                        </label>
                        <div className="color-input-group">
                          <input
                            type="color"
                            className="form-control"
                            value={formData.primary_color}
                            onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.primary_color}
                            onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                            pattern="^#[0-9A-Fa-f]{6}$"
                            placeholder="#3498db"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-admin">
                        <label className="form-label-admin">
                          {t('admin.sites.secondaryColor')}
                        </label>
                        <div className="color-input-group">
                          <input
                            type="color"
                            className="form-control"
                            value={formData.secondary_color}
                            onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                          />
                          <input
                            type="text"
                            className="form-control"
                            value={formData.secondary_color}
                            onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                            pattern="^#[0-9A-Fa-f]{6}$"
                            placeholder="#2ecc71"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="form-divider" />

                  {/* Contact Information */}
                  <h5 className="form-section-heading">
                    {t('admin.sites.contactInfo')}
                  </h5>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group-admin">
                        <label className="form-label-admin">
                          {t('admin.sites.contactEmail')}
                        </label>
                        <input
                          type="email"
                          className="form-control form-input-admin"
                          value={formData.contact_email}
                          onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                          placeholder="library@example.uz"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-admin">
                        <label className="form-label-admin">
                          {t('admin.sites.contactPhone')}
                        </label>
                        <input
                          type="text"
                          className="form-control form-input-admin"
                          value={formData.contact_phone}
                          onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                          placeholder="+998 71 123-45-67"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      {t('admin.sites.address')}
                    </label>
                    <textarea
                      className="form-control form-textarea-admin"
                      rows={2}
                      value={formData.contact_address}
                      onChange={(e) => setFormData({ ...formData, contact_address: e.target.value })}
                      placeholder={t('admin.sites.addressPlaceholder')}
                      maxLength={500}
                    />
                  </div>

                  <hr className="form-divider" />

                  {/* Social Media */}
                  <h5 className="form-section-heading">
                    {t('admin.sites.socialMedia')}
                  </h5>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      <i className="fab fa-facebook social-icon-label facebook"></i>
                      {t('admin.sites.facebookUrl')}
                    </label>
                    <input
                      type="url"
                      className="form-control form-input-admin"
                      value={formData.facebook_url}
                      onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                      placeholder="https://facebook.com/your-library"
                    />
                  </div>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      <i className="fab fa-instagram social-icon-label instagram"></i>
                      {t('admin.sites.instagramUrl')}
                    </label>
                    <input
                      type="url"
                      className="form-control form-input-admin"
                      value={formData.instagram_url}
                      onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                      placeholder="https://instagram.com/your-library"
                    />
                  </div>

                  <div className="form-group-admin">
                    <label className="form-label-admin">
                      <i className="fab fa-twitter social-icon-label twitter"></i>
                      {t('admin.sites.twitterUrl')}
                    </label>
                    <input
                      type="url"
                      className="form-control form-input-admin"
                      value={formData.twitter_url}
                      onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                      placeholder="https://twitter.com/your-library"
                    />
                  </div>
                </div>
                <div className="modal-footer modal-footer-admin">
                  <button
                    type="button"
                    className="theme-btn btn-style-two"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <i className="fa fa-times btn-mr-8"></i>
                    <span className="btn-title">{t('admin.sites.cancel')}</span>
                  </button>
                  <button type="submit" className="theme-btn btn-style-one">
                    <i className="fa fa-check btn-mr-8"></i>
                    <span className="btn-title">{t('admin.sites.createSite')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default SitesManagementPage;

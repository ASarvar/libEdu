"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";

interface Site {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo_url?: string;
  logo_path?: string;
  primary_color: string;
  secondary_color: string;
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
  facebook_url?: string;
  instagram_url?: string;
  twitter_url?: string;
  header_style?: string;
  footer_style?: string;
  home_style?: string;
  is_active: boolean;
  created_at: string;
}

const EditSitePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const siteId = params?.id as string;
  
  console.log('Edit page - Site ID:', siteId);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [site, setSite] = useState<Site | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo_url: '',
    logo_file: null as File | null,
    primary_color: '#3498db',
    secondary_color: '#2ecc71',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    header_style: 'header1',
    footer_style: 'footer1',
    home_style: 'home1',
    is_active: true,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    checkAuth();
    if (siteId) {
      fetchSite();
    }
  }, [siteId]);

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

  const fetchSite = async () => {
    try {
      console.log('Fetching site with ID:', siteId);
      const response = await fetch(`/api/admin/sites/${siteId}`);
      console.log('Fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Site data:', data);
        setSite(data.site);
        setFormData({
          name: data.site.name || '',
          description: data.site.description || '',
          logo_url: data.site.logo_url || '',
          logo_file: null,
          primary_color: data.site.primary_color || '#3498db',
          secondary_color: data.site.secondary_color || '#2ecc71',
          contact_email: data.site.contact_email || '',
          contact_phone: data.site.contact_phone || '',
          contact_address: data.site.contact_address || '',
          facebook_url: data.site.facebook_url || '',
          instagram_url: data.site.instagram_url || '',
          twitter_url: data.site.twitter_url || '',
          header_style: data.site.header_style || 'header1',
          footer_style: data.site.footer_style || 'footer1',
          home_style: data.site.home_style || 'home1',
          is_active: data.site.is_active !== false,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Fetch error:', response.status, errorData);
        setError(`Sayt topilmadi (${response.status})`);
      }
    } catch (error) {
      console.error('Error fetching site:', error);
      setError('Saytni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      let logo_path = site?.logo_path;
      
      // Upload new logo if selected
      if (formData.logo_file) {
        const logoFormData = new FormData();
        logoFormData.append('logo', formData.logo_file);
        
        const uploadResponse = await fetch('/api/admin/upload-logo', {
          method: 'POST',
          body: logoFormData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          logo_path = uploadData.path;
        } else {
          const uploadError = await uploadResponse.json();
          setError(uploadError.error || 'Logo yuklashda xatolik');
          setSaving(false);
          return;
        }
      }

      const updateData = {
        ...formData,
        logo_path,
        logo_file: undefined,
      };

      const response = await fetch(`/api/admin/sites/${siteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Sayt muvaffaqiyatli yangilandi');
        setSite(data.site);
        setTimeout(() => {
          router.push('/admin/sites');
        }, 1500);
      } else {
        setError(data.error || 'Saytni yangilashda xatolik');
      }
    } catch (error) {
      console.error('Error updating site:', error);
      setError('Saytni yangilashda xatolik');
    } finally {
      setSaving(false);
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

  if (!site) {
    return (
      <AdminLayout>
        <div className="auto-container">
          <div className="alert-error-admin">
            <i className="fa fa-exclamation-triangle"></i>
            Sayt topilmadi
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title">
            <h2>Saytni tahrirlash: {site.subdomain}.kutubxona.uz</h2>
            <div className="text">
              <button
                onClick={() => router.push('/admin/sites')}
                className="theme-btn btn-style-two"
              >
                <i className="fa fa-arrow-left btn-mr-8"></i>
                <span className="btn-title">Orqaga</span>
              </button>
            </div>
          </div>

          <div className="admin-card">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert-error-admin">
                  <i className="fa fa-exclamation-triangle"></i>
                  {error}
                </div>
              )}

              {success && (
                <div className="alert-success-admin">
                  <i className="fa fa-check-circle"></i>
                  {success}
                </div>
              )}

              {/* Basic Information */}
              <h5 className="form-section-heading">Asosiy ma'lumotlar</h5>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  Subdomen
                </label>
                <input
                  type="text"
                  className="form-control form-input-admin"
                  value={site.subdomain}
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small className="form-help-text">
                  Subdomen o'zgartirib bo'lmaydi
                </small>
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  Sayt nomi *
                </label>
                <input
                  type="text"
                  className="form-control form-input-admin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  Tavsif
                </label>
                <textarea
                  className="form-control form-textarea-admin"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={1000}
                />
              </div>

              <hr className="form-divider" />

              {/* Logo & Theme */}
              <h5 className="form-section-heading">Logo va Tema</h5>

              {site.logo_path && (
                <div style={{ marginBottom: '15px' }}>
                  <label className="form-label-admin">Hozirgi logo:</label>
                  <br />
                  <img 
                    src={site.logo_path} 
                    alt="Logo" 
                    style={{ maxWidth: '200px', maxHeight: '100px', border: '1px solid #ddd', padding: '10px' }}
                  />
                </div>
              )}

              <div className="form-group-admin">
                <label className="form-label-admin">
                  Yangi logo yuklash
                </label>
                <input
                  type="file"
                  className="form-control form-input-admin"
                  accept=".png,.svg,image/png,image/svg+xml"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 1024 * 1024) {
                        setError('Logo hajmi 1MB dan oshmasligi kerak');
                        e.target.value = '';
                        return;
                      }
                      if (!['image/png', 'image/svg+xml'].includes(file.type)) {
                        setError('Faqat PNG va SVG formatlar qo\'llab-quvvatlanadi');
                        e.target.value = '';
                        return;
                      }
                      setError('');
                      setFormData({ ...formData, logo_file: file });
                    }
                  }}
                />
                <small className="form-help-text">
                  PNG yoki SVG format, maksimal 1MB
                </small>
              </div>

              {/* Layout Styles */}
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Header Style</label>
                    <select
                      className="form-control form-input-admin"
                      value={formData.header_style}
                      onChange={(e) => setFormData({ ...formData, header_style: e.target.value })}
                    >
                      <option value="header1">Header 1 - Classic</option>
                      <option value="header2">Header 2 - Modern</option>
                      <option value="header3">Header 3 - Minimal</option>
                      <option value="header4">Header 4 - Bold</option>
                      <option value="header5">Header 5 - Creative</option>
                      <option value="header6">Header 6 - Professional</option>
                      <option value="header7">Header 7 - Dynamic</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Footer Style</label>
                    <select
                      className="form-control form-input-admin"
                      value={formData.footer_style}
                      onChange={(e) => setFormData({ ...formData, footer_style: e.target.value })}
                    >
                      <option value="footer1">Footer 1 - Standard</option>
                      <option value="footer2">Footer 2 - Compact</option>
                      <option value="footer3">Footer 3 - Extended</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Home Style</label>
                    <select
                      className="form-control form-input-admin"
                      value={formData.home_style}
                      onChange={(e) => setFormData({ ...formData, home_style: e.target.value })}
                    >
                      <option value="home1">Home 1 - Corporate</option>
                      <option value="home2">Home 2 - Educational</option>
                      <option value="home3">Home 3 - Modern</option>
                      <option value="home4">Home 4 - Creative</option>
                      <option value="home5">Home 5 - Elegant</option>
                      <option value="home6">Home 6 - Professional</option>
                      <option value="home7">Home 7 - Dynamic</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Asosiy rang</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        className="form-control"
                        value={formData.primary_color}
                        onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control form-input-admin"
                        value={formData.primary_color}
                        onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                        pattern="^#[0-9A-Fa-f]{6}$"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Ikkilamchi rang</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        className="form-control"
                        value={formData.secondary_color}
                        onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      />
                      <input
                        type="text"
                        className="form-control form-input-admin"
                        value={formData.secondary_color}
                        onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                        pattern="^#[0-9A-Fa-f]{6}$"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="form-divider" />

              {/* Contact Information */}
              <h5 className="form-section-heading">Aloqa ma'lumotlari</h5>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Email</label>
                    <input
                      type="email"
                      className="form-control form-input-admin"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Telefon</label>
                    <input
                      type="text"
                      className="form-control form-input-admin"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Manzil</label>
                <textarea
                  className="form-control form-textarea-admin"
                  rows={2}
                  value={formData.contact_address}
                  onChange={(e) => setFormData({ ...formData, contact_address: e.target.value })}
                />
              </div>

              <hr className="form-divider" />

              {/* Social Media */}
              <h5 className="form-section-heading">Ijtimoiy tarmoqlar</h5>

              <div className="form-group-admin">
                <label className="form-label-admin">Facebook</label>
                <input
                  type="url"
                  className="form-control form-input-admin"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Instagram</label>
                <input
                  type="url"
                  className="form-control form-input-admin"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Twitter</label>
                <input
                  type="url"
                  className="form-control form-input-admin"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                />
              </div>

              <hr className="form-divider" />

              {/* Status */}
              <div className="form-group-admin">
                <label className="form-label-admin">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ marginRight: '10px' }}
                  />
                  Sayt faol
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button
                  type="button"
                  className="theme-btn btn-style-two"
                  onClick={() => router.push('/admin/sites')}
                  disabled={saving}
                >
                  <i className="fa fa-times btn-mr-8"></i>
                  <span className="btn-title">Bekor qilish</span>
                </button>
                <button 
                  type="submit" 
                  className="theme-btn btn-style-one"
                  disabled={saving}
                >
                  <i className={`fa fa-${saving ? 'spinner fa-spin' : 'save'} btn-mr-8`}></i>
                  <span className="btn-title">{saving ? 'Saqlanmoqda...' : 'Saqlash'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default EditSitePage;

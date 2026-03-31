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
      const response = await fetch(`/api/admin/sites/${siteId}`);
      
      if (response.ok) {
        const data = await response.json();
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
          home_style: data.site.home_style || 'home1',
          is_active: data.site.is_active !== false,
        });
      } else {
        setError('Sayt topilmadi');
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
        header_style: (
          {
            home1: 'header1',
            home2: 'header2',
            home3: 'header3',
            home4: 'header4',
            home5: 'header5',
            home6: 'header6',
            home7: 'header7',
          } as const
        )[formData.home_style] || 'header1',
        footer_style: (
          {
            home1: 'footer1',
            home2: 'footer2',
            home3: 'footer3',
            home4: 'footer1',
            home5: 'footer1',
            home6: 'footer2',
            home7: 'footer1',
          } as const
        )[formData.home_style] || 'footer1',
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
        <div className="auto-container" style={{ maxWidth: '900px' }}>
          <div className="admin-form-box">
            <div className="form-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2>Saytni tahrirlash</h2>
                <p>{site.subdomain}.kutubxona.uz</p>
              </div>
              <button
                type="button"
                onClick={() => router.push('/admin/sites')}
                className="theme-btn btn-style-two"
              >
                <i className="fa fa-arrow-left btn-mr-8"></i>
                Orqaga
              </button>
            </div>

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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <h3 className="form-section-heading">Asosiy ma'lumotlar</h3>
              
              <div className="form-group-admin">
                <label className="form-label-admin">
                  Subdomen * <span className="form-label-required">(o'zgarmaydi)</span>
                </label>
                <div className="input-group-admin">
                  <input
                    type="text"
                    className="form-input-admin"
                    value={site.subdomain}
                    disabled
                  />
                  <span className="input-group-addon">.kutubxona.uz</span>
                </div>
                <small className="form-help-text">
                  Subdomen yaratilgandan keyin o'zgartirib bo'lmaydi
                </small>
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Sayt nomi *</label>
                <input
                  type="text"
                  className="form-input-admin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Toshkent viloyat kutubxonasi"
                  maxLength={255}
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Tavsif</label>
                <textarea
                  className="form-textarea-admin"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sayt haqida qisqacha tavsif"
                  maxLength={1000}
                />
                <small className="form-help-text">
                  {formData.description.length}/1000 belgi
                </small>
              </div>

              <div className="form-divider"></div>

              {/* Design */}
              <h3 className="form-section-heading">Dizayn</h3>

              {site.logo_path && (
                <div className="form-group-admin">
                  <label className="form-label-admin">Hozirgi logo:</label>
                  <div>
                    <img 
                      src={site.logo_path} 
                      alt="Logo" 
                      className="img-thumbnail"
                      style={{ maxWidth: '200px', maxHeight: '100px' }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fa fa-image btn-mr-8"></i>
                  Yangi logo yuklash
                </label>
                <input
                  type="file"
                  className="form-input-admin"
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
                {formData.logo_file && (
                  <div style={{ marginTop: '10px', color: 'var(--theme-color2)', fontSize: '14px' }}>
                    <i className="fa fa-check-circle"></i> {formData.logo_file.name}
                  </div>
                )}
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fa fa-home btn-mr-8"></i>
                  Bosh sahifa stili
                </label>
                <select
                  className="form-input-admin"
                  value={formData.home_style}
                  onChange={(e) => setFormData({ ...formData, home_style: e.target.value })}
                >
                  <option value="home1">1-stil - Korporativ</option>
                  <option value="home2">2-stil - Ta'lim</option>
                  <option value="home3">3-stil - Zamonaviy</option>
                  <option value="home4">4-stil - Ijodiy</option>
                  <option value="home5">5-stil - Nafis</option>
                  <option value="home6">6-stil - Professional</option>
                  <option value="home7">7-stil - Dinamik</option>
                </select>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Asosiy rang</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={formData.primary_color}
                        onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                      />
                      <input
                        type="text"
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
                    <label className="form-label-admin">Ikkinchi darajali rang</label>
                    <div className="color-input-group">
                      <input
                        type="color"
                        value={formData.secondary_color}
                        onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                      />
                      <input
                        type="text"
                        value={formData.secondary_color}
                        onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                        pattern="^#[0-9A-Fa-f]{6}$"
                        placeholder="#2ecc71"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-divider"></div>

              {/* Contact Information */}
              <h3 className="form-section-heading">Aloqa ma'lumotlari</h3>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Elektron pochta</label>
                    <input
                      type="email"
                      className="form-input-admin"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      placeholder="kutubxona@example.uz"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group-admin">
                    <label className="form-label-admin">Telefon</label>
                    <input
                      type="text"
                      className="form-input-admin"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      placeholder="+998 71 123-45-67"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">Manzil</label>
                <textarea
                  className="form-textarea-admin"
                  rows={2}
                  value={formData.contact_address}
                  onChange={(e) => setFormData({ ...formData, contact_address: e.target.value })}
                  placeholder="Ko'cha, shahar, viloyat"
                  maxLength={500}
                />
              </div>

              <div className="form-divider"></div>

              {/* Social Media */}
              <h3 className="form-section-heading">Ijtimoiy tarmoqlar</h3>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fab fa-facebook social-icon-label facebook"></i>
                  Facebook
                </label>
                <input
                  type="url"
                  className="form-input-admin"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/kutubxonangiz"
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fab fa-instagram social-icon-label instagram"></i>
                  Instagram
                </label>
                <input
                  type="url"
                  className="form-input-admin"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/kutubxonangiz"
                />
              </div>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fab fa-twitter social-icon-label twitter"></i>
                  Twitter
                </label>
                <input
                  type="url"
                  className="form-input-admin"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/kutubxonangiz"
                />
              </div>

              <div className="form-divider"></div>

              {/* Status */}
              <h3 className="form-section-heading">Holat</h3>

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="btn-mr-8"
                  />
                  Sayt faol
                </label>
                <small className="form-help-text">
                  Faol bo'lmagan saytlar foydalanuvchilar uchun ko'rinmaydi
                </small>
              </div>

              {/* Actions */}
              <div className="modal-footer-admin">
                <button
                  type="button"
                  className="theme-btn btn-style-two"
                  onClick={() => router.push('/admin/sites')}
                  disabled={saving}
                >
                  <i className="fa fa-times btn-mr-8"></i>
                  Bekor qilish
                </button>
                <button 
                  type="submit" 
                  className="theme-btn btn-style-one"
                  disabled={saving}
                >
                  <i className={`fa fa-${saving ? 'spinner fa-spin' : 'save'} btn-mr-8`}></i>
                  {saving ? 'Saqlanmoqda...' : 'O\'zgarishlarni saqlash'}
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

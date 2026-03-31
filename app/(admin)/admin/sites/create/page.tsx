"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";

const CreateSitePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    subdomain: '',
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
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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
      if (data.user.role !== 'superadmin') {
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let logo_path = '';
      
      // Upload logo if file is selected
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

      // Create site with logo path
      const siteData = {
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
            home2: 'footer1',
            home3: 'footer2',
            home4: 'footer2',
            home5: 'footer3',
            home6: 'footer3',
            home7: 'footer1',
          } as const
        )[formData.home_style] || 'footer1',
        logo_path,
        logo_file: undefined,
      };

      const response = await fetch('/api/admin/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/sites');
      } else {
        setError(data.error || t('admin.createError'));
        setSaving(false);
      }
    } catch (error) {
      console.error('Error creating site:', error);
      setError(t('common.error'));
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container" style={{ maxWidth: '900px' }}>
          <div className="admin-form-box">
            <div className="form-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2>Yangi sayt yaratish</h2>
                <p>Yangi sayt yaratish uchun quyidagi ma'lumotlarni to'ldiring</p>
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <h3 className="form-section-heading">Asosiy ma'lumotlar</h3>
              
              <div className="form-group-admin">
                <label className="form-label-admin">
                  Subdomen * <span className="form-label-required">(majburiy)</span>
                </label>
                <div className="input-group-admin">
                  <input
                    type="text"
                    className="form-input-admin"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })}
                    required
                    pattern="[a-z0-9-]+"
                    placeholder="tashkent"
                    minLength={3}
                    maxLength={50}
                  />
                  <span className="input-group-addon">.kutubxona.uz</span>
                </div>
                <small className="form-help-text">
                  Faqat kichik harflar, raqamlar va chiziqchalar
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

              <div className="form-group-admin">
                <label className="form-label-admin">
                  <i className="fa fa-image btn-mr-8"></i>
                  Logo yuklash
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
                  <i className={`fa fa-${saving ? 'spinner fa-spin' : 'check'} btn-mr-8`}></i>
                  {saving ? 'Yaratilmoqda...' : 'Sayt yaratish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default CreateSitePage;

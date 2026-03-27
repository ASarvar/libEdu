"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface Site {
  id: string;
  name: string;
  subdomain: string;
}

interface NewsEditPageProps {
  user: User;
}

const NewsEditPage: React.FC<NewsEditPageProps> = ({ user }) => {
  const router = useRouter();
  const params = useParams();
  const newsId = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);

  const [formData, setFormData] = useState({
    site_id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    is_published: false,
  });

  useEffect(() => {
    if (newsId) {
      fetchNews();
    }
    if (user.role === 'superadmin') {
      fetchSites();
    }
  }, [newsId, user.role]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/admin/news/${newsId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          site_id: data.news.site_id,
          title: data.news.title,
          slug: data.news.slug,
          excerpt: data.news.excerpt || '',
          content: data.news.content,
          cover_image: data.news.cover_image || '',
          is_published: data.news.is_published,
        });
      } else {
        alert('Yangilik topilmadi');
        router.push('/admin/news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Yangilikni yuklashda xatolik yuz berdi');
      router.push('/admin/news');
    } finally {
      setLoading(false);
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
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('image', file);

      const response = await fetch('/api/admin/upload-news-image', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, cover_image: data.path }));
      } else {
        const data = await response.json();
        alert(data.error || 'Rasmni yuklash muvaffaqiyatsiz tugadi');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Rasmni yuklash muvaffaqiyatsiz tugadi');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert('Sarlavha va matn kiritilishi shart');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/news/${newsId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/news');
      } else {
        const data = await response.json();
        alert(data.error || 'Yangilikni yangilash muvaffaqiyatsiz tugadi');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Yangilikni yangilash muvaffaqiyatsiz tugadi');
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

  return (
    <AdminLayout>
      <section className="admin-dashboard section-padding">
        <div className="auto-container">
          <div className="sec-title text-center mb-40">
            <h2>Maqolani tahrirlash</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="admin-form-wrapper">
                <form onSubmit={handleSubmit}>
                  {user.role === 'superadmin' && (
                    <div className="form-group mb-30">
                      <label>Sayt *</label>
                      <select
                        name="site_id"
                        value={formData.site_id}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                        required
                      >
                        <option value="">Saytni tanlang</option>
                        {sites.map(site => (
                          <option key={site.id} value={site.id}>
                            {site.name} ({site.subdomain})
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                        Yaratilgandan keyin saytni o'zgartirib bo'lmaydi
                      </small>
                    </div>
                  )}

                  <div className="form-group mb-30">
                    <label>Sarlavha *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Maqola sarlavhasini kiriting"
                      required
                    />
                  </div>

                  <div className="form-group mb-30">
                    <label>Slug *</label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="url-uchun-qulay-slug"
                      required
                    />
                    <small className="form-text text-muted">
                      Sarlavhaning URL uchun qulay ko'rinishi
                    </small>
                  </div>

                  <div className="form-group mb-30">
                    <label>Qisqacha mazmun</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      className="form-control"
                      rows={3}
                      placeholder="Qisqa tavsif (ixtiyoriy)"
                    />
                  </div>

                  <div className="form-group mb-30">
                    <label>Matn *</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      className="form-control"
                      rows={15}
                      placeholder="Maqola matnini yozing..."
                      required
                    />
                  </div>

                  <div className="form-group mb-30">
                    <label>Muqova rasmi</label>
                    {formData.cover_image && (
                      <div className="mb-20">
                        <img
                          src={formData.cover_image}
                          alt="Muqova"
                          style={{ 
                            maxWidth: '300px', 
                            maxHeight: '200px', 
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="form-control"
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <small className="form-text text-info">
                        <i className="fa fa-spinner fa-spin"></i> Yuklanmoqda...
                      </small>
                    )}
                    <small className="form-text text-muted">
                      Tavsiya etilgan o'lcham: 1200x630px (JPG, PNG, WebP, GIF - maksimum 5MB)
                    </small>
                  </div>

                  <div className="form-group mb-30">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="is_published"
                        checked={formData.is_published}
                        onChange={handleChange}
                      />
                      <span className="ms-2">Nashr qilingan</span>
                    </label>
                    <small className="form-text text-muted d-block mt-2">
                      Qoralama sifatida saqlash uchun belgini olib tashlang
                    </small>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one"
                      disabled={saving || uploadingImage}
                    >
                      <span className="btn-title">
                        {saving ? 'Saqlanmoqda...' : "O'zgarishlarni saqlash"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="theme-btn btn-style-two ms-3"
                      disabled={saving}
                    >
                      <span className="btn-title">Bekor qilish</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .admin-form-wrapper {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }

        .form-control:disabled {
          background: #f8f9fa;
          cursor: not-allowed;
        }

        textarea.form-control {
          resize: vertical;
          font-family: inherit;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: 400;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid #eee;
        }

        .form-text {
          display: block;
          margin-top: 6px;
          font-size: 13px;
        }

        .text-muted {
          color: #6c757d;
        }

        .text-info {
          color: #17a2b8;
        }
      `}</style>
    </AdminLayout>
  );
};

export default withAdminAuth(NewsEditPage);

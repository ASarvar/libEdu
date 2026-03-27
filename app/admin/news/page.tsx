"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface News {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  is_published: boolean;
  published_at?: string;
  views_count: number;
  created_at: string;
  author_name?: string;
  site_name?: string;
  site_subdomain?: string;
  cover_image?: string;
}

interface NewsManagementPageProps {
  user: User;
}

const NewsManagementPage: React.FC<NewsManagementPageProps> = ({ user }) => {
  const router = useRouter();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data.news);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Haqiqatan ham "${title}" ni o'chirmoqchimisiz?\n\nBu amalni ortga qaytarib bo'lmaydi!`
    );
    
    if (!confirmed) return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNews(news.filter(n => n.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Yangilikni o\'chirishda xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Yangilikni o\'chirishda xatolik yuz berdi');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          is_published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setNews(news.map(n => n.id === id ? data.news : n));
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Mavjud emas';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
            <h2>Yangiliklarni boshqarish</h2>
            <p>Yangilik maqolalari va blog postlaringizni boshqaring</p>
          </div>

          <div className="row mb-30">
            <div className="col-12 text-end">
              <Link href="/admin/news/new" className="theme-btn btn-style-one">
                <span className="btn-title">Yangi maqola qo'shish</span>
              </Link>
            </div>
          </div>

          {news.length === 0 ? (
            <div className="admin-info-alert text-center">
              <i className="fa fa-newspaper"></i>
              <p>Hozircha yangilik maqolalari yo'q. Birinchi maqolangizni yarating!</p>
              <Link href="/admin/news/new" className="theme-btn btn-style-two mt-20">
                <span className="btn-title">Maqola yaratish</span>
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Rasm</th>
                    <th>Sarlavha</th>
                    {user.role === 'superadmin' && <th>Sayt</th>}
                    <th>Muallif</th>
                    <th>Holat</th>
                    <th>Ko'rishlar</th>
                    <th>Nashr qilingan</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((article) => (
                    <tr key={article.id}>
                      <td>
                        {article.cover_image ? (
                          <img 
                            src={article.cover_image} 
                            alt={article.title}
                            style={{ 
                              width: '60px', 
                              height: '40px', 
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                        ) : (
                          <div 
                            style={{ 
                              width: '60px', 
                              height: '40px', 
                              background: '#f0f0f0',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#999'
                            }}
                          >
                            Rasm yo'q
                          </div>
                        )}
                      </td>
                      <td>
                        <strong>{article.title}</strong>
                        {article.excerpt && (
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {article.excerpt.substring(0, 60)}...
                          </div>
                        )}
                      </td>
                      {user.role === 'superadmin' && (
                        <td>{article.site_name || 'Mavjud emas'}</td>
                      )}
                      <td>{article.author_name || 'Noma\'lum'}</td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(article.id, article.is_published)}
                          className={`status-badge ${article.is_published ? 'status-active' : 'status-inactive'}`}
                          style={{ cursor: 'pointer', border: 'none' }}
                        >
                          {article.is_published ? 'Nashr qilingan' : 'Qoralama'}
                        </button>
                      </td>
                      <td>{article.views_count}</td>
                      <td>{formatDate(article.published_at)}</td>
                      <td>
                        <div className="action-buttons">
                          <Link 
                            href={`/admin/news/${article.id}`}
                            className="btn-action btn-edit"
                            title="Tahrirlash"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(article.id, article.title)}
                            className="btn-action btn-delete"
                            disabled={deleteLoading === article.id}
                            title="O'chirish"
                          >
                            {deleteLoading === article.id ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa fa-trash"></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .admin-table {
          width: 100%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .admin-table thead {
          background: #f8f9fa;
        }

        .admin-table th,
        .admin-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .admin-table th {
          font-weight: 600;
          color: #333;
          font-size: 14px;
          text-transform: uppercase;
        }

        .admin-table tbody tr:hover {
          background: #f8f9fa;
        }

        .status-badge {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .status-active {
          background: #d4edda;
          color: #155724;
        }

        .status-inactive {
          background: #fff3cd;
          color: #856404;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .btn-action {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-edit {
          background: #007bff;
          color: white;
        }

        .btn-edit:hover {
          background: #0056b3;
        }

        .btn-delete {
          background: #dc3545;
          color: white;
        }

        .btn-delete:hover {
          background: #c82333;
        }

        .btn-delete:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .admin-info-alert {
          background: #f8f9fa;
          padding: 60px 40px;
          border-radius: 8px;
          text-align: center;
        }

        .admin-info-alert i {
          font-size: 48px;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .admin-info-alert p {
          font-size: 16px;
          color: #666;
          margin: 0;
        }
      `}</style>
    </AdminLayout>
  );
};

export default withAdminAuth(NewsManagementPage);

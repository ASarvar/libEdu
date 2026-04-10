 "use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface Site {
  id: string;
  name: string;
  subdomain: string;
}

interface EventFormPageProps {
  user: User;
}

const EventFormPage: React.FC<EventFormPageProps> = ({ user }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);

  const today = new Date().toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    site_id: "",
    title: "",
    slug: "",
    description: "",
    cover_image: "",
    location: "",
    event_date: today,
    end_date: "",
    is_published: false,
  });

  useEffect(() => {
    if (user.role === "superadmin") {
      fetchSites();
    }
  }, [user.role]);

  const fetchSites = async () => {
    try {
      const response = await fetch("/api/admin/sites");
      if (response.ok) {
        const data = await response.json();
        setSites(data.sites);
      }
    } catch (error) {
      console.error("Error fetching sites:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("image", file);

      const response = await fetch("/api/admin/upload-news-image", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, cover_image: data.path }));
      } else {
        const data = await response.json();
        alert(data.error || "Rasmni yuklash muvaffaqiyatsiz tugadi");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Rasmni yuklash muvaffaqiyatsiz tugadi");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.event_date) {
      alert("Sarlavha, tavsif va tadbir sanasi kiritilishi shart");
      return;
    }

    if (user.role === "superadmin" && !formData.site_id) {
      alert("Iltimos, saytni tanlang");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        event_date: new Date(formData.event_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : undefined,
        cover_image: formData.cover_image || undefined,
        location: formData.location || undefined,
      };

      const response = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/events");
      } else {
        const data = await response.json();
        alert(data.error || "Tadbir yaratilmadi");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Tadbir yaratilmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="admin-dashboard section-padding">
        <div className="auto-container">
          <div className="sec-title text-center mb-40">
            <h2>Yangi tadbir yaratish</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="admin-form-wrapper">
                <form onSubmit={handleSubmit}>
                  {user.role === "superadmin" && (
                    <div className="form-group mb-30">
                      <label>Sayt *</label>
                      <select
                        name="site_id"
                        value={formData.site_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Saytni tanlang</option>
                        {sites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name} ({site.subdomain})
                          </option>
                        ))}
                      </select>
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
                      placeholder="Tadbir sarlavhasini kiriting"
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
                      Sarlavhadan avtomatik yaratiladi
                    </small>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-30">
                        <label>Tadbir boshlanish sanasi va vaqti *</label>
                        <input
                          type="datetime-local"
                          name="event_date"
                          value={formData.event_date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-30">
                        <label>Tadbir tugash sanasi va vaqti</label>
                        <input
                          type="datetime-local"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className="form-control"
                        />
                        <small className="form-text text-muted">Ixtiyoriy</small>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-30">
                    <label>Manzil / Joy</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Masalan: Katta majlislar zali, 3-qavat"
                    />
                  </div>

                  <div className="form-group mb-30">
                    <label>Tadbir tavsifi *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      rows={12}
                      placeholder="Tadbir haqida batafsil ma'lumot..."
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
                            maxWidth: "300px",
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
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
                      Tavsiya etilgan: 1200x630px (JPG, PNG, WebP — maks. 5MB)
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
                      <span className="ms-2">Darhol nashr qilish</span>
                    </label>
                    <small className="form-text text-muted d-block mt-2">
                      Belgilamasdan qoldirsa qoralama sifatida saqlanadi
                    </small>
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one"
                      disabled={loading || uploadingImage}
                    >
                      <span className="btn-title">
                        {loading ? "Yaratilmoqda..." : "Tadbir yaratish"}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="theme-btn btn-style-two ms-3"
                      disabled={loading}
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
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
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
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
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
      `}</style>
    </AdminLayout>
  );
};

export default withAdminAuth(EventFormPage);

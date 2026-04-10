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

interface EventEditPageProps {
  user: User;
}

const EventEditPage: React.FC<EventEditPageProps> = ({ user }) => {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);

  const [formData, setFormData] = useState({
    site_id: "",
    title: "",
    slug: "",
    description: "",
    cover_image: "",
    location: "",
    event_date: "",
    end_date: "",
    is_published: false,
  });

  useEffect(() => {
    if (eventId) fetchEvent();
    if (user.role === "superadmin") fetchSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, user.role]);

  const toLocalDatetimeValue = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}`);
      if (response.ok) {
        const data = await response.json();
        const evt = data.event;
        setFormData({
          site_id: evt.site_id,
          title: evt.title,
          slug: evt.slug,
          description: evt.description,
          cover_image: evt.cover_image || "",
          location: evt.location || "",
          event_date: toLocalDatetimeValue(evt.event_date),
          end_date: toLocalDatetimeValue(evt.end_date),
          is_published: evt.is_published,
        });
      } else {
        alert("Tadbir topilmadi");
        router.push("/admin/events");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      router.push("/admin/events");
    } finally {
      setLoading(false);
    }
  };

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
        alert("Rasmni yuklash muvaffaqiyatsiz tugadi");
      }
    } catch {
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

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        cover_image: formData.cover_image || null,
        location: formData.location || null,
        event_date: new Date(formData.event_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
        is_published: formData.is_published,
      };

      const response = await fetch(`/api/admin/events/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/events");
      } else {
        const data = await response.json();
        alert(data.error || "Tadbirni yangilashda xatolik");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Tadbirni yangilashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center p-5">
          <div className="spinner-border" role="status"></div>
          <p className="mt-3">Yuklanmoqda...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="admin-dashboard section-padding">
        <div className="auto-container">
          <div className="sec-title text-center mb-40">
            <h2>Tadbirni tahrirlash</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="admin-form-wrapper">
                <form onSubmit={handleSubmit}>
                  {user.role === "superadmin" && (
                    <div className="form-group mb-30">
                      <label>Sayt</label>
                      <select
                        name="site_id"
                        value={formData.site_id}
                        onChange={handleChange}
                        className="form-control"
                        disabled
                      >
                        <option value={formData.site_id}>{formData.site_id}</option>
                        {sites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name} ({site.subdomain})
                          </option>
                        ))}
                      </select>
                      <small className="form-text text-muted">
                      Saytni o&apos;zgartirish mumkin emas
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
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-30">
                        <label>Boshlanish sanasi va vaqti *</label>
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
                        <label>Tugash sanasi va vaqti</label>
                        <input
                          type="datetime-local"
                          name="end_date"
                          value={formData.end_date}
                          onChange={handleChange}
                          className="form-control"
                        />
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
                      placeholder="Masalan: Katta majlislar zali"
                    />
                  </div>

                  <div className="form-group mb-30">
                    <label>Tavsif *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      rows={12}
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
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, cover_image: "" }))}
                          style={{
                            display: "block",
                            marginTop: "8px",
                            background: "none",
                            border: "1px solid #d32f2f",
                            color: "#d32f2f",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Rasmni olib tashlash
                        </button>
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
                  </div>

                  <div className="form-actions">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one"
                      disabled={saving || uploadingImage}
                    >
                      <span className="btn-title">
                        {saving ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
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

export default withAdminAuth(EventEditPage);

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface Event {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  location?: string;
  event_date: string;
  end_date?: string;
  is_published: boolean;
  created_at: string;
  creator_name?: string;
  site_name?: string;
  site_subdomain?: string;
  cover_image?: string;
}

interface EventsManagementPageProps {
  user: User;
}

const EventsManagementPage: React.FC<EventsManagementPageProps> = ({ user }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/admin/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Haqiqatan ham "${title}" tadbirini o'chirmoqchimisiz?\n\nBu amalni ortga qaytarib bo'lmaydi!`
    );
    if (!confirmed) return;

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (response.ok) {
        setEvents(events.filter((e) => e.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || "Tadbirni o'chirishda xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Tadbirni o'chirishda xatolik yuz berdi");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !currentStatus }),
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(events.map((e) => (e.id === id ? data.event : e)));
      }
    } catch (error) {
      console.error("Error toggling publish status:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isUpcoming = (dateString: string) => new Date(dateString) >= new Date();

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
          <div className="d-flex justify-content-between align-items-center mb-40">
            <div className="sec-title">
              <h2>Tadbirlar boshqaruvi</h2>
              <p>Jami: {events.length} ta tadbir</p>
            </div>
            <Link href="/admin/events/new" className="theme-btn btn-style-one">
              <span className="btn-title">+ Yangi tadbir</span>
            </Link>
          </div>

          {events.length === 0 ? (
            <div className="text-center p-5">
              <h4>Hozircha tadbirlar yo&apos;q</h4>
              <p className="mt-2 mb-4">Birinchi tadbiringizni yarating</p>
              <Link href="/admin/events/new" className="theme-btn btn-style-one">
                <span className="btn-title">Tadbir yaratish</span>
              </Link>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: "80px" }}>Rasm</th>
                    <th>Sarlavha</th>
                    {user.role === "superadmin" && <th>Sayt</th>}
                    <th>Sana</th>
                    <th>Manzil</th>
                    <th>Status</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>
                        <img
                          src={event.cover_image || "/images/home-1/news/news-01.jpg"}
                          alt={event.title}
                          style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{event.title}</div>
                        <small style={{ color: "#666" }}>/{event.slug}</small>
                      </td>
                      {user.role === "superadmin" && (
                        <td>
                          <span style={{ fontSize: "13px" }}>
                            {event.site_name || event.site_subdomain || "—"}
                          </span>
                        </td>
                      )}
                      <td>
                        <div style={{ fontSize: "13px" }}>
                          {formatDate(event.event_date)}
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "2px 6px",
                            borderRadius: "3px",
                            background: isUpcoming(event.event_date) ? "#e8f5e9" : "#f5f5f5",
                            color: isUpcoming(event.event_date) ? "#2e7d32" : "#666",
                          }}
                        >
                          {isUpcoming(event.event_date) ? "Kelgusi" : "O'tgan"}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: "13px" }}>{event.location || "—"}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(event.id, event.is_published)}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                            background: event.is_published ? "#e8f5e9" : "#fff3e0",
                            color: event.is_published ? "#2e7d32" : "#e65100",
                          }}
                        >
                          {event.is_published ? "✓ Nashr" : "○ Qoralama"}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <Link
                            href={`/events/${event.slug}`}
                            target="_blank"
                            style={{ fontSize: "12px", color: "#1976d2" }}
                            title="Ko'rish"
                          >
                            <i className="fa fa-eye"></i>
                          </Link>
                          <Link
                            href={`/admin/events/${event.id}`}
                            style={{ fontSize: "12px", color: "#388e3c" }}
                            title="Tahrirlash"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.title)}
                            disabled={deleteLoading === event.id}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "12px",
                              color: "#d32f2f",
                              padding: 0,
                            }}
                            title="O'chirish"
                          >
                            {deleteLoading === event.id ? (
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
        .admin-table-wrapper {
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th,
        .admin-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }
        .admin-table th {
          background: #f8f9fa;
          font-weight: 600;
          font-size: 13px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .admin-table tr:hover {
          background: #fafafa;
        }
        .admin-table tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </AdminLayout>
  );
};

export default withAdminAuth(EventsManagementPage);

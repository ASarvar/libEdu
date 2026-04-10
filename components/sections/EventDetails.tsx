"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  location?: string;
  event_date: string;
  end_date?: string;
  creator_name?: string;
  created_at: string;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  description_uz?: string;
  description_ru?: string;
  description_en?: string;
}

interface EventDetailsProps {
  slug: string;
}

function EventDetails({ slug }: EventDetailsProps) {
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchEvent();
      fetchUpcomingEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
      } else {
        setEvent(null);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        const upcoming = (data.events as Event[])
          .filter((e) => e.slug !== slug && new Date(e.event_date) >= new Date())
          .slice(0, 4);
        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  const formatDate = (dateString: string, locale?: string) => {
    const date = new Date(dateString);
    const loc = locale || i18n.language || "uz-UZ";
    return date.toLocaleDateString(loc === "uz" ? "uz-UZ" : loc === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getLocalizedField = (event: Event, field: "title" | "description") => {
    const lang = i18n.language || "uz";
    if (lang === "uz") return (event as any)[`${field}_uz`] || event[field];
    if (lang === "ru") return (event as any)[`${field}_ru`] || event[field];
    if (lang === "en") return (event as any)[`${field}_en`] || event[field];
    return event[field];
  };

  const isUpcoming = (dateString: string) => new Date(dateString) >= new Date();

  if (loading) {
    return (
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">{t("common.loading")}</span>
            </div>
            <p className="mt-3">{t("events.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="text-center">
            <h2>{t("events.eventNotFound")}</h2>
            <p>{t("events.eventNotFoundDesc")}</p>
            <Link href="/events" className="theme-btn btn-style-one mt-30">
              <span className="btn-title">{t("events.backToEvents")}</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const title = getLocalizedField(event, "title");
  const description = getLocalizedField(event, "description");
  const upcoming = isUpcoming(event.event_date);

  return (
    <section className="blog-details section-padding">
      <div className="auto-container">
        <div className="row">
          {/* Main content */}
          <div className="col-xl-8 col-lg-7">
            <div className="blog-details__left">
              {event.cover_image && (
                <div className="blog-details__img">
                  <img src={event.cover_image} alt={title} />
                </div>
              )}
              <div className="blog-details__content">
                {/* Meta info */}
                <ul className="list-unstyled blog-details__meta">
                  <li>
                    <span className="blog-details__meta-icon">
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {formatDate(event.event_date)}
                      {event.end_date && event.end_date !== event.event_date && (
                        <> — {formatDate(event.end_date)}</>
                      )}
                    </span>
                  </li>
                  {event.location && (
                    <li>
                      <span className="blog-details__meta-icon">
                        <i className="fas fa-map-marker-alt"></i> {event.location}
                      </span>
                    </li>
                  )}
                  <li>
                    <span
                      style={{
                        display: "inline-block",
                        background: upcoming ? "var(--theme-color1, #144443)" : "#888",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: "3px",
                      }}
                    >
                      {upcoming ? t("events.upcoming") : t("events.past")}
                    </span>
                  </li>
                </ul>

                <h3 className="blog-details__title">{title}</h3>

                <div
                  className="blog-details__text-2"
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              </div>

              {/* Share */}
              <div className="blog-details__bottom">
                <p className="blog-details__tags">
                  <span>{t("events.share")}</span>
                </p>
                <div className="blog-details__social-list">
                  <a
                    href={`https://t.me/share/url?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-telegram"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-30">
                <Link href="/events" className="theme-btn btn-style-one">
                  <span className="btn-title">
                    <i className="fas fa-arrow-left me-2"></i>
                    {t("events.backToEvents")}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-xl-4 col-lg-5">
            <div className="sidebar-page-container__right">
              {/* Event Info Card */}
              <div className="sidebar__single sidebar__post mb-40">
                <h3 className="sidebar__title">{t("events.eventInfo")}</h3>
                <ul className="list-unstyled" style={{ lineHeight: "2" }}>
                  <li>
                    <i className="fas fa-calendar-alt me-2" style={{ color: "var(--theme-color1)" }}></i>
                    <strong>{t("events.startDate")}:</strong>{" "}
                    {formatDate(event.event_date)}
                  </li>
                  {event.end_date && (
                    <li>
                      <i className="fas fa-calendar-check me-2" style={{ color: "var(--theme-color1)" }}></i>
                      <strong>{t("events.endDate")}:</strong>{" "}
                      {formatDate(event.end_date)}
                    </li>
                  )}
                  {event.location && (
                    <li>
                      <i className="fas fa-map-marker-alt me-2" style={{ color: "var(--theme-color1)" }}></i>
                      <strong>{t("events.location")}:</strong> {event.location}
                    </li>
                  )}
                  {event.creator_name && (
                    <li>
                      <i className="fas fa-user me-2" style={{ color: "var(--theme-color1)" }}></i>
                      <strong>{t("events.organizer")}:</strong> {event.creator_name}
                    </li>
                  )}
                </ul>
              </div>

              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="sidebar__single sidebar__post">
                  <h3 className="sidebar__title">{t("events.upcomingEvents")}</h3>
                  <ul className="sidebar__post-list list-unstyled">
                    {upcomingEvents.map((e) => (
                      <li key={e.id}>
                        <div className="sidebar__post-image">
                          <img
                            src={e.cover_image || "/images/home-1/news/news-01.jpg"}
                            alt={e.title}
                          />
                        </div>
                        <div className="sidebar__post-content">
                          <h4 className="sidebar__post-title">
                            <Link href={`/events/${e.slug}`}>{e.title}</Link>
                          </h4>
                          <span className="sidebar__post-date">
                            <i className="fas fa-calendar-alt me-1"></i>
                            {formatDate(e.event_date)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;

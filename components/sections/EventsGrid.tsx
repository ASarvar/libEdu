"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  is_published: boolean;
}

const EventsGrid = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("uz-UZ", { month: "short" }),
      full: date.toLocaleDateString("uz-UZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const isUpcoming = (dateString: string) => new Date(dateString) >= new Date();

  if (loading) {
    return (
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="text-center">
            <div className="spinner"></div>
            <p>{t("events.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="text-center">
            <h3>{t("events.noEvents")}</h3>
            <p>{t("events.checkBack")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-secton section-padding fix">
      <div className="auto-container">
        <div className="row g-4">
          {events.map((event, index) => {
            const date = formatDate(event.event_date);
            const upcoming = isUpcoming(event.event_date);
            return (
              <div
                key={event.id}
                className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`.${3 + index * 2}s`}
              >
                <div className="news-box-items mt-0">
                  <div className="news-image" style={{ position: "relative" }}>
                    <img
                      src={event.cover_image || "/images/home-1/news/news-01.jpg"}
                      alt={event.title}
                    />
                    <img
                      src={event.cover_image || "/images/home-1/news/news-01.jpg"}
                      alt={event.title}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: upcoming ? "var(--theme-color1, #144443)" : "#888",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: "3px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {upcoming ? t("events.upcoming") : t("events.past")}
                    </span>
                  </div>
                  <div className="news-content">
                    <ul className="comments-list">
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path d="M14.25 2.25H13.5V0.75H12V2.25H6V0.75H4.5V2.25H3.75A1.5 1.5 0 0 0 2.25 3.75V15.75A1.5 1.5 0 0 0 3.75 17.25H14.25A1.5 1.5 0 0 0 15.75 15.75V3.75A1.5 1.5 0 0 0 14.25 2.25ZM14.25 15.75H3.75V6.75H14.25V15.75Z" fill="#144443" />
                        </svg>
                        {date.full}
                      </li>
                      {event.location && (
                        <li>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M9 1.5C6.515 1.5 4.5 3.515 4.5 6C4.5 9.375 9 16.5 9 16.5C9 16.5 13.5 9.375 13.5 6C13.5 3.515 11.485 1.5 9 1.5ZM9 7.5C8.175 7.5 7.5 6.825 7.5 6C7.5 5.175 8.175 4.5 9 4.5C9.825 4.5 10.5 5.175 10.5 6C10.5 6.825 9.825 7.5 9 7.5Z" fill="#144443" />
                          </svg>
                          {event.location}
                        </li>
                      )}
                    </ul>
                    <h3>
                      <Link href={`/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </h3>
                    <p className="text">
                      {event.description.length > 120
                        ? event.description.substring(0, 120) + "..."
                        : event.description}
                    </p>
                    <div className="footer-btn">
                      <Link href={`/events/${event.slug}`} className="read-btn">
                        {t("events.readMore")}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10.833 5L15.833 10L10.833 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;

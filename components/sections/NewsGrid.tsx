"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover_image?: string;
  author_name?: string;
  published_at?: string;
  views_count: number;
}

const NewsSection = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return { day: '01', month: 'Jan' };
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
    };
  };

  if (loading) {
    return (
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="text-center">
            <div className="spinner"></div>
            <p>{t('news.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="text-center">
            <h3>{t('news.noArticles')}</h3>
            <p>{t('news.checkBack')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-secton section-padding fix">
      <div className="auto-container">
        <div className="row g-4">
          {news.map((article, index) => {
            const date = formatDate(article.published_at);
            return (
              <div
                key={article.id}
                className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`.${3 + index * 2}s`}
              >
                <div className="news-box-items mt-0">
                  <div className="news-image">
                    <img
                      src={article.cover_image || "/images/home-1/news/news-01.jpg"}
                      alt={article.title}
                    />
                    <img
                      src={article.cover_image || "/images/home-1/news/news-01.jpg"}
                      alt={article.title}
                    />
                    {/* <span className="post-box">
                      <span className="date">{date.day}</span>
                      <span className="month">{date.month}</span>
                    </span> */}
                  </div>
                  <div className="news-content">
                    <ul className="comments-list">
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                            stroke="#144443"
                          />
                          <path
                            d="M9 4.5V9L12 10.5"
                            stroke="#144443"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : t('news.unpublished')}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <path
                            d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                            stroke="#144443"
                          />
                          <path
                            d="M9 4.5V9L12 10.5"
                            stroke="#144443"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {article.views_count} {t('news.views')}
                      </li>
                    </ul>
                    <h3>
                      <Link href={`/news-details/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    {article.excerpt && (
                      <p className="news-excerpt">
                        {article.excerpt.substring(0, 120)}
                        {article.excerpt.length > 120 ? '...' : ''}
                      </p>
                    )}
                    <Link href={`/news-details/${article.slug}`} className="link-btn">
                      {t('news.learnMore')}
                      <span className="icon">
                        <i className="lnr-icon-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .news-excerpt {
            margin: 15px 0;
            color: #666;
            line-height: 1.6;
          }

          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default NewsSection;

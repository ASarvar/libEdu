"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  author_name?: string;
  published_at?: string;
  views_count: number;
  created_at: string;
}

interface BlogDetailsProps {
  slug: string;
}

function NewsDetails({ slug }: BlogDetailsProps) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchNews();
    }
  }, [slug]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setNews(data.news);
      } else {
        setNews(null);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="text-center">
            <div className="spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
        <style jsx>{`
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  }

  if (!news) {
    return (
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="text-center">
            <h2>Article Not Found</h2>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/news" className="theme-btn btn-style-one mt-30">
              <span className="btn-title">Back to News</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="blog-details__left">
                {news.cover_image && (
                  <div className="blog-details__img">
                    <img src={news.cover_image} alt={news.title} />
                    <div className="blog-details__date">
                      <span className="day">
                        {new Date(news.published_at || news.created_at).getDate()}
                      </span>
                      <span className="month">
                        {new Date(news.published_at || news.created_at).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>
                  </div>
                )}
                <div className="blog-details__content">
                  <ul className="list-unstyled blog-details__meta">
                    <li>
                      <i className="fa fa-user"></i> {news.author_name || 'Admin'}
                    </li>
                    <li>
                      <i className="fa fa-calendar"></i> {formatDate(news.published_at)}
                    </li>
                    <li>
                      <i className="fa fa-eye"></i> {news.views_count} Views
                    </li>
                  </ul>
                  <h3 className="blog-details__title">{news.title}</h3>
                  <div
                    className="blog-details__text"
                    style={{ whiteSpace: 'pre-wrap' }}
                    dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br />') }}
                  />
                </div>
                <div className="blog-details__bottom">
                  <div className="blog-details__social-list">
                    <Link href="/news" className="theme-btn btn-style-two">
                      <span className="btn-title">
                        <i className="fa fa-arrow-left"></i> Back to News
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-details__meta li {
          display: inline-block;
          margin-right: 20px;
          color: #666;
        }

        .blog-details__meta i {
          margin-right: 8px;
          color: #144443;
        }

        .blog-details__text {
          line-height: 1.8;
          color: #666;
          margin-top: 20px;
        }

        .blog-details__title {
          margin-bottom: 20px;
          font-size: 32px;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}

export default NewsDetails;

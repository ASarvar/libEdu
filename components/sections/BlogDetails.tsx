"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [news, setNews] = useState<News | null>(null);
  const [latestPosts, setLatestPosts] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchNews();
      fetchLatestPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      console.error("Error fetching news:", error);
      setNews(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestPosts = async () => {
    try {
      const response = await fetch("/api/news?limit=3");
      if (response.ok) {
        const data = await response.json();
        setLatestPosts(data.news || []);
      }
    } catch (error) {
      console.error("Error fetching latest posts:", error);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return { day: "01", month: "Jan", full: "N/A" };
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      full: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  if (loading) {
    return (
      <>
        <section className="blog-details section-padding">
          <div className="auto-container">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">{t('common.loading')}</span>
              </div>
              <p className="mt-3">{t('news.loadingArticle')}</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!news) {
    return (
      <>
        <section className="blog-details section-padding">
          <div className="auto-container">
            <div className="text-center">
              <h2>{t('news.articleNotFound')}</h2>
              <p>{t('news.articleNotFoundDesc')}</p>
              <Link href="/news" className="theme-btn btn-style-one mt-30">
                <span className="btn-title">{t('news.backToNews')}</span>
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const publishDate = formatDate(news.published_at || news.created_at);

  return (
    <>
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">
                <div className="blog-details__img">
                  <img
                    src={
                      news.cover_image ||
                      "images/inner/news-details/news-details.jpg"
                    }
                    alt={news.title}
                  />
                  {/* <div className="blog-details__date">
                    <span className="day">{publishDate.day}</span>
                    <span className="month">{publishDate.month}</span>
                  </div> */}
                </div>
                <div className="blog-details__content">
                  <ul className="list-unstyled blog-details__meta">
                    <li>
                      <span className="blog-details__meta-icon">
                        <i className="fas fa-clock"></i>{" "}
                        {new Date(news.published_at || news.created_at).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>{" "}
                    </li>
                    <li>
                      <Link href="#comments">
                        <i className="fas fa-eye"></i> {news.views_count} {t('news.views')}
                      </Link>
                    </li>
                  </ul>
                  <h3 className="blog-details__title">{news.title}</h3>
                  {news.excerpt && (
                    <p
                      className="blog-details__text-2"
                      style={{ fontWeight: 500, fontSize: "1.1em" }}
                    >
                      {news.excerpt}
                    </p>
                  )}
                  <div
                    className="blog-details__text-2"
                    style={{ whiteSpace: "pre-wrap" }}
                    dangerouslySetInnerHTML={{
                      __html: news.content.replace(/\n/g, "<br />"),
                    }}
                  />
                </div>
                <div className="blog-details__bottom">
                  <p className="blog-details__tags">
                    {" "}
                    <span>{t('news.tags')}</span> <Link href="/news">Business</Link>{" "}
                    <Link href="/news">Agency</Link>{" "}
                  </p>
                  <div className="blog-details__social-list">
                    {" "}
                    <Link
                      href={`https://twitter.com/intent/tweet?url=${typeof window !== "undefined" ? window.location.href : ""}&text=${news.title}`}
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </Link>{" "}
                    <Link
                      href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`}
                      target="_blank"
                    >
                      <i className="fab fa-facebook"></i>
                    </Link>{" "}
                    <Link
                      href={`https://pinterest.com/pin/create/button/?url=${typeof window !== "undefined" ? window.location.href : ""}`}
                      target="_blank"
                    >
                      <i className="fab fa-pinterest-p"></i>
                    </Link>{" "}
                    <Link href="/news">
                      <i className="fab fa-instagram"></i>
                    </Link>{" "}
                  </div>
                </div>
                <div className="nav-links">
                  <div className="prev">
                    <Link href="/news" rel="prev">
                      ← {t('news.backToNewsGrid')}
                    </Link>
                  </div>
                  <div className="next">
                    <Link href="/news" rel="next">
                      {t('news.viewAllArticles')} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5">
              <div className="sidebar">
                <div className="sidebar__single sidebar__search">
                  <form action="#" className="sidebar__search-form">
                    <input type="search" placeholder={t('common.search')} />
                    <button type="submit">
                      <i className="far fa-search"></i>
                    </button>
                  </form>
                </div>
                <div className="sidebar__single sidebar__post">
                  <h3 className="sidebar__title">{t('news.latestPosts')}</h3>
                  <ul className="sidebar__post-list list-unstyled">
                    {latestPosts.length > 0 ? (
                      latestPosts.map((post) => {
                        const postDate = formatDate(
                          post.published_at || post.created_at,
                        );
                        return (
                          <li key={post.id}>
                            <div className="sidebar__post-image">
                              {" "}
                              <img
                                src={
                                  post.cover_image ||
                                  "images/inner/news-details/blog1-1.jpg"
                                }
                                alt={post.title}
                              />{" "}
                            </div>
                            <div className="sidebar__post-content">
                              <h3>
                                {" "}
                                <span className="sidebar__post-content-meta">
                                  {/* <i className="fas fa-user-circle"></i>{post.published_at} */}
                                </span>{" "}
                                <Link href={`/news-details/${post.slug}`}>
                                  {post.title}
                                </Link>
                              </h3>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li>
                          <div className="sidebar__post-image">
                            {" "}
                            <img
                              src="images/inner/news-details/blog1-1.jpg"
                              alt=""
                            />{" "}
                          </div>
                          <div className="sidebar__post-content">
                            <h3>
                              {" "}
                              <span className="sidebar__post-content-meta">
                                <i className="fas fa-user-circle"></i>Admin
                              </span>{" "}
                              <Link href="/news-details">
                                How Scale Your Business Without Losing Quality
                              </Link>
                            </h3>
                          </div>
                        </li>
                        <li>
                          <div className="sidebar__post-image">
                            {" "}
                            <img
                              src="images/inner/news-details/blog1-2.jpg"
                              alt=""
                            />{" "}
                          </div>
                          <div className="sidebar__post-content">
                            <h3>
                              {" "}
                              <span className="sidebar__post-content-meta">
                                <i className="fas fa-user-circle"></i>Admin
                              </span>{" "}
                              <Link href="/news-details">
                                Why Networking is Crucial for Business Growth
                              </Link>{" "}
                            </h3>
                          </div>
                        </li>
                        <li>
                          <div className="sidebar__post-image">
                            {" "}
                            <img
                              src="images/inner/news-details/blog1-3.jpg"
                              alt=""
                            />{" "}
                          </div>
                          <div className="sidebar__post-content">
                            <h3>
                              {" "}
                              <span className="sidebar__post-content-meta">
                                <i className="fas fa-user-circle"></i>Admin
                              </span>{" "}
                              <Link href="/news-details">
                                10 Proven Strategies to Scale
                              </Link>{" "}
                            </h3>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="sidebar__single sidebar__category">
                  <h3 className="sidebar__title">{t('news.categories')}</h3>
                  <ul className="sidebar__category-list list-unstyled">
                    <li>
                      <Link href="/news">
                        Customer Engagement
                        <span className="icon-right-arrow"></span>
                      </Link>{" "}
                    </li>
                    <li className="active">
                      <Link href="/news">
                        Entrepreneurship
                        <span className="icon-right-arrow"></span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        Finance<span className="icon-right-arrow"></span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link href="/news">
                        Investment<span className="icon-right-arrow"></span>
                      </Link>{" "}
                    </li>
                    <li>
                      <Link href="/news">
                        Management<span className="icon-right-arrow"></span>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
                <div className="sidebar__single sidebar__tags">
                  <h3 className="sidebar__title">{t('news.tags')}</h3>
                  <div className="sidebar__tags-list">
                    {" "}
                    <Link href="/news">Advisor</Link>{" "}
                    <Link href="/news">Branding</Link>{" "}
                    <Link href="/news">Economy</Link>{" "}
                    <Link href="/news">Experience</Link>{" "}
                    <Link href="/news">Freelancing</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsDetails;

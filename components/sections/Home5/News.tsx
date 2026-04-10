"use client";
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';


function News (){
  const { t } = useTranslation();

  return (
    <>
      <section id="news" className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {t('newsSection.subtitle')}
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">{t('newsSection.title')}</h2>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="news-box-items">
                <div className="news-image">
                  <img src="images/home-1/news/news-01.jpg" alt="img" />
                  <img src="images/home-1/news/news-01.jpg" alt="img" />
                  <span className="post-box">
                    <span className="date">{t('newsSection.news1.date')}</span>
                    <span className="month">{t('newsSection.news1.month')}</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li><i className="lnr-icon-user1"></i> {t('newsSection.author')}</li>
                    <li><i className="lnr-icon-comment"></i> 3 {t('newsSection.comments')}</li>
                  </ul>
                  <h3>
                    <Link href="/news">{t('newsSection.news1.title')}</Link>
                  </h3>
                  <Link href="/news" className="link-btn">
                    {t('newsSection.learnMore')}
                    <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="news-box-items">
                <div className="news-image">
                  <img src="images/home-1/news/news-02.jpg" alt="img" />
                  <img src="images/home-1/news/news-02.jpg" alt="img" />
                  <span className="post-box">
                    <span className="date">{t('newsSection.news2.date')}</span>
                    <span className="month">{t('newsSection.news2.month')}</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li><i className="lnr-icon-user1"></i> {t('newsSection.author')}</li>
                    <li><i className="lnr-icon-comment"></i> 3 {t('newsSection.comments')}</li>
                  </ul>
                  <h3>
                    <Link href="/news">{t('newsSection.news2.title')}</Link>
                  </h3>
                  <Link href="/news" className="link-btn">
                    {t('newsSection.learnMore')}
                    <span className="icon">
                      <i className="lnr-icon-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="news-box-items">
                <div className="news-image">
                  <img src="images/home-1/news/news-03.jpg" alt="img" />
                  <img src="images/home-1/news/news-03.jpg" alt="img" />
                  <span className="post-box">
                    <span className="date">{t('newsSection.news3.date')}</span>
                    <span className="month">{t('newsSection.news3.month')}</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li><i className="lnr-icon-user1"></i> {t('newsSection.author')}</li>
                    <li><i className="lnr-icon-comment"></i> 3 {t('newsSection.comments')}</li>
                  </ul>
                  <h3>
                    <Link href="/news">{t('newsSection.news3.title')}</Link>
                  </h3>
                  <Link href="/news" className="link-btn">
                    {t('newsSection.learnMore')}
                    <span className="icon">
                      <i className="lnr-icon-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
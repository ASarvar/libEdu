"use client";
import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import BannerImage from '../../../public/images/home-1/hero/banner-1.jpg';
import BannerShape2 from '../../../public/images/home-1/shape-2.png';
import BannerShape1 from '../../../public/images/home-1/shape-1.png';
import BannerShape3 from '../../../public/images/home-1/shape-3.png';


function Banner() {
  const { t } = useTranslation();
  
  return (
      <section id="home" className="hero-section hero-1">
        <div className="hero-image wow img-custom-anim-right">
          <Image src={BannerImage} alt="img" priority placeholder="blur" />
        </div>
        <div className="shape-1 float-bob-x">
          <Image src={BannerShape1} alt="img" loading="lazy" />
        </div>
        <div className="shape-3">
          <Image src={BannerShape3} alt="img" loading="lazy" />
        </div>
        <div className="auto-container">
          <div className="row g-4">
            <div className="col-xl-6 col-lg-12">
              <div className="hero-content">
                <h6 className="wow fadeInUp">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M15 12.5H23.75L10 27.5L13.75 16.25H6.25L16.25 2.5L15 12.5Z" fill="white" />
                    </svg>
                  </span>
                  {t('banner.subtitle')}
                </h6>
                <h1 className="wow fadeInUp" data-wow-delay=".2s">{t('banner.title')}</h1>
                <p className="wow fadeInUp" data-wow-delay=".4s">{t('banner.description')}</p>
                <div className="hero-button wow fadeInUp" data-wow-delay=".6s">
                  <Link href="/page-contact" className="theme-btn btn-style-one">
                    {t('banner.cta')}
                    <span className="icon">
                      <i className="flaticon-finance-fi_3385625"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </section>
  );
}

export default Banner;

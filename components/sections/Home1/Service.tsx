"use client";
import React from "react";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import CounterUp from '../../elements/CounterUp';

function Service() {
  const { t } = useTranslation();

  return (
    <>
      <section id="service" className="service-section section-padding fix bg-cover" style={{backgroundImage: 'url(images/service/service-1.jpg)'}}> 
        <span className="ellipse-bg"></span>
        <div className="auto-container">
          <div className="sec-title">
            <div className="row g-4 justify-content-between align-items-center">
              <div className="col-xl-7 col-lg-7">
                <h6 className="text-white sub-title wow fadeInUp">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  {t('serviceSection.subtitle')}
                </h6>
                <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">{t('serviceSection.title')}</h2>
              </div>
              <div className="col-xl-3 col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                <div className="section-counter-content">
                  <h3 className="count-box"><span className="count-text"><CounterUp end={5} /></span>k+</h3>
                  <h6 className="text-white font-size-20 line-height-1 font-weight-400">{t('serviceSection.satisfiedReaders')}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service-wrapper">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="service-card-items">
                <div className="icon"><i className="flaticon-finance-business-expense-svgrepo-com-1"></i></div>
                <div className="content">
                  <h3><Link href="/digital-library">{t('serviceSection.service1.title')}</Link></h3>
                  <p>{t('serviceSection.service1.description')}</p>
                  <Link href="/digital-library" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="service-card-items">
                <div className="icon"><i className=" lnr-icon-layers"></i></div>
                <div className="content">
                  <h3><Link href="/catalog">{t('serviceSection.service2.title')}</Link></h3>
                  <p>{t('serviceSection.service2.description')}</p>
                  <Link href="/catalog" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
              <div className="service-card-items">
                <div className="icon"><i className="flaticon-business-023-lifesaver"></i></div>
                <div className="content">
                  <h3><Link href="/events">{t('serviceSection.service3.title')}</Link></h3>
                  <p>{t('serviceSection.service3.description')}</p>
                  <Link href="/events" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
              <div className="service-card-items">
                <div className="icon"><i className="lnr-icon-folder-open"></i></div>
                <div className="content">
                  <h3><Link href="/contact">{t('serviceSection.service4.title')}</Link></h3>
                  <p>{t('serviceSection.service4.description')}</p>
                  <Link href="/contact" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;

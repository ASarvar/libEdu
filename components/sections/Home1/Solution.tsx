"use client";
import React from "react";
import { useTranslation } from 'react-i18next';

function Solution() {
  const { t } = useTranslation();
  
  return (
    <section className="business-solution-section">
        <div className="container pt-0 pb-0">
          <div className="row g-0">
            <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay=".2s">
              <div className="feature-left-content-1">
                <div className="down-shape">
                  <img src="images/home-1/dawn-2.png" alt="img" />
                </div>
                <div className="spiral-shape">
                  <img src="images/home-1/spiral.png" alt="img" />
                </div>
                <h2 className="text-anim">{t('services.title')}</h2>
                <div className="client-image">
                  <img src="images/home-1/client-1.png" alt="img" />
                  <img src="images/home-1/client-2.png" alt="img" className="icon-2" />
                  <img src="images/home-1/client-3.png" alt="img" className="icon-3" />
                  <img src="images/home-1/client-4.png" alt="img" className="icon-4" />
                </div>
                <h4>{t('services.happyReaders')}</h4>
                <div className="star">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <span>(4.9)</span>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8">
              <div className="row g-4">
                <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                  <div className="feature-business-solution-items-1">
                    <div className="business-image">
                      <img src="images/home-1/business-image-1.jpg" alt="img" />
                      <img src="images/home-1/business-image-1.jpg" alt="img" />
                    </div>
                    <div className="content">
                      <div className="icon">
                        <i className="flaticon-business-028-briefcase"></i>
                      </div>
                      <h3>{t('services.catalog.title')}</h3>
                      <p>{t('services.catalog.description')}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                  <div className="feature-business-solution-items-2">
                    <div className="content">
                      <h3>{t('services.digital.title')}</h3>
                      <p>{t('services.digital.description')}</p>
                <div className="icon"><i className="flaticon-finance-business-expense-svgrepo-com-1"></i></div>
                    </div>
                    <div className="business-image">
                      <img src="images/home-1/business-image-2.jpg" alt="img" />
                      <img src="images/home-1/business-image-2.jpg" alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

export default Solution;
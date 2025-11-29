"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();

  return (
      <section id="contact" className="contact-section fix section-padding">
        <div className="contact-shape">
          <img src="images/home-1/contact/contact-shape.png" alt="img" />
        </div>
        <div className="auto-container">
          <div className="contact-wrapper">
            <div className="row g-4">
              <div className="col-lg-6 col-md-8">
                <div className="contact-content-1">
                  <div className="sec-title mb-0">
                    <h6 className="sub-title text-white wow fadeInUp">
                      <span className="triangle triangle1"></span>
                      <span className="triangle triangle2"></span>
                      {t('contactSection.subtitle')}
                    </h6>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">{t('contactSection.title')}</h2>
                  </div>
                  <form action="#" className="form-box wow fadeInUp" data-wow-delay=".3s">
                    <div className="row g-4">
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="name" placeholder={t('contactSection.fullName')} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="email" placeholder={t('contactSection.email')} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="phone" placeholder={t('contactSection.phone')} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <textarea name="message" id="message" placeholder={t('contactSection.message')}></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <button className="theme-btn btn-style-one w-100" type="submit">{t('contactSection.submitButton')}</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
        <div className="contact-image-1">
          <img src="images/home-1/contact/contact-image.jpg" alt="img" className="wow img-custom-anim-right" />
          <div className="shape-image">
            <img src="images/home-1/contact/shape-1.png" alt="img" />
          </div>
          <div className="contact-info-box float-bob-y">
            <h2>{t('contactSection.questionTitle')}</h2>
            <ul className="contact-list">
              <li>
                <div className="icon">
                  <i className="lnr-icon-phone-handset"></i>
                </div>
                <div className="content">
                  <h3>{t('contactSection.callUs')}</h3>
                  <p><Link href="tel:+998712334567">+998 (71) 233-45-67</Link></p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="lnr-icon-envelope"></i>
                </div>
                <div className="content">
                  <h3>{t('contactSection.mailUs')}</h3>
                  <p><Link href="mailto:info@kutubxona.uz">info@kutubxona.uz</Link></p>
                </div>
              </li>
            </ul>
            <span className="ellipse-bg"></span>
          </div>
        </div>
      </section>
  );
}

export default Contact;
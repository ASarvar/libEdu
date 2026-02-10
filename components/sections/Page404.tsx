"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const Error = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="error-section">
        <div className="auto-container pt-120 pb-70">
          <div className="row">
            <div className="col-xl-12">
              <div className="error-page__inner">
                <div className="error-page__title-box">
                  <h3 className="error-page__sub-title">{t('error.pageNotFound')}</h3>
                </div>
                <p className="error-page__text">
                  {t('error.pageNotFoundDescription')}
                </p>
                <Link href="/" className="theme-btn btn-style-two">
                  <span className="btn-title">{t('error.backToHome')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;

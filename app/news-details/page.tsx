"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NewsDetailsPage() {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <PageTitle title={t('news.title')} />
      <section className="section-padding">
        <div className="auto-container">
          <div className="text-center">
            <h2>{t('news.selectArticle')}</h2>
            <p className="mt-3 mb-4">
              {t('news.browseNewsGrid')}
            </p>
            <Link href="/news" className="theme-btn btn-style-one">
              <span className="btn-title">{t('news.viewAllNews')}</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}


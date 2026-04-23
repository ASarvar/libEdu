"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import NewsGrid from "@/components/sections/NewsGrid";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function NewsGridPage() {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = 'Yangiliklar - Raqamli Kutubxona';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Raqamli kutubxona va kutubxona xizmatlari haqidagi oxirgi yangiliklar.');
  }, []);
  
  return (
    <Layout>
      <PageTitle title={t('news.title')} />
      <NewsGrid />
    </Layout>
  );
}


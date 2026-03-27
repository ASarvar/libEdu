"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import NewsGrid from "@/components/sections/NewsGrid";
import { useTranslation } from "react-i18next";

export default function NewsGridPage() {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <PageTitle title={t('news.title')} />
      <NewsGrid />
    </Layout>
  );
}


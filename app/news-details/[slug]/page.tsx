"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import BlogDetails from "@/components/sections/BlogDetails";
import { useTranslation } from "react-i18next";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function NewsDetailsPage({ params }: PageProps) {
  const { t } = useTranslation();
  const { slug } = use(params);
  
  return (
    <Layout>
      <PageTitle title={t('news.title')} />
      <BlogDetails slug={slug} />
    </Layout>
  );
}

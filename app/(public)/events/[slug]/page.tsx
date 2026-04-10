"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import EventDetails from "@/components/sections/EventDetails";
import { useTranslation } from "react-i18next";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EventDetailsPage({ params }: PageProps) {
  const { t } = useTranslation();
  const { slug } = use(params);

  return (
    <Layout>
      <PageTitle title={t("events.title")} />
      <EventDetails slug={slug} />
    </Layout>
  );
}

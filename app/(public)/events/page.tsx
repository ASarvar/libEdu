"use client";

import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import EventsGrid from "@/components/sections/EventsGrid";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageTitle title={t("events.title")} />
      <EventsGrid />
    </Layout>
  );
}

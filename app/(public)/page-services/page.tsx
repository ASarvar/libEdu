import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ServiceGrid from "@/components/sections/ServiceGrid";

export const metadata = {
  title: "Xizmatlari - Raqamli Kutubxona",
  description: "Raqamli kutubxona orqali taqdim etilayotgan xizmatlari o'rganing.",
};

export default function ServicesPage() {
  return (
    <Layout>
      <PageTitle title="Our Services" />
      <ServiceGrid />
    </Layout>
  );
}


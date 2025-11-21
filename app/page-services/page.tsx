import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ServiceGrid from "@/components/sections/ServiceGrid";

export const metadata = {
  title: "Our Services - Finclix",
  description: "Explore our business and finance consulting services",
};

export default function ServicesPage() {
  return (
    <Layout>
      <PageTitle title="Our Services" />
      <ServiceGrid />
    </Layout>
  );
}


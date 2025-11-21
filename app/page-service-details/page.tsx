import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ServiceDetails from "@/components/sections/ServiceDetails";

export const metadata = {
  title: "Service Details - Finclix",
  description: "Detailed information about our services",
};

export default function ServiceDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Service Details" />
      <ServiceDetails />
    </Layout>
  );
}


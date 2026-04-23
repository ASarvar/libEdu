import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ServiceDetails from "@/components/sections/ServiceDetails";

export const metadata = {
  title: "Xizmat Batafsili - Raqamli Kutubxona",
  description: "Kutubxona xizmatlari haqida batafsil ma'lumot.",
};

export default function ServiceDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Service Details" />
      <ServiceDetails />
    </Layout>
  );
}


import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import PricingInner from "@/components/sections/PricingInner";

export const metadata = {
  title: "Tarif Rejalar - Raqamli Kutubxona",
  description: "Kutubxona xizmatlari uchun mavjud bo'lgan tarif rejalarini tanish.",
};

export default function PricingPage() {
  return (
    <Layout>
      <PageTitle title="Pricing Plans" />
      <PricingInner />
    </Layout>
  );
}


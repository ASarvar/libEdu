import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import PricingInner from "@/components/sections/PricingInner";

export const metadata = {
  title: "Pricing Plans - Finclix",
  description: "Choose the best pricing plan for your business",
};

export default function PricingPage() {
  return (
    <Layout>
      <PageTitle title="Pricing Plans" />
      <PricingInner />
    </Layout>
  );
}


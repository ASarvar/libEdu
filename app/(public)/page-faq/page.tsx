import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import FaqInner from "@/components/sections/FaqInner";

export const metadata = {
  title: "FAQ - Finclix",
  description: "Frequently asked questions",
};

export default function FaqPage() {
  return (
    <Layout>
      <PageTitle title="Frequently Asked Questions" />
      <FaqInner />
    </Layout>
  );
}


import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import FaqInner from "@/components/sections/FaqInner";

export const metadata = {
  title: "Tez-tez So'raladigan Savollar - Raqamli Kutubxona",
  description: "Raqamli kutubxona xizmatlari, bronlash va boshqa savollar boʻyicha javoblar.",
};

export default function FaqPage() {
  return (
    <Layout>
      <PageTitle title="Frequently Asked Questions" />
      <FaqInner />
    </Layout>
  );
}


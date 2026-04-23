import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ContactInner from "@/components/sections/ContactInner";

export const metadata = {
  title: "Aloqa - Raqamli Kutubxona",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function ContactPage() {
  return (
    <Layout>
      <PageTitle title="Contact Us" />
      <ContactInner />
    </Layout>
  );
}


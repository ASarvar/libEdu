import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ContactInner from "@/components/sections/ContactInner";

export const metadata = {
  title: "Contact Us - Finclix",
  description: "Get in touch with us",
};

export default function ContactPage() {
  return (
    <Layout>
      <PageTitle title="Contact Us" />
      <ContactInner />
    </Layout>
  );
}


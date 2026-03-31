import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import Testimonial from "@/components/sections/Home1/Testimonial";

export const metadata = {
  title: "Testimonials - Finclix",
  description: "What our clients say about us",
};

export default function TestimonialPage() {
  return (
    <Layout>
      <PageTitle title="Client Testimonials" />
      <Testimonial />
    </Layout>
  );
}


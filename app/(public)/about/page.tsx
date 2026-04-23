import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import About from "@/components/sections/Home1/About";
import Team from "@/components/sections/Home1/Team";
import Counter from "@/components/sections/Home1/Counter";
import Testimonial from "@/components/sections/Home1/Testimonial";

export const metadata = {
  title: "Biz Haqimizda - Raqamli Kutubxona",
  description: "O'zbekiston Milliy Kutubxonasi va uning raqamli xizmatlari haqida bilib oling.",
};

export default function AboutPage() {
  return (
    <Layout>
      <PageTitle title="About Us" />
      <About />
      <Counter />
    </Layout>
  );
}


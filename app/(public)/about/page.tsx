import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import About from "@/components/sections/Home1/About";
import Team from "@/components/sections/Home1/Team";
import Counter from "@/components/sections/Home1/Counter";
import Testimonial from "@/components/sections/Home1/Testimonial";


export default function AboutPage() {
  return (
    <Layout>
      <PageTitle title="About Us" />
      <About />
      <Counter />
    </Layout>
  );
}


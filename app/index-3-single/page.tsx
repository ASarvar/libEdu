import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home3/Banner";
import About from "@/components/sections/Home3/About";
import Feature from "@/components/sections/Home3/Feature";
import Service from "@/components/sections/Home3/Service";
import Growth from "@/components/sections/Home3/Growth";
import Work from "@/components/sections/Home3/Work";
import Chosee from "@/components/sections/Home3/Chosee";
import Pricing from "@/components/sections/Home3/Pricing";
import Testimonial from "@/components/sections/Home3/Testimonial";
import Team from "@/components/sections/Home3/Team";
import Faqs from "@/components/sections/Home3/Faqs";
import Contact from "@/components/sections/Home3/Contact";
import Feature2 from "@/components/sections/Home3/Feature2";

export const metadata = {
  title: "Home 3 Single Page - Finclix",
  description: "Business & Finance Consulting - Single Page Version",
};

export default function Home3Single() {
  return (
    <Layout HeaderStyle="three" FooterStyle="three" menuType="single">
      <Banner />
      <About />
      <Feature />
      <Service />
      <Growth />
      <Work />
      <Chosee />
      <Pricing />
      <Testimonial />
      <Team />
      <Faqs />
      <Contact />
      <Feature2 />
    </Layout>
  );
}


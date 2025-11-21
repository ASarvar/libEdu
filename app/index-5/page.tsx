import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home5/Banner";
import About from "@/components/sections/Home5/About";
import Feature from "@/components/sections/Home5/Feature";
import ChooseUs from "@/components/sections/Home5/ChooseUs";
import Counter from "@/components/sections/Home5/Counter";
import HzAccordion from "@/components/sections/Home5/HzAccordion";
import Project from "@/components/sections/Home5/Project";
import Team from "@/components/sections/Home5/Team";
import PricingTwo from "@/components/sections/Home5/PricingTwo";
import Testimonial from "@/components/sections/Home5/Testimonial";
import Contact from "@/components/sections/Home5/Contact";

export const metadata = {
  title: "Home 5 - Finclix",
  description: "Business & Finance Consulting",
};

export default function Home5() {
  return (
    <Layout HeaderStyle="five">
      <Banner />
      <About />
      <Feature />
      <ChooseUs />
      <Counter />
      <HzAccordion />
      <Project />
      <Team />
      <PricingTwo />
      <Testimonial />
      <Contact />
    </Layout>
  );
}


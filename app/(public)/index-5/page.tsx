import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home5/Banner";
import News from "@/components/sections/Home5/News";
import Feature from "@/components/sections/Home5/Feature";
import ChooseUs from "@/components/sections/Home5/ChooseUs";
import Counter from "@/components/sections/Home5/Counter";
import HzAccordion from "@/components/sections/Home5/HzAccordion";
import Project from "@/components/sections/Home5/Project";
import Team from "@/components/sections/Home5/Team";
import PricingTwo from "@/components/sections/Home5/PricingTwo";
import Testimonial from "@/components/sections/Home5/Testimonial";
import Events from "@/components/sections/Home5/Events";

export const metadata = {
  title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function Home5() {
  return (
    <Layout HeaderStyle="five">
      <Banner />
      <News />
      {/* <Feature /> */}
      {/* <ChooseUs /> */}
      {/* <Counter /> */}
      {/* <HzAccordion /> */}
      {/* <Project /> */}
      {/* <Team /> */}
      {/* <PricingTwo /> */}
      {/* <Testimonial /> */}
      <Events />
    </Layout>
  );
}


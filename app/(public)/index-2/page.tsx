import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home2/Banner";
import About from "@/components/sections/Home2/About";
import Service from "@/components/sections/Home2/Service";
import Benefit from "@/components/sections/Home2/Benefit";
import ChooseUs from "@/components/sections/Home2/ChooseUs";
import Project from "@/components/sections/Home2/Project";
import Testimonial from "@/components/sections/Home2/Testimonial";
import Pricing from "@/components/sections/Home2/Pricing";
import Marquee from "@/components/sections/Home2/Marquee";
import Contact from "@/components/sections/Home2/Contact";

export const metadata = {
  title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function Home2() {
  return (
    <Layout HeaderStyle="two" FooterStyle="two">
      <Banner />
      <About />
      {/* <Service /> */}
      {/* <Benefit /> */}
      {/* <ChooseUs /> */}
      {/* <Project /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      {/* <Marquee /> */}
      <Contact />
    </Layout>
  );
}


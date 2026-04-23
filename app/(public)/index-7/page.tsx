import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home7/Banner";
import Solution from "@/components/sections/Home7/Solution";
import About from "@/components/sections/Home7/About";
import Service from "@/components/sections/Home7/Service";
import Case from "@/components/sections/Home7/Case";
import Works from "@/components/sections/Home7/Works";
import Team from "@/components/sections/Home7/Team";
import Contact from "@/components/sections/Home7/Contact";
import Testimonial from "@/components/sections/Home7/Testimonial";

export const metadata = {
  title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function Home7() {
  return (
    <Layout HeaderStyle="seven">
      <Banner />
      {/* <Solution /> */}
      <About />
      {/* <Service /> */}
      {/* <Case /> */}
      {/* <Works /> */}
      {/* <Team /> */}
      <Contact />
      {/* <Testimonial /> */}
    </Layout>
  );
}


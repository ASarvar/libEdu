import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home4/Banner";
import Service from "@/components/sections/Home4/Service";
import About from "@/components/sections/Home4/About";
import Choose from "@/components/sections/Home4/Choose";
import ChooseUs from "@/components/sections/Home4/ChooseUs";
import Project from "@/components/sections/Home4/Project";
import Team from "@/components/sections/Home4/Team";
import Testimonial from "@/components/sections/Home4/Testimonial";

export const metadata = {
  title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function Home4() {
  return (
    <Layout HeaderStyle="four">
      <Banner />
      {/* <Service /> */}
      <About />
      {/* <Choose /> */}
      {/* <ChooseUs /> */}
      {/* <Project /> */}
      {/* <Team /> */}
      {/* <Testimonial /> */}
    </Layout>
  );
}


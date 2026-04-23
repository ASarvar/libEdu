import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home6/Banner";
import Service from "@/components/sections/Home6/Service";
import ChooseUs from "@/components/sections/Home6/ChooseUs";
import Case from "@/components/sections/Home6/Case";
import Testimonial from "@/components/sections/Home6/Testimonial";
import Pricing from "@/components/sections/Home6/Pricing";
import ChooseUs2 from "@/components/sections/Home6/ChooseUs2";
import Marquee from "@/components/sections/Home6/Marquee";
import Faqs from "@/components/sections/Home6/Faqs";

export const metadata = {
  title: "Raqamli Kutubxona - O'zbekiston Milliy Kutubxonasi",
  description: "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.",
};

export default function Home6() {
  return (
    <Layout HeaderStyle="six">
      <Banner />
      <Service />
      <ChooseUs />
      {/* <Case /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      {/* <ChooseUs2 /> */}
      {/* <Marquee /> */}
      <Faqs />
    </Layout>
  );
}


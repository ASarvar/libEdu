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
  title: "Home 4 Single Page - Finclix",
  description: "Business & Finance Consulting - Single Page Version",
};

export default function Home4Single() {
  return (
    <Layout HeaderStyle="four" menuType="single">
      <Banner />
      <Service />
      <About />
      <Choose />
      <ChooseUs />
      <Project />
      <Team />
      <Testimonial />
    </Layout>
  );
}


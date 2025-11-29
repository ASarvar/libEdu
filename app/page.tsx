import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/Home1/Banner";
import Solution from "@/components/sections/Home1/Solution";
import About from "@/components/sections/Home1/About";
import Counter from "@/components/sections/Home1/Counter";
import Service from "@/components/sections/Home1/Service";
import Project from "@/components/sections/Home1/Project";
import Marquee from "@/components/sections/Home1/Marquee";
import Choose from "@/components/sections/Home1/Choose";
import Team from "@/components/sections/Home1/Team";
import Contact from "@/components/sections/Home1/Contact";
import Testimonial from "@/components/sections/Home1/Testimonial";
import Faqs from "@/components/sections/Home1/Faqs";
import Cta from "@/components/sections/Home1/Cta";
import News from "@/components/sections/Home1/News";

export default function Home() {
  return (
    <Layout>
      <Banner />
      <About />
      <Counter />
      <Service />
      <Project />
      <Marquee />
      {/* <Choose /> */}
      {/* <Team /> */}
      <Contact />
      {/* <Testimonial /> */}
      <Faqs />
      {/* <Cta /> */}
      <News />
    </Layout>
  );
}


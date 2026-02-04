"use client";

import dynamic from 'next/dynamic';
import { useSite } from "@/lib/useSite";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const { site, loading } = useSite();
  
  // Determine which home style to use
  const homeStyle = site?.home_style || 'home1';
  
  // Dynamically import components based on home_style
  const renderHomeComponents = () => {
    switch (homeStyle) {
      case 'home1': {
        const Banner1 = dynamic(() => import("@/components/sections/Home1/Banner"), { ssr: false });
        const About1 = dynamic(() => import("@/components/sections/Home1/About"), { ssr: false });
        const Counter1 = dynamic(() => import("@/components/sections/Home1/Counter"), { ssr: false });
        const Service1 = dynamic(() => import("@/components/sections/Home1/Service"), { ssr: false });
        const Project1 = dynamic(() => import("@/components/sections/Home1/Project"), { ssr: false });
        const Marquee1 = dynamic(() => import("@/components/sections/Home1/Marquee"), { ssr: false });
        const Contact1 = dynamic(() => import("@/components/sections/Home1/Contact"), { ssr: false });
        const Faqs1 = dynamic(() => import("@/components/sections/Home1/Faqs"), { ssr: false });
        const News1 = dynamic(() => import("@/components/sections/Home1/News"), { ssr: false });
        return (
          <>
            <Banner1 />
            <About1 />
            <Counter1 />
            <Service1 />
            <Project1 />
            <Marquee1 />
            <Contact1 />
            <Faqs1 />
            <News1 />
          </>
        );
      }
      
      case 'home2': {
        const Banner2 = dynamic(() => import("@/components/sections/Home2/Banner"), { ssr: false });
        const About2 = dynamic(() => import("@/components/sections/Home2/About"), { ssr: false });
        const Service2 = dynamic(() => import("@/components/sections/Home2/Service"), { ssr: false });
        const Benefit2 = dynamic(() => import("@/components/sections/Home2/Benefit"), { ssr: false });
        const Project2 = dynamic(() => import("@/components/sections/Home2/Project"), { ssr: false });
        const ChooseUs2 = dynamic(() => import("@/components/sections/Home2/ChooseUs"), { ssr: false });
        const Marquee2 = dynamic(() => import("@/components/sections/Home2/Marquee"), { ssr: false });
        const Pricing2 = dynamic(() => import("@/components/sections/Home2/Pricing"), { ssr: false });
        const Testimonial2 = dynamic(() => import("@/components/sections/Home2/Testimonial"), { ssr: false });
        const Contact2 = dynamic(() => import("@/components/sections/Home2/Contact"), { ssr: false });
        return (
          <>
            <Banner2 />
            <About2 />
            <Service2 />
            <Benefit2 />
            <Project2 />
            <ChooseUs2 />
            <Marquee2 />
            <Pricing2 />
            <Testimonial2 />
            <Contact2 />
          </>
        );
      }
        
      case 'home3': {
        const Banner3 = dynamic(() => import("@/components/sections/Home3/Banner"), { ssr: false });
        const About3 = dynamic(() => import("@/components/sections/Home3/About"), { ssr: false });
        const Feature3 = dynamic(() => import("@/components/sections/Home3/Feature"), { ssr: false });
        const Service3 = dynamic(() => import("@/components/sections/Home3/Service"), { ssr: false });
        const Choose3 = dynamic(() => import("@/components/sections/Home3/Chosee"), { ssr: false });
        const Work3 = dynamic(() => import("@/components/sections/Home3/Work"), { ssr: false });
        const Feature23 = dynamic(() => import("@/components/sections/Home3/Feature2"), { ssr: false });
        const Growth3 = dynamic(() => import("@/components/sections/Home3/Growth"), { ssr: false });
        const Team3 = dynamic(() => import("@/components/sections/Home3/Team"), { ssr: false });
        const Pricing3 = dynamic(() => import("@/components/sections/Home3/Pricing"), { ssr: false });
        const Testimonial3 = dynamic(() => import("@/components/sections/Home3/Testimonial"), { ssr: false });
        const Faqs3 = dynamic(() => import("@/components/sections/Home3/Faqs"), { ssr: false });
        const Contact3 = dynamic(() => import("@/components/sections/Home3/Contact"), { ssr: false });
        return (
          <>
            <Banner3 />
            <About3 />
            <Feature3 />
            <Service3 />
            <Choose3 />
            <Work3 />
            <Feature23 />
            <Growth3 />
            <Team3 />
            <Pricing3 />
            <Testimonial3 />
            <Faqs3 />
            <Contact3 />
          </>
        );
      }
        
      case 'home4': {
        const Banner4 = dynamic(() => import("@/components/sections/Home4/Banner"), { ssr: false });
        const About4 = dynamic(() => import("@/components/sections/Home4/About"), { ssr: false });
        const Service4 = dynamic(() => import("@/components/sections/Home4/Service"), { ssr: false });
        const Choose4 = dynamic(() => import("@/components/sections/Home4/Choose"), { ssr: false });
        const Project4 = dynamic(() => import("@/components/sections/Home4/Project"), { ssr: false });
        const ChooseUs4 = dynamic(() => import("@/components/sections/Home4/ChooseUs"), { ssr: false });
        const Team4 = dynamic(() => import("@/components/sections/Home4/Team"), { ssr: false });
        const Testimonial4 = dynamic(() => import("@/components/sections/Home4/Testimonial"), { ssr: false });
        return (
          <>
            <Banner4 />
            <About4 />
            <Service4 />
            <Choose4 />
            <Project4 />
            <ChooseUs4 />
            <Team4 />
            <Testimonial4 />
          </>
        );
      }
        
      case 'home5': {
        const Banner5 = dynamic(() => import("@/components/sections/Home5/Banner"), { ssr: false });
        const About5 = dynamic(() => import("@/components/sections/Home5/About"), { ssr: false });
        const Feature5 = dynamic(() => import("@/components/sections/Home5/Feature"), { ssr: false });
        const ChooseUs5 = dynamic(() => import("@/components/sections/Home5/ChooseUs"), { ssr: false });
        const Counter5 = dynamic(() => import("@/components/sections/Home5/Counter"), { ssr: false });
        const HzAccordion5 = dynamic(() => import("@/components/sections/Home5/HzAccordion"), { ssr: false });
        const Project5 = dynamic(() => import("@/components/sections/Home5/Project"), { ssr: false });
        const Team5 = dynamic(() => import("@/components/sections/Home5/Team"), { ssr: false });
        const PricingTwo5 = dynamic(() => import("@/components/sections/Home5/PricingTwo"), { ssr: false });
        const Testimonial5 = dynamic(() => import("@/components/sections/Home5/Testimonial"), { ssr: false });
        const Contact5 = dynamic(() => import("@/components/sections/Home5/Contact"), { ssr: false });
        return (
          <>
            <Banner5 />
            <About5 />
            <Feature5 />
            <ChooseUs5 />
            <Counter5 />
            <HzAccordion5 />
            <Project5 />
            <Team5 />
            <PricingTwo5 />
            <Testimonial5 />
            <Contact5 />
          </>
        );
      }
        
      case 'home6': {
        const Banner6 = dynamic(() => import("@/components/sections/Home6/Banner"), { ssr: false });
        const Service6 = dynamic(() => import("@/components/sections/Home6/Service"), { ssr: false });
        const ChooseUs6 = dynamic(() => import("@/components/sections/Home6/ChooseUs"), { ssr: false });
        const Case6 = dynamic(() => import("@/components/sections/Home6/Case"), { ssr: false });
        const ChooseUs26 = dynamic(() => import("@/components/sections/Home6/ChooseUs2"), { ssr: false });
        const Marquee6 = dynamic(() => import("@/components/sections/Home6/Marquee"), { ssr: false });
        const Pricing6 = dynamic(() => import("@/components/sections/Home6/Pricing"), { ssr: false });
        const Testimonial6 = dynamic(() => import("@/components/sections/Home6/Testimonial"), { ssr: false });
        const Faqs6 = dynamic(() => import("@/components/sections/Home6/Faqs"), { ssr: false });
        return (
          <>
            <Banner6 />
            <Service6 />
            <ChooseUs6 />
            <Case6 />
            <ChooseUs26 />
            <Marquee6 />
            <Pricing6 />
            <Testimonial6 />
            <Faqs6 />
          </>
        );
      }
        
      case 'home7': {
        const Banner7 = dynamic(() => import("@/components/sections/Home7/Banner"), { ssr: false });
        const About7 = dynamic(() => import("@/components/sections/Home7/About"), { ssr: false });
        const Service7 = dynamic(() => import("@/components/sections/Home7/Service"), { ssr: false });
        const Solution7 = dynamic(() => import("@/components/sections/Home7/Solution"), { ssr: false });
        const Case7 = dynamic(() => import("@/components/sections/Home7/Case"), { ssr: false });
        const Works7 = dynamic(() => import("@/components/sections/Home7/Works"), { ssr: false });
        const Team7 = dynamic(() => import("@/components/sections/Home7/Team"), { ssr: false });
        const Testimonial7 = dynamic(() => import("@/components/sections/Home7/Testimonial"), { ssr: false });
        const Contact7 = dynamic(() => import("@/components/sections/Home7/Contact"), { ssr: false });
        return (
          <>
            <Banner7 />
            <About7 />
            <Service7 />
            <Solution7 />
            <Case7 />
            <Works7 />
            <Team7 />
            <Testimonial7 />
            <Contact7 />
          </>
        );
      }
        
      default: {
        // Fallback to Home1
        const BannerDefault = dynamic(() => import("@/components/sections/Home1/Banner"), { ssr: false });
        const AboutDefault = dynamic(() => import("@/components/sections/Home1/About"), { ssr: false });
        const CounterDefault = dynamic(() => import("@/components/sections/Home1/Counter"), { ssr: false });
        const ServiceDefault = dynamic(() => import("@/components/sections/Home1/Service"), { ssr: false });
        const ProjectDefault = dynamic(() => import("@/components/sections/Home1/Project"), { ssr: false });
        const MarqueeDefault = dynamic(() => import("@/components/sections/Home1/Marquee"), { ssr: false });
        const ContactDefault = dynamic(() => import("@/components/sections/Home1/Contact"), { ssr: false });
        const FaqsDefault = dynamic(() => import("@/components/sections/Home1/Faqs"), { ssr: false });
        const NewsDefault = dynamic(() => import("@/components/sections/Home1/News"), { ssr: false });
        return (
          <>
            <BannerDefault />
            <AboutDefault />
            <CounterDefault />
            <ServiceDefault />
            <ProjectDefault />
            <MarqueeDefault />
            <ContactDefault />
            <FaqsDefault />
            <NewsDefault />
          </>
        );
      }
    }
  };

  // Show loading state while site data is being fetched
  if (loading) {
    return null; // Preloader will show
  }

  return (
    <Layout>
      {renderHomeComponents()}
    </Layout>
  );
}

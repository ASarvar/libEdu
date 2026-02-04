"use client";

import dynamic from 'next/dynamic';
import { useSite } from "@/lib/useSite";
import Layout from "@/components/layout/Layout";
import { useMemo } from 'react';

export default function Home() {
  const { site, loading } = useSite();
  
  // Determine which home style to use
  const homeStyle = site?.home_style || 'home1';
  
  // Dynamically import components based on home_style
  const HomeComponents = useMemo(() => {
    switch (homeStyle) {
      case 'home1':
        const Banner1 = dynamic(() => import("@/components/sections/Home1/Banner"), { ssr: true });
        const About1 = dynamic(() => import("@/components/sections/Home1/About"), { ssr: true });
        const Counter1 = dynamic(() => import("@/components/sections/Home1/Counter"), { ssr: true });
        const Service1 = dynamic(() => import("@/components/sections/Home1/Service"), { ssr: true });
        const Project1 = dynamic(() => import("@/components/sections/Home1/Project"), { ssr: true });
        const Marquee1 = dynamic(() => import("@/components/sections/Home1/Marquee"), { ssr: true });
        const Contact1 = dynamic(() => import("@/components/sections/Home1/Contact"), { ssr: true });
        const Faqs1 = dynamic(() => import("@/components/sections/Home1/Faqs"), { ssr: true });
        const News1 = dynamic(() => import("@/components/sections/Home1/News"), { ssr: true });
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
        
      case 'home2':
        const Banner2 = dynamic(() => import("@/components/sections/Home2/Banner"), { ssr: true });
        const About2 = dynamic(() => import("@/components/sections/Home2/About"), { ssr: true });
        const Service2 = dynamic(() => import("@/components/sections/Home2/Service"), { ssr: true });
        const Benefit2 = dynamic(() => import("@/components/sections/Home2/Benefit"), { ssr: true });
        const Project2 = dynamic(() => import("@/components/sections/Home2/Project"), { ssr: true });
        const ChooseUs2 = dynamic(() => import("@/components/sections/Home2/ChooseUs"), { ssr: true });
        const Marquee2 = dynamic(() => import("@/components/sections/Home2/Marquee"), { ssr: true });
        const Pricing2 = dynamic(() => import("@/components/sections/Home2/Pricing"), { ssr: true });
        const Testimonial2 = dynamic(() => import("@/components/sections/Home2/Testimonial"), { ssr: true });
        const Contact2 = dynamic(() => import("@/components/sections/Home2/Contact"), { ssr: true });
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
        
      case 'home3':
        const Banner3 = dynamic(() => import("@/components/sections/Home3/Banner"), { ssr: true });
        const About3 = dynamic(() => import("@/components/sections/Home3/About"), { ssr: true });
        const Feature3 = dynamic(() => import("@/components/sections/Home3/Feature"), { ssr: true });
        const Service3 = dynamic(() => import("@/components/sections/Home3/Service"), { ssr: true });
        const Choose3 = dynamic(() => import("@/components/sections/Home3/Chosee"), { ssr: true });
        const Work3 = dynamic(() => import("@/components/sections/Home3/Work"), { ssr: true });
        const Feature23 = dynamic(() => import("@/components/sections/Home3/Feature2"), { ssr: true });
        const Growth3 = dynamic(() => import("@/components/sections/Home3/Growth"), { ssr: true });
        const Team3 = dynamic(() => import("@/components/sections/Home3/Team"), { ssr: true });
        const Pricing3 = dynamic(() => import("@/components/sections/Home3/Pricing"), { ssr: true });
        const Testimonial3 = dynamic(() => import("@/components/sections/Home3/Testimonial"), { ssr: true });
        const Faqs3 = dynamic(() => import("@/components/sections/Home3/Faqs"), { ssr: true });
        const Contact3 = dynamic(() => import("@/components/sections/Home3/Contact"), { ssr: true });
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
        
      case 'home4':
        const Banner4 = dynamic(() => import("@/components/sections/Home4/Banner"), { ssr: true });
        const About4 = dynamic(() => import("@/components/sections/Home4/About"), { ssr: true });
        const Service4 = dynamic(() => import("@/components/sections/Home4/Service"), { ssr: true });
        const Choose4 = dynamic(() => import("@/components/sections/Home4/Choose"), { ssr: true });
        const Project4 = dynamic(() => import("@/components/sections/Home4/Project"), { ssr: true });
        const ChooseUs4 = dynamic(() => import("@/components/sections/Home4/ChooseUs"), { ssr: true });
        const Team4 = dynamic(() => import("@/components/sections/Home4/Team"), { ssr: true });
        const Testimonial4 = dynamic(() => import("@/components/sections/Home4/Testimonial"), { ssr: true });
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
        
      case 'home5':
        const Banner5 = dynamic(() => import("@/components/sections/Home5/Banner"), { ssr: true });
        const About5 = dynamic(() => import("@/components/sections/Home5/About"), { ssr: true });
        const Feature5 = dynamic(() => import("@/components/sections/Home5/Feature"), { ssr: true });
        const ChooseUs5 = dynamic(() => import("@/components/sections/Home5/ChooseUs"), { ssr: true });
        const Counter5 = dynamic(() => import("@/components/sections/Home5/Counter"), { ssr: true });
        const HzAccordion5 = dynamic(() => import("@/components/sections/Home5/HzAccordion"), { ssr: true });
        const Project5 = dynamic(() => import("@/components/sections/Home5/Project"), { ssr: true });
        const Team5 = dynamic(() => import("@/components/sections/Home5/Team"), { ssr: true });
        const PricingTwo5 = dynamic(() => import("@/components/sections/Home5/PricingTwo"), { ssr: true });
        const Testimonial5 = dynamic(() => import("@/components/sections/Home5/Testimonial"), { ssr: true });
        const Contact5 = dynamic(() => import("@/components/sections/Home5/Contact"), { ssr: true });
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
        
      case 'home6':
        const Banner6 = dynamic(() => import("@/components/sections/Home6/Banner"), { ssr: true });
        const Service6 = dynamic(() => import("@/components/sections/Home6/Service"), { ssr: true });
        const ChooseUs6 = dynamic(() => import("@/components/sections/Home6/ChooseUs"), { ssr: true });
        const Case6 = dynamic(() => import("@/components/sections/Home6/Case"), { ssr: true });
        const ChooseUs26 = dynamic(() => import("@/components/sections/Home6/ChooseUs2"), { ssr: true });
        const Marquee6 = dynamic(() => import("@/components/sections/Home6/Marquee"), { ssr: true });
        const Pricing6 = dynamic(() => import("@/components/sections/Home6/Pricing"), { ssr: true });
        const Testimonial6 = dynamic(() => import("@/components/sections/Home6/Testimonial"), { ssr: true });
        const Faqs6 = dynamic(() => import("@/components/sections/Home6/Faqs"), { ssr: true });
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
        
      case 'home7':
        const Banner7 = dynamic(() => import("@/components/sections/Home7/Banner"), { ssr: true });
        const About7 = dynamic(() => import("@/components/sections/Home7/About"), { ssr: true });
        const Service7 = dynamic(() => import("@/components/sections/Home7/Service"), { ssr: true });
        const Solution7 = dynamic(() => import("@/components/sections/Home7/Solution"), { ssr: true });
        const Case7 = dynamic(() => import("@/components/sections/Home7/Case"), { ssr: true });
        const Works7 = dynamic(() => import("@/components/sections/Home7/Works"), { ssr: true });
        const Team7 = dynamic(() => import("@/components/sections/Home7/Team"), { ssr: true });
        const Testimonial7 = dynamic(() => import("@/components/sections/Home7/Testimonial"), { ssr: true });
        const Contact7 = dynamic(() => import("@/components/sections/Home7/Contact"), { ssr: true });
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
        
      default:
        // Fallback to Home1
        const BannerDefault = dynamic(() => import("@/components/sections/Home1/Banner"), { ssr: true });
        const AboutDefault = dynamic(() => import("@/components/sections/Home1/About"), { ssr: true });
        const CounterDefault = dynamic(() => import("@/components/sections/Home1/Counter"), { ssr: true });
        const ServiceDefault = dynamic(() => import("@/components/sections/Home1/Service"), { ssr: true });
        const ProjectDefault = dynamic(() => import("@/components/sections/Home1/Project"), { ssr: true });
        const MarqueeDefault = dynamic(() => import("@/components/sections/Home1/Marquee"), { ssr: true });
        const ContactDefault = dynamic(() => import("@/components/sections/Home1/Contact"), { ssr: true });
        const FaqsDefault = dynamic(() => import("@/components/sections/Home1/Faqs"), { ssr: true });
        const NewsDefault = dynamic(() => import("@/components/sections/Home1/News"), { ssr: true });
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
  }, [homeStyle]);

  // Show loading state while site data is being fetched
  if (loading) {
    return null; // Preloader will show
  }

  return (
    <Layout>
      {HomeComponents}
    </Layout>
  );
}


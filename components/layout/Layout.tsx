"use client";

import { useEffect, useState, ReactNode } from "react";
import { useSite } from "@/lib/useSite";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";
import Header4 from "./Header4";
import Header5 from "./Header5";
import Header6 from "./Header6";
import Header7 from "./Header7";


type HeaderStyleType = "two" | "three" | "four" | "five" | "six" | "seven";
type FooterStyleType = "two" | "three";

interface LayoutProps {
  children: ReactNode;
  HeaderStyle?: HeaderStyleType;
  FooterStyle?: FooterStyleType;
  darkMode?: string | number;
  menuType?: "single" | "default";
  wrapperClass?: string;
}

const Layout = ({
  children,
  HeaderStyle,
  FooterStyle,
  darkMode,
  menuType,
  wrapperClass,
}: LayoutProps) => {
  const { site } = useSite();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleOpen = () => document.body.classList.add("mobile-menu-visible");
  const handleRemove = () => document.body.classList.remove("mobile-menu-visible");

  const handleToggle = () => {
    const newState = !isSearchOpen;
    setIsSearchOpen(newState);
    document.body.classList.toggle("search-popup-visible", newState);
  };

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Initialize WOW.js
    if (typeof window !== "undefined") {
      import('wowjs').then((module) => {
        const WOW = module.WOW || module.default;
        if (WOW) {
          const wow = new WOW({
            live: false
          });
          wow.init();
        }
      });
    }
  }, []);

  useEffect(() => {
    const htmlEl = document.documentElement;
    // Use site's dark mode setting if available, otherwise use prop
    const isDark = site?.enable_dark_mode || darkMode === "1" || darkMode === 1;
    
    if (isDark) {
      htmlEl.setAttribute("data-tm-layout", "dark");
      document.body.classList.add("dark-mode");
    } else {
      htmlEl.setAttribute("data-tm-layout", "light");
      document.body.classList.remove("dark-mode");
    }
    
    // Apply custom CSS if available
    if (site?.custom_css) {
      const styleId = 'site-custom-css';
      let styleEl = document.getElementById(styleId);
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = site.custom_css;
    }
    
    // Apply site colors as CSS variables
    if (site) {
      const root = document.documentElement;
      if (site.primary_color) {
        root.style.setProperty('--theme-color1', site.primary_color);
      }
      if (site.secondary_color) {
        root.style.setProperty('--theme-color7', site.secondary_color);
      }
    }
  }, [darkMode, site]);

  useEffect(() => {
    if (menuType === "single") {
      document.body.classList.add("single-menu");
    } else {
      document.body.classList.remove("single-menu");
    }
  }, [menuType]);

  const headerProps = {
    handleOpen,
    handleRemove,
    searchToggle: isSearchOpen,
    handleToggle,
    scroll,
  };

  const headerComponents: Record<HeaderStyleType, ReactNode> = {
    two: <Header2 {...headerProps} />,
    three: <Header3 {...headerProps} />,
    four: <Header4 {...headerProps} />,
    five: <Header5 {...headerProps} />,
    six: <Header6 {...headerProps} />,
    seven: <Header7 {...headerProps} />,
  };
  
  // Determine which header to use based on site settings or props
  const getHeader = () => {
    if (site?.header_style) {
      const styleMap: Record<string, ReactNode> = {
        header1: <Header1 {...headerProps} />,
        header2: <Header2 {...headerProps} />,
        header3: <Header3 {...headerProps} />,
        header4: <Header4 {...headerProps} />,
        header5: <Header5 {...headerProps} />,
        header6: <Header6 {...headerProps} />,
        header7: <Header7 {...headerProps} />,
      };
      return styleMap[site.header_style] || <Header1 {...headerProps} />;
    }
    
    // Fallback to prop-based selection
    if (HeaderStyle) {
      return headerComponents[HeaderStyle] || <Header1 {...headerProps} />;
    }
    
    return <Header1 {...headerProps} />;
  };
  
  // Determine which footer to use based on site settings or props
  const getFooter = () => {
    if (site?.footer_style) {
      const styleMap: Record<string, ReactNode> = {
        footer1: <Footer />,
        footer2: <Footer2 />,
        footer3: <Footer3 />,
      };
      return styleMap[site.footer_style] || <Footer />;
    }
    
    // Fallback to prop-based selection
    if (FooterStyle === "two") return <Footer2 />;
    if (FooterStyle === "three") return <Footer3 />;
    return <Footer />;
  };

  return (
    <>
      <div id="top" className={`page-wrapper ${wrapperClass || ""}`}>
        {getHeader()}
        {children}
        {getFooter()}
      </div>
      <BackToTop />
    </>
  );
};

export default Layout;

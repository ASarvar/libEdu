"use client";

import { useEffect, useState, ReactNode } from "react";
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
    if (darkMode === "1" || darkMode === 1) {
      htmlEl.setAttribute("data-tm-layout", "dark");
      document.body.classList.add("dark-mode");
    } else {
      htmlEl.setAttribute("data-tm-layout", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

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

  return (
    <>
      <div id="top" className={`page-wrapper ${wrapperClass || ""}`}>
        {!HeaderStyle ? (
          <Header1 {...headerProps} />
        ) : (
          headerComponents[HeaderStyle] || <Header1 {...headerProps} />
        )}

        {children}

        {!FooterStyle && <Footer />}
        {FooterStyle === "two" && <Footer2 />}
        {FooterStyle === "three" && <Footer3 />}
      </div>
      <BackToTop />
    </>
  );
};

export default Layout;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import NavLinks from "./NavLinks";
import MobileMenu from "../layout/MobileMenu";
import MobileLogo from "../../public/images/logo_short.svg";
import LogoMain from "../../public/images/logo.svg";
import LogoDark from "../../public/images/logo_white.svg";
import LanguageSelector from "../elements/LanguageSelector";

interface Header1Props {
  handleOpen: () => void;
  handleRemove: () => void;
  searchToggle: boolean;
  scroll: boolean;
}

const Header1 = ({
  handleOpen,
  handleRemove,
  searchToggle,
  scroll,
}: Header1Props) => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const updateDarkMode = () => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    };
    updateDarkMode();
    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const Logo = isDarkMode ? LogoDark : LogoMain;

  return (
    <>
      <header
        className={`main-header header-style-one header-1 ${
          scroll ? "fixed-header" : ""
        } ${searchToggle ? "moblie-search-active" : ""}`}
      >
        {/* <!-- Header Lower --> */}
        <div className="header-lower">
          {/* <!-- Main box --> */}
          <div className="main-box">
            {/* <!--Nav Box--> */}
            <div className="nav-outer">
              <div className="logo-box">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={Logo}
                      alt="Logo"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="outer-box">
                <nav className="nav main-menu">
                  <NavLinks />
                </nav>
                {/* <!-- Main Menu End--> */}
                <div className="ui-btn-outer">
                  <div className="header-contact">
                    <div>
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
                <Link href="/login" className="theme-btn btn-style-one wow fadeInRight" data-wow-delay="200ms">
                  <i className="icon fa fa-user pr-10"> </i>
                  {t("header.login")}
                </Link>
                {/* <!-- Mobile Nav toggler --> */}
                <div className="mobile-nav-toggler" onClick={handleOpen}>
                  <span className="icon lnr-icon-bars"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Header Lower --> */}

        {/* <!-- Mobile Menu  --> */}
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={handleRemove} />
          <nav className="menu-box">
            <div className="upper-box">
              <div className="nav-logo">
                <Link href="/">
                  <Image
                    src={MobileLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="close-btn" onClick={handleRemove}>
                <i className="icon fa fa-times"></i>
              </div>
            </div>
            <ul className="navigation clearfix">
              <MobileMenu />
            </ul>
            <div className="mobile-lang-selector">
              <LanguageSelector />
            </div>
            <div className="mobile-login-btn" style={{ padding: '20px 30px' }}>
              <Link href="/login" className="theme-btn btn-style-one" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                <i className="icon fa fa-user pr-10"> </i>
                {t("header.login")}
              </Link>
            </div>
            <ul className="contact-list-one">
              <li>
                {/* <!-- Contact Info Box --> */}
                <div className="contact-info-box">
                  <i className="icon lnr-icon-phone-handset"></i>
                  <span className="title">{t("header.callNow")}</span>
                  <Link href="#">+998 (71) 233-45-67</Link>
                </div>
              </li>
              <li>
                {/* <!-- Contact Info Box --> */}
                <div className="contact-info-box">
                  <span className="icon lnr-icon-envelope1"></span>
                  <span className="title">{t("header.sendEmail")}</span>
                  <Link href="mailto:info@kutubxona.uz">info@kutubxona.uz</Link>
                </div>
              </li>
              <li>
                {/* <!-- Contact Info Box --> */}
                <div className="contact-info-box">
                  <span className="icon lnr-icon-clock"></span>
                  <span className="title">{t("header.workingHours")}</span>
                  {t("header.workingHoursText")}
                </div>
              </li>
            </ul>

            <ul className="social-links">
              <li>
                <Link href="#">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-pinterest"></i>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* <!-- End Mobile Menu --> */}

        {/* <!-- Sticky Header  --> */}
        <div
          className={`sticky-header ${
            scroll ? "fixed-header animated slideInDown" : ""
          }`}
        >
          <div className="auto-container">
            <div className="inner-container">
              {/* <!--Logo--> */}
              <div className="logo">
                <Link href="/">
                  <Image
                    src={MobileLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse show collapse clearfix">
                    <ul className="navigation clearfix">
                      <NavLinks />
                    </ul>
                  </div>
                </nav>
                <div className="header-contact">
                  <LanguageSelector />
                </div>
                <Link href="/login" className="icon fa fa-user pr-10"> 
                </Link>
                {/* <!--Mobile Navigation Toggler--> */}
                <div className="mobile-nav-toggler" onClick={handleOpen}>
                  <span className="icon lnr-icon-bars"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header1;

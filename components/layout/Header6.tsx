"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSite } from "../../lib/useSite";
import NavLinks from "./NavLinks";
import MenuSingle from "./MenuSingle";
import MobileMenu from "./MobileMenu";
import LanguageSelector from "../elements/LanguageSelector";
import MobileLogo from "../../public/images/logo_short.svg";
import LogoMain from "../../public/images/logo.svg";
import LogoDark from "../../public/images/logo_white.svg";
import StikyLogo from "../../public/images/logo.svg";

interface Header6Props {
  scroll: boolean;
  handleOpen?: () => void;
  handleRemove?: () => void;
  searchToggle?: boolean;
  handleToggle?: () => void;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

function Header6({ scroll, handleOpen, handleRemove }: Header6Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const site = useSite();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSingleMenu, setIsSingleMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // local states for toggles
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu-wrapper")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateClassStates = () => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
      setIsSingleMenu(document.body.classList.contains("single-menu"));
    };
    updateClassStates();
    const observer = new MutationObserver(updateClassStates);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Use custom site logo if available, otherwise fall back to default
  const Logo = site.site?.logo_path
    ? site.site.logo_path
    : isDarkMode
      ? LogoDark
      : LogoMain;
  const Logo2 = site.site?.logo_path
    ? site.site.logo_path
    : isDarkMode
      ? LogoDark
      : StikyLogo;
  const MobileLogoSrc = site.site?.logo_path || MobileLogo;
  const StickyLogoSrc = site.site?.logo_path || StikyLogo;
  const contactPhone = site.site?.contact_phone || "+998 (71) 233-45-67";
  const contactEmail = site.site?.contact_email || "info@kutubxona.uz";

  const MenuComponent = isSingleMenu ? MenuSingle : NavLinks;

  return (
    <>
      <header
        className={`main-header header-style-one header-5 ${scroll ? "fixed-header" : ""}${isSearchOpen ? "search-active" : ""}`}
      >
        {/* <!-- Header Lower --> */}
        <div className="header-lower header-lower5 show-header-section">
          {/* <!-- Main box --> */}
          <div className="main-box style-2">
            {/* <!--Nav Box--> */}
            <div className="nav-outer">
              <div className="logo-box">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={Logo}
                      alt="Logo"
                      width={200}
                      height={50}
                      className="header-logo-img"
                    />
                  </Link>
                </div>
              </div>
              <nav className="nav main-menu">
                <MenuComponent />
              </nav>
              {/* <!-- Main Menu End--> */}
              <div className="outer-box">
                {/* <Link href="/" className="contact-info">
                  <i className="lnr-icon-phone-handset"></i>
                  +998 (71) 233-45-67
                </Link>
                <button
                  className="ui-btn search-btn"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <i className="icon fal fa-search"></i>
                </button> */}
                <div className="ui-btn-outer">
                  <div className="header-contact">
                    <LanguageSelector />
                  </div>

                  <div className="user-menu-wrapper">
                    <button
                      className="user-menu-btn"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <i className="lnr-icon-user"></i>
                    </button>
                    {showDropdown && (
                      <div className="user-dropdown">
                        {user ? (
                          <>
                            <Link
                              href={
                                user.role === "admin" ||
                                user.role === "superadmin"
                                  ? "/admin/dashboard"
                                  : "/profile"
                              }
                              className="dropdown-item"
                            >
                              {user.role === "admin" ||
                              user.role === "superadmin"
                                ? t("admin.dashboard")
                                : t("profile.myProfile")}
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="dropdown-item logout-btn"
                            >
                              {t("profile.logout")}
                            </button>
                          </>
                        ) : (
                          <Link href="/login" className="dropdown-item">
                            {t("header.login")}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <!-- Mobile Nav toggler --> */}
                <div
                  className="mobile-nav-toggler"
                  onClick={handleOpen}
                >
                  <span className="icon lnr-icon-bars"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Header Lower --> */}

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={handleRemove} />
          <nav className="menu-box">
            <div className="upper-box">
              <div className="nav-logo">
                <Link href="/">
                  <Image
                    src={MobileLogoSrc}
                    alt="Image"
                    width={150}
                    height={50}
                    className="mobile-logo-img"
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
            <div className="mobile-login-btn">
              {user ? (
                <>
                  <Link
                    href={
                      user.role === "admin" || user.role === "superadmin"
                        ? "/admin/dashboard"
                        : "/profile"
                    }
                    className="theme-btn btn-style-one user-profile"
                  >
                    <i className="icon fa fa-user pr-10"></i>
                    {user.full_name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="theme-btn btn-style-two"
                  >
                    <i className="icon fa fa-sign-out-alt pr-10"></i>
                    {t("profile.logout")}
                  </button>
                </>
              ) : (
                <Link href="/login" className="theme-btn btn-style-one">
                  <i className="icon fa fa-user pr-10"> </i>
                  {t("header.login")}
                </Link>
              )}
            </div>
            <ul className="contact-list-one">
              <li>
                <div className="contact-info-box">
                  <i className="icon lnr-icon-phone-handset"></i>
                  <span className="title">{t("header.callNow")}</span>
                  <Link href={`tel:${contactPhone.replace(/\s+/g, "")}`}>
                    {contactPhone}
                  </Link>
                </div>
              </li>
              <li>
                <div className="contact-info-box">
                  <span className="icon lnr-icon-envelope1"></span>
                  <span className="title">{t("header.sendEmail")}</span>
                  <Link href={`mailto:${contactEmail}`}>{contactEmail}</Link>
                </div>
              </li>
              <li>
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

        {/* Search Popup */}
        {isSearchOpen && (
          <div className="search-popup">
            <span
              className="search-back-drop"
              onClick={() => setIsSearchOpen(false)}
            />
            <button
              className="close-search"
              onClick={() => setIsSearchOpen(false)}
            >
              <span className="fa fa-times"></span>
            </button>
            <div className="search-inner">
              <form method="post" action="#">
                <div className="form-group">
                  <input
                    type="search"
                    name="search-field"
                    placeholder={t("common.search")}
                    required
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* <!-- Sticky Header  --> */}
        <div
          className={`sticky-header ${scroll ? "fixed-header animated slideInDown" : ""}`}
        >
          <div className="auto-container">
            <div className="inner-container">
              {/* <!--Logo--> */}
              <div className="logo">
                <Link href="/">
                  <Image
                    src={Logo2}
                    alt="Logo"
                    width={150}
                    height={40}
                    className="sticky-logo-img"
                  />
                </Link>
              </div>
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse show collapse clearfix">
                    <ul className="navigation clearfix">
                      <MenuComponent />
                    </ul>
                  </div>
                </nav>
                <div className="header-contact">
                  <LanguageSelector />
                </div>
                <div className="user-menu-wrapper">
                  <button
                    className="user-menu-btn"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <i className="icon fa fa-user"></i>
                  </button>
                  {showDropdown && (
                    <div className="user-dropdown">
                      {user ? (
                        <>
                          <Link
                            href={
                              user.role === "admin" ||
                              user.role === "superadmin"
                                ? "/admin/dashboard"
                                : "/profile"
                            }
                            className="dropdown-item"
                          >
                            {user.role === "admin" || user.role === "superadmin"
                              ? t("admin.dashboard")
                              : t("profile.myProfile")}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="dropdown-item logout-btn"
                          >
                            {t("profile.logout")}
                          </button>
                        </>
                      ) : (
                        <Link href="/login" className="dropdown-item">
                          {t("header.login")}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                {/* <!--Mobile Navigation Toggler--> */}
                <div
                  className="mobile-nav-toggler"
                  onClick={handleOpen}
                >
                  <span className="icon lnr-icon-bars"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header6;

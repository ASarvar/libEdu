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

interface Header5Props {
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

function Header5({ scroll, handleOpen, handleRemove }: Header5Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const site = useSite();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSingleMenu, setIsSingleMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // local states for toggles
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showDropdown && !target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
  const MobileLogoSrc = site.site?.logo_path || MobileLogo;
  const StickyLogoSrc = site.site?.logo_path || StikyLogo;

  const MenuComponent = isSingleMenu ? MenuSingle : NavLinks;

  return (
    <>
      <header
        className={`main-header header-style-one header-5 ${scroll ? "fixed-header" : ""} ${isSearchOpen ? "search-active" : ""}`}
      >
        <div className="header-lower header-lower5 show-header-section">
          <div className="main-box">
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
              <div className="outer-box">
                {/* search toggle */}
                {/* <button className="ui-btn search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                <i className="icon fal fa-search"></i>
                                </button> */}
                <div className="header-contact">
                  <LanguageSelector />
                </div>
                {user ? (
                  <div className="user-menu-wrapper">
                    <button
                      className="theme-btn btn-style-one wow fadeInRight"
                      data-wow-delay="200ms"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowDropdown(!showDropdown);
                      }}
                      type="button"
                    >
                      <i className="icon fa fa-user pr-10"> </i>
                      {user.full_name}
                      <i className="fa fa-chevron-down pl-10"></i>
                    </button>
                    {showDropdown && (
                      <div className="user-dropdown">
                        <Link
                          href={
                            user.role === "admin" || user.role === "superadmin"
                              ? "/admin/dashboard"
                              : "/profile"
                          }
                          className="dropdown-item"
                          onClick={() => setShowDropdown(false)}
                        >
                          <i className="fa fa-user pr-10"></i>
                          {user.role === "admin" || user.role === "superadmin"
                            ? t("admin.dashboard")
                            : t("header.profile")}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowDropdown(false);
                            handleLogout();
                          }}
                          className="dropdown-item logout"
                          type="button"
                        >
                          <i className="fa fa-sign-out pr-10"></i>
                          {t("profile.logout")}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="theme-btn btn-style-one wow fadeInRight"
                    data-wow-delay="200ms"
                  >
                    <i className="icon fa fa-user pr-10"> </i>
                    {t("header.login")}
                  </Link>
                )}

                {/* mobile menu toggle */}
                <div
                  className="mobile-nav-toggler"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <span className="icon lnr-icon-bars"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div
              className="menu-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="menu-box">
              <div className="upper-box">
                <div className="nav-logo">
                  <Link href="/">
                    <Image
                      src={MobileLogoSrc}
                      alt="Kutubxona Logo"
                      width={150}
                      height={50}
                      className="mobile-logo-img"
                    />
                  </Link>
                </div>
                <div
                  className="close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
            </nav>
          </div>
        )}

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
                    src={StickyLogoSrc}
                    alt="Kutubxona Logo"
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
                  onClick={() => setIsMobileMenuOpen(true)}
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
export default Header5;

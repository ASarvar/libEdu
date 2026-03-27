"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useSite } from '../../lib/useSite';
import NavLinks from './NavLinks';
import MenuSingle from "./MenuSingle";
import MobileMenu from './MobileMenu';
import LanguageSelector from '../elements/LanguageSelector';
import MobileLogo from '../../public/images/logo_short.svg';
import LogoMain from '../../public/images/logo.svg';
import LogoDark from '../../public/images/logo_white.svg';

interface Header4Props {
  handleOpen: () => void;
  handleRemove: () => void;
  scroll: boolean;
  searchToggle?: boolean;
  handleToggle?: () => void;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

function Header4 ({ handleOpen, handleRemove, scroll }: Header4Props){
    const { t } = useTranslation();
    const router = useRouter();
    const site = useSite();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSingleMenu, setIsSingleMenu] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (showDropdown && !target.closest('.user-dropdown')) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
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
        : (isDarkMode ? LogoDark : LogoMain);
    const MobileLogoSrc = site.site?.logo_path || MobileLogo;
    
    const MenuComponent = isSingleMenu ? MenuSingle : NavLinks;


    return (
        <>
          <header className={`main-header header-style-one header-1 ${scroll ? "fixed-header" : ""}`}>
            {/* <!-- Header Lower --> */}
            <div className="header-lower">
              {/* <!-- Main box --> */}
              <div className="main-box">
                <div className="nav-outer">
                  <div className="logo-box">
                    <div className="logo">
                      <Link href="/">
                        <Image src={Logo} alt="Kutubxona Logo" width={200} height={50} className="header-logo-img" />
                      </Link>
                      </div>
                  </div>
                    <nav className="nav main-menu">
                      <MenuComponent/>
                    </nav>
                    {/* <!-- Main Menu End--> */}

                  <div className="outer-box">
                    <div className="ui-btn-outer">
                      <div className="header-contact">
                        <LanguageSelector />
                      </div>
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
                              href={user.role === 'admin' || user.role === 'superadmin' ? '/admin/dashboard' : '/profile'} 
                              className="dropdown-item"
                              onClick={() => setShowDropdown(false)}
                            >
                              <i className="fa fa-user pr-10"></i>
                              {user.role === 'admin' || user.role === 'superadmin' ? t('admin.dashboard') : t('header.profile')}
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
                              {t('profile.logout')}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link href="/login" className="theme-btn btn-style-one wow fadeInRight" data-wow-delay="200ms">
                        <i className="icon fa fa-user pr-10"> </i>
                        {t("header.login")}
                      </Link>
                    )}

                    {/* <!-- Mobile Nav toggler --> */}
                    <div className="mobile-nav-toggler" onClick={handleOpen}><span className="icon lnr-icon-bars"></span></div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Header Lower --> */}

            {/* <!-- Mobile Menu  --> */}
            <div className="mobile-menu">
            <div className="menu-backdrop" onClick={handleRemove}/>
            <nav className="menu-box">
                <div className="upper-box">
                  <div className="nav-logo">
                      <Link href="/"><Image src={MobileLogoSrc} alt="Kutubxona Logo" width={150} height={50} className="mobile-logo-img" /></Link>
                  </div>
                <div className="close-btn" onClick={handleRemove}><i className="icon fa fa-times"></i></div>
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
                        href={user.role === 'admin' || user.role === 'superadmin' ? '/admin/dashboard' : '/profile'}
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
                        {t('profile.logout')}
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
                    {/* <!-- Contact Info Box --> */}
                    <div className="contact-info-box">
                    <i className="icon lnr-icon-phone-handset"></i>
                    <span className="title">{t("header.callNow")}</span>
                    <Link href="tel:+998712334567">+998 (71) 233-45-67</Link>
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
                    <Link href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i></Link>
                </li>
                <li>
                    <Link href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></Link>
                </li>
                <li>
                    <Link href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></Link>
                </li>
                </ul>
            </nav>
            </div>
            {/* <!-- End Mobile Menu --> */}

            {/* <!-- Sticky Header  --> */}
            <div className={`sticky-header ${scroll ? "fixed-header animated slideInDown" : ""}`}>
            <div className="auto-container">
                <div className="inner-container">
                {/* <!--Logo--> */}
                <div className="logo">
                    <Link href="/"><Image src={MobileLogoSrc} alt="Kutubxona Logo" width={150} height={40} className="sticky-logo-img" /></Link>
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
                    {user ? (
                      <Link 
                        href={user.role === 'admin' || user.role === 'superadmin' ? '/admin/dashboard' : '/profile'}
                        className="user-link"
                      >
                        <i className="icon fa fa-user"></i>
                      </Link>
                    ) : (
                      <Link href="/login" className="icon fa fa-user"> 
                      </Link>
                    )}
                    {/* <!--Mobile Navigation Toggler--> */}
                    <div className="mobile-nav-toggler" onClick={handleOpen}><span className="icon lnr-icon-bars"></span></div>
                </div>
                </div>
            </div>
            </div>
          </header>
        </>
    );
};
export default Header4;
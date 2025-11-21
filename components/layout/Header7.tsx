"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './NavLinks';
import MenuSingle from "./MenuSingle";
import MobileMenu from './MobileMenu';
import MobileLogo from '../../public/images/white-logo.png';
import LogoMain from '../../public/images/black-logo.png';
import LogoDark from '../../public/images/white-logo.png';

interface Header7Props {
  scroll: boolean;
  handleOpen?: () => void;
  handleRemove?: () => void;
  searchToggle?: boolean;
  handleToggle?: () => void;
}

function Header7 ({ scroll }: Header7Props){
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSingleMenu, setIsSingleMenu] = useState(false);

    // local states for toggles
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const Logo = isDarkMode ? LogoDark : LogoMain;
    const MenuComponent = isSingleMenu ? MenuSingle : NavLinks;

    return (
        <>
            <header className={`main-header header-style-one header-7 ${scroll ? "fixed-header" : ""}${isSearchOpen ? "search-active" : ""}`}>
                <div className="header-lower header-lower5 show-header-section">
                    <div className="main-box">
                        <div className="nav-outer">
                            <div className="logo-box">
                                <div className="logo">
                                    <Link href="/">
                                       <Image src={Logo} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
                                    </Link>
                                </div>
                            </div>
                            <nav className="nav main-menu">
                                <MenuComponent/>
                            </nav>
                            <div className="outer-box">
                                <button className="ui-btn search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <i className="icon fal fa-search"></i>
                                </button>
                                <Link href="/page-contact" className="theme-btn btn-style-one">Book Appointment
                                    <i className="lnr-icon-arrow-right"></i>
                                </Link>
                                <div className="mobile-nav-toggler" onClick={() => setIsMobileMenuOpen(true)}><span className="icon lnr-icon-bars"></span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="menu-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
                    <nav className="menu-box">
                    <div className="upper-box">
                        <div className="nav-logo">
                        <Link href="/"><Image src={MobileLogo} alt="Image" /></Link>
                        </div>
                        <div className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <i className="icon fa fa-times"></i>
                        </div>
                    </div>
                    <ul className="navigation clearfix">
                        <MobileMenu />
                    </ul>
                    </nav>
                </div>
                )}

                {/* Search Popup */}
                {isSearchOpen && (
                <div className="search-popup">
                    <span className="search-back-drop" onClick={() => setIsSearchOpen(false)} />
                    <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                    <span className="fa fa-times"></span>
                    </button>
                    <div className="search-inner">
                    <form method="post" action="#">
                        <div className="form-group">
                        <input type="search" name="search-field" placeholder="Search..." required />
                        <button type="submit"><i className="fa fa-search"></i></button>
                        </div>
                    </form>
                    </div>
                </div>
                )}

                {/* <!-- Sticky Header  --> */}
                <div className={`sticky-header ${scroll ? "fixed-header animated slideInDown" : ""}`}>
                <div className="auto-container">
                    <div className="inner-container">
                    {/* <!--Logo--> */}
                    <div className="logo">
                        <Link href="/">
                            <Image src={Logo} alt="Logo" style={{ width: 'auto', height: 'auto' }} />
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
                        {/* <!--Mobile Navigation Toggler--> */}
                        <div className="mobile-nav-toggler" onClick={() => setIsMobileMenuOpen(true)}><span className="icon lnr-icon-bars"></span></div>
                    </div>
                    </div>
                </div>
                </div>
            </header>
        </>
    );
};
export default Header7;
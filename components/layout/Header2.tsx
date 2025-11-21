"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './NavLinks';
import MenuSingle from "./MenuSingle";
import MobileMenu from './MobileMenu';
import MobileLogo from '../../public/images/white-logo.png';
import LogoMain from '../../public/images/white-logo.png';
import StikyLogo from '../../public/images/black-logo.png';
import LogoDark from '../../public/images/white-logo.png';

interface Header2Props {
  handleOpen: () => void;
  handleRemove: () => void;
  scroll: boolean;
  searchToggle?: boolean;
  handleToggle?: () => void;
}

function Header2 ({ handleOpen, handleRemove, scroll }: Header2Props){
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSingleMenu, setIsSingleMenu] = useState(false);
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
    const Logo2 = isDarkMode ? LogoDark : StikyLogo;
    const MenuComponent = isSingleMenu ? MenuSingle : NavLinks;

    return (
        <>
        <header className={`main-header header-style-one header-2 ${scroll ? "fixed-header" : ""}`}>
            <div className="header-lower header-lower2 show-header-section">
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
                             <MenuComponent />
                        </nav>
                        <div className="outer-box">
                            <Link href="#" className="info-btn">
                                <i className="icon fa fa-phone"></i>
                                + 88 ( 9800 ) 6802
                            </Link>

                            <Link href="/page-contact" className="theme-btn btn-style-one">Free Consultation</Link>
                            <div className="mobile-nav-toggler" onClick={handleOpen}><span className="icon lnr-icon-bars"></span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile Menu  --> */}
            <div className="mobile-menu">
            <div className="menu-backdrop" onClick={handleRemove}/>
            <nav className="menu-box">
                <div className="upper-box">
                <div className="nav-logo">
                    <Link href="/"><Image src={MobileLogo} alt="Logo" style={{ width: 'auto', height: 'auto' }} /></Link>
                </div>
                <div className="close-btn" onClick={handleRemove}><i className="icon fa fa-times"></i></div>
                </div>
                <ul className="navigation clearfix">
                <MobileMenu />
                </ul>
                <ul className="contact-list-one">
                <li>
                    {/* <!-- Contact Info Box --> */}
                    <div className="contact-info-box">
                    <i className="icon lnr-icon-phone-handset"></i>
                    <span className="title">Call Now</span>
                    <Link href="#">+92 (8800) - 98670</Link>
                    </div>
                </li>
                <li>
                    {/* <!-- Contact Info Box --> */}
                    <div className="contact-info-box">
                    <span className="icon lnr-icon-envelope1"></span>
                    <span className="title">Send Email</span>
                    <Link href="#">help@company.com</Link>
                    </div>
                </li>
                <li>
                    {/* <!-- Contact Info Box --> */}
                    <div className="contact-info-box">
                    <span className="icon lnr-icon-clock"></span>
                    <span className="title">Send Email</span>
                    Mon - Sat 8:00 - 6:30, Sunday - CLOSED
                    </div>
                </li>
                </ul>

                <ul className="social-links">
                <li>
                    <Link href="#"><i className="fab fa-twitter"></i></Link>
                </li>
                <li>
                    <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                </li>
                <li>
                    <Link href="#"><i className="fab fa-pinterest"></i></Link>
                </li>
                <li>
                    <Link href="#"><i className="fab fa-instagram"></i></Link>
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
                    <Link href="/"><Image src={Logo2} alt="Logo" style={{ width: 'auto', height: 'auto' }} /></Link>
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
                    <div className="mobile-nav-toggler" onClick={handleOpen}><span className="icon lnr-icon-bars"></span></div>
                </div>
                </div>
            </div>
            </div>
        </header>
        </>
    );
};
export default Header2;
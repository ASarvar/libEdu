"use client";

import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  extraClassName?: string;
}

interface DropdownState {
  status: boolean;
  key: number | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ extraClassName }) => {
  const [isActive, setIsActive] = useState<DropdownState>({
    status: false,
    key: null,
  });

  const [isSubActive, setSubIsActive] = useState<DropdownState>({
    status: false,
    key: null,
  });

  const handleClick = (key: number) => {
    if (isActive.key === key) {
      setIsActive({ status: false, key: null });
    } else {
      setIsActive({ status: true, key });
    }
  };

  const handleSubClick = (key: number) => {
    if (isSubActive.key === key) {
      setSubIsActive({ status: false, key: null });
    } else {
      setSubIsActive({ status: true, key });
    }
  };

  return (
    <ul className={`navigation d-block d-lg-none ${extraClassName || ""}`}>
      <li className="dropdown">
        <Link href="/">Home</Link>
        <ul className={isActive.key === 1 ? "d-block" : "d-none"}>
          <li><Link href="/">Home page 01</Link></li>
          <li><Link href="/index-2">Home page 02</Link></li>
          <li><Link href="/index-3">Home page 03</Link></li>
          <li><Link href="/index-4">Home page 04</Link></li>
          <li><Link href="/index-5">Home page 05</Link></li>
          <li><Link href="/index-6">Home page 06</Link></li>
          <li><Link href="/index-7">Home page 07</Link></li>
          <li className="dropdown">
            <Link href="/">Single Styles</Link>
            <ul className={isSubActive.key === 1 ? "d-block" : "d-none"}>
              <li><Link href="/index-1-single">Single Styles One</Link></li>
              <li><Link href="/index-2-single">Single Styles Two</Link></li>
              <li><Link href="/index-3-single">Single Styles Three</Link></li>
              <li><Link href="/index-4-single">Single Styles Four</Link></li>
              <li><Link href="/index-5-single">Single Styles Five</Link></li>
              <li><Link href="/index-6-single">Single Styles Six</Link></li>
              <li><Link href="/index-7-single">Single Styles Seven</Link></li>
            </ul>
            <div
              className={isSubActive.key === 1 ? "dropdown-btn active" : "dropdown-btn"}
              onClick={() => handleSubClick(1)}
            >
              <i className="fa fa-angle-down" />
            </div>
          </li>
        </ul>
        <div
          className={isActive.key === 1 ? "dropdown-btn active" : "dropdown-btn"}
          onClick={() => handleClick(1)}
        >
          <i className="fa fa-angle-down" />
        </div>
      </li>
      <li className="dropdown"><Link href="/">Pages</Link>
        <ul className={isActive.key === 2 ? "d-block" : "d-none"}>
            <li><Link href="/page-about">About</Link></li>
            <li><Link href="/page-faq">Faq</Link></li>
            <li><Link href="/page-pricing">Pricing</Link></li>
            <li className="dropdown"><Link href="/">Team</Link>
                <ul className={isSubActive.key === 3 ? "d-block" : "d-none"}>
                    <li><Link href="/page-team">Team List</Link></li>
                    <li><Link href="/page-team-details">Team Details</Link></li>
                </ul>
                <div className={isSubActive.key === 3 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleSubClick(3)}><i className="fa fa-angle-down"/></div>
            </li>
            <li className="dropdown"><Link href="/">Shop</Link>
                <ul className={isSubActive.key === 4 ? "d-block" : "d-none"}>
                    <li><Link href="/shop-products">Products</Link></li>
                    <li><Link href="/shop-products-sidebar">Products with Sidebar</Link></li>
                    <li><Link href="/shop-product-details">Product Details</Link></li>
                    <li><Link href="/shop-cart">Cart</Link></li>
                    <li><Link href="/shop-checkout">Checkout</Link></li>
                </ul>
                <div className={isSubActive.key === 4 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleSubClick(4)}><i className="fa fa-angle-down"/></div>
            </li>
            <li><Link href="/page-testimonial">Testimonials</Link></li>
            <li><Link href="/page-404">404</Link></li>
        </ul>
        <div className={isActive.key === 2 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleClick(2)}><i className="fa fa-angle-down"/></div>
    </li>
    <li className="dropdown"><Link href="/">Services</Link>
        <ul className={isActive.key === 3 ? "d-block" : "d-none"}>
            <li><Link href="/page-services">Services</Link></li>
            <li><Link href="/page-service-details">Services Details</Link></li>
        </ul>
        <div className={isActive.key === 3 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleClick(3)}><i className="fa fa-angle-down"/></div>
    </li>
    <li className="dropdown"><Link href="/">Project</Link>
        <ul className={isActive.key === 4 ? "d-block" : "d-none"}>
            <li><Link href="/page-projects">Our Project</Link></li>
            <li><Link href="/page-project-details">Project Details</Link></li>
        </ul>
        <div className={isActive.key === 4 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleClick(4)}><i className="fa fa-angle-down"/></div>
    </li>
    <li className="dropdown"><Link href="/">News</Link>
        <ul className={isActive.key === 5 ? "d-block" : "d-none"}>
            <li><Link href="/news-grid">News Grid</Link></li>
            <li><Link href="/news-details">News Details</Link></li>
        </ul>
        <div className={isActive.key === 5 ? "dropdown-btn active" : "dropdown-btn"} onClick={() => handleClick(5)}><i className="fa fa-angle-down"/></div>
    </li>
    <li><Link href="/page-contact">Contact</Link></li>
    </ul>
  );
};

export default MobileMenu;
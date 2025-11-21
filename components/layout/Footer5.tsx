import React from 'react';
import Link from 'next/link';
import BackToTop from '../elements/BackToTop';

function Footer5 (){
  return (
    <footer className="main-footer footer-style-three at-home6 pt-100">
      <div className="container">
        <div className="footer-cta">
          <div className="sec-title">
            <h2 className="title text-white wow splt-txt" data-splitting>Looking For Professional business consultant ?</h2>
          </div>
          <div className="btn-wrp wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
            <Link href="/page-contact" className="cta-btn">Get Started Free <i className="fa-regular fa-arrow-up-right" /></Link>
            <p className="text text-white">No credit card required</p>
          </div>
          <div className="bg-shape">
            <img src="images/shape/cta-line.png" alt="Image" />
          </div>
          <div className="arry">
            <img className="animation__arryLeftRight" src="images/shape/cta-arry.png" alt="Image" />
          </div>
        </div>
        <div className="widgets-section">
          <div className="row g-5 g-xl-0">
            <div className="col-lg-4 footer-column">
              <div className="footer-widget about-widget">
                <div className="logo">
                  <Link href="/"><img src="images/logo-2.png" alt="Logo" /></Link>
                </div>
                <div className="widget-content">
                  <p className="text">At vero eos et accusamus iusto odio dignissimos ducimus blanditiise</p>
                  <div className="input-feild">
                    <input type="text" placeholder="Email Address" />
                    <button><i className="fa-regular fa-arrow-up-right" /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4 g-xl-0">
                <div className="col-sm-6 col-xl-3 footer-column">
                  <div className="footer-widget links-widget">
                    <h4 className="widget-title">Resource</h4>
                    <div className="widget-content">
                      <ul className="user-links">
                        <li><Link href="/">Product</Link></li>
                        <li><Link href="/">Services</Link></li>
                        <li><Link href="/">About Us</Link></li>
                        <li><Link href="/">Benefits</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 footer-column">
                  <div className="footer-widget links-widget">
                    <h4 className="widget-title">Quick Link</h4>
                    <div className="widget-content">
                      <ul className="user-links">
                        <li><Link href="/">Features</Link></li>
                        <li><Link href="/">Pricing Plan</Link></li>
                        <li><Link href="/">Best Program</Link></li>
                        <li><Link href="/">Press Kit</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 footer-column">
                  <div className="footer-widget links-widget">
                    <h4 className="widget-title">Company</h4>
                    <div className="widget-content">
                      <ul className="user-links">
                        <li><Link href="/">About</Link></li>
                        <li><Link href="/">Team Member</Link></li>
                        <li><Link href="/">Reviews</Link></li>
                        <li><Link href="/">Latest News</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3 footer-column">
                  <div className="footer-widget links-widget contact-widget">
                    <h4 className="widget-title">Contact</h4>
                    <div className="widget-content">
                      <ul className="user-links">
                        <li>
                          <i className="fa-light fa-location-dot" />
                          <Link href="/">55 Main Street, 2nd block Melbourne, Australia</Link>
                        </li>
                        <li>
                          <i className="fa-light fa-envelope" />
                          <Link href="#">support@gmail.com</Link>
                        </li>
                        <li>
                          <i className="fa-light fa-phone-flip" />
                          <Link href="#">+000 (123) 44 55</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">Copyright ©2025, <Link href="/">Design</Link> All Rights Reserved</p>
          <ul className="footer-nav">
            <li><Link href="/">Faqs</Link></li>
            <li><Link href="/">Setting</Link></li>
            <li><Link href="/">Privacy</Link></li>
            <li><Link href="/">Contact</Link></li>
          </ul>
          <BackToTop/>
        </div>
      </div>
      <div className="sec-shape">
        <img className="animation__rotateY" src="images/shape/dual-circle420.png" alt="Image" />
      </div>
      <div className="box-shape">
        <div className="box1 wow slideInUp" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
        <div className="box2 wow slideInLeft" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
      </div>
    </footer>
  );
};

export default Footer5;

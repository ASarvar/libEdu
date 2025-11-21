import React from 'react';
import Link from 'next/link';

function Footer4() {
  return (
    <>
    <footer className="main-footer footer-style-four">
      <div className="container">
        <div className="widgets-section">
          <div className="row g-5 justify-content-between">
            <div className="col-sm-12 col-lg-5 col-xl-6">
              <div className="footer-widget about-widget">
                <h4 className="widget-title wow splt-txt" data-splitting>Subscribe Newsletter</h4>
                <p className="text wow fadeInUp">
                  We understand that every challenge is an opportunity. We're here to seize it with a team of dedicated professionals and a culture
                </p>
                <div className="input-feild">
                  <i className="fa-sharp fa-light fa-envelope" />
                  <input type="text" placeholder="Email Address" />
                  <Link className="btn-one-rounded" href="/">
                    Sign Up <i className="fa-regular fa-angle-right" />
                  </Link>
                </div>
                <h5 className="privacy">
                  By subscribing, you’re accept <Link href="#">Privacy Policy</Link>
                </h5>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 col-xl-2">
              <div className="footer-widget links-widget">
                <h4 className="widget-title">Services</h4>
                <div className="widget-content">
                  <ul className="user-links">
                    <li><Link href="/">Business Plan</Link></li>
                    <li><Link href="/">Growth Strategy</Link></li>
                    <li><Link href="/">Strategic Planning</Link></li>
                    <li><Link href="/">Workflow Automation</Link></li>
                    <li><Link href="/">Lead Generation</Link></li>
                    <li><Link href="/">Financial Planning</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <div className="footer-widget contact-widget">
                <h4 className="widget-title">Locations</h4>
                <div className="widget-content">
                  <h5 className="text">55 Main Street, 2nd block Malborne, Australia</h5>
                </div>
                <h4 className="widget-title mt-30">Contact</h4>
                <div className="widget-content">
                  <Link href="#">support@gmail.com</Link>
                  <h4 className="nuber">
                    <Link href="#">+880 (123) 456 88</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="logo">
            <Link href="/">
              <img src="/images/logo-light.png" alt="Logo" />
            </Link>
          </div>
          <div className="language">
            <select name="language" id="language">
              <option value="1">English (US)</option>
              <option value="2">English (UK)</option>
              <option value="3">Bangla (BD)</option>
            </select>
          </div>
          <p className="copyright-text">
            © 2025 <Link href="/">Kodesolution</Link> - IT Services. All rights reserved.
          </p>
        </div>
      </div>
      <div className="sec-shape">
        <img className="animation__rotate" src="/images/shape/globe-left.png" alt="Image" />
      </div>
    </footer>
    </>
  );
}

export default Footer4;
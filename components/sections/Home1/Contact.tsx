import React from "react";
import Link from "next/link";

function Contact() {
  return (
      <section id="contact" className="contact-section fix section-padding">
        <div className="contact-shape">
          <img src="images/home-1/contact/contact-shape.png" alt="img" />
        </div>
        <div className="auto-container">
          <div className="contact-wrapper">
            <div className="row g-4">
              <div className="col-lg-6 col-md-8">
                <div className="contact-content-1">
                  <div className="sec-title mb-0">
                    <h6 className="sub-title text-white wow fadeInUp">
                      <span className="triangle triangle1"></span>
                      <span className="triangle triangle2"></span>
                      Contact Us
                    </h6>
                    <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">Please Keep in Touch With us When you want</h2>
                  </div>
                  <form action="#" className="form-box wow fadeInUp" data-wow-delay=".3s">
                    <div className="row g-4">
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="name" placeholder="Full Name*" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <input type="text" name="name" id="phone" placeholder="Phone" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <textarea name="message" id="message" placeholder="Message"></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-clt">
                          <button className="theme-btn btn-style-one w-100" type="submit">Submit Now</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
        <div className="contact-image-1">
          <img src="images/home-1/contact/contact-image.jpg" alt="img" className="wow img-custom-anim-right" />
          <div className="shape-image">
            <img src="images/home-1/contact/shape-1.png" alt="img" />
          </div>
          <div className="contact-info-box float-bob-y">
            <h2>Still Have you Any Question?</h2>
            <ul className="contact-list">
              <li>
                <div className="icon">
                  <i className="lnr-icon-phone-handset"></i>
                </div>
                <div className="content">
                  <h3>Call Us</h3>
                  <p><Link href="#">+1840 8415 2569</Link></p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="lnr-icon-envelope"></i>
                </div>
                <div className="content">
                  <h3>Mail Us</h3>
                  <p><Link href="#">finclix@ourmail.com</Link></p>
                </div>
              </li>
            </ul>
            <span className="ellipse-bg"></span>
          </div>
        </div>
      </section>
  );
}

export default Contact;
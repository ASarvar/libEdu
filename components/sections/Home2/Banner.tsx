import React from 'react';
import Link from 'next/link';

function Banner() {
  return (
    <>
      <section id="home" className="hero-section hero-2 bg-cover" style={{backgroundImage: 'url(images/home-2/hero/hero-image.jpg)'}}>
        <div className="row g-4 justify-content-between align-items-end">
          <div className="col-xxl-6">
            <div className="hero-content">
              <h1 className="wow fadeInUp" data-wow-delay=".2s">
                We are Helping to 
                Grow Your <span>Business</span> 
                Success.
              </h1>
              <p className="hero-text wow fadeInUp" data-wow-delay=".4s">
                everyone with high and useful reward for his her trading, purchase and investment. 
              </p>
              <div className="hero-button wow fadeInUp" data-wow-delay=".6s">
                <Link href="/page-contact" className="theme-btn btn-style-one">
                  Lets Talk With Us
                  <span className="icon">
                    <i className="lnr-icon-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xxl-5">
            <div className="hero-box-items">
              <div className="hero-box wow fadeInUp" data-wow-delay=".3s">
                <div className="icon">
                  <i className="flaticon-business-028-briefcase"></i>
                </div>
                <div className="content">
                  <h3>Consultancy</h3>
                  <p>
                    everyone with high and useful reward for
                  </p>
                </div>
              </div>
              <div className="hero-box wow fadeInUp" data-wow-delay=".5s">
                <div className="icon"><i className="flaticon-finance-business-expense-svgrepo-com-1"></i></div>
                <div className="content">
                  <h3>Business Mentor</h3>
                  <p>
                    everyone with high and useful reward for
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>   
  );
}

export default Banner;
import React from 'react';
import Link from 'next/link';


function Banner() {
  return (
    <>
      <section id="home" className="hero-section hero-7">
        <div className="bg-layer" style={{backgroundImage: 'url(images/home-7/banner/banner-image.jpg)'}}></div>
        <div className="banner-shape"><img src="images/home-7/banner/banner-shape.jpg" alt="Image"/></div>
        <div className="container-fluid">
          <div className="banner-content">
            <div className="anim-icons">
              <div className="shape-image-1 float-bob-x"><img src="images/home-7/banner/shape-image1.png" alt="Image"/></div>
              <div className="shape-image-2 float-bob-x"><img src="images/home-7/banner/shape-image2.png" alt="Image"/></div>
            </div>
            <div className="banner-know-box wow fadeInUp" data-wow-delay=".3s">
              <div className="icon">
                <svg width="18" height="26" viewBox="0 0 18 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 10.5H17.75L4 25.5L7.75 14.25H0.25L10.25 0.5L9 10.5Z" fill="white"/>
                </svg>
              </div>
              <div className="text">Reliable And Fast Business Solutions</div>
            </div>
            <h1 className="title wow fadeInUp" data-wow-delay=".2s">Market Smarter <br/>Grow Faster </h1>
            <p className="banner-text wow fadeInUp" data-wow-delay=".4s">They analyse existing Marketing policies or help clients select the most suitable policies for health life property</p>
            <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
              <Link href="/page-contact" className="theme-btn btn-style-two">
                Lets Talk With Us
                <i className="icon flaticon-finance-arrow-right-svgrepo-com1-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;

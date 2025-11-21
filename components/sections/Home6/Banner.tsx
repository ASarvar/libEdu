import React from 'react';
import Link from "next/link";

function Banner() {
  return (
    <section id="home" className="hero-section hero-6">
      <div className="bg-layer">
        <div className="shape-1">
          <img src="images/home-6/banner/hero-bg-shape.png" alt="" />
        </div>
        <div
          className="shape-2"
          style={{ backgroundImage: 'url("images/home-6/banner/hero-bg-shape-2.png")' }}
        ></div>
      </div>

      <div className="auto-container">
        <div className="row g-4">
          <div className="col-xl-8 col-lg-6">
            <div className="banner-content">
              <h1 className="wow fadeInUp" data-wow-delay=".2s">
                Your Trusted Insurance <br /> Consulting Partner
              </h1>

              <div className="text-item wow fadeInUp" data-wow-delay=".4s">
                <p>
                  They analyze existing insurance policies or help clients select the most suitable
                  policies for health life property liability auto
                </p>
              </div>

              <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                <Link href="/page-contact" className="theme-btn btn-style-three">
                  Lets Talk With Us
                  <span className="icon">
                    <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                  </span>
                </Link>
              </div>

              <div className="paper-shape">
                <img src="images/home-6/banner/paper-shape.png" alt="img" />
              </div>

              <div className="banner-user">
                <ul>
                  <li><img src="images/home-6/banner/banner-user1.png" alt="Image" /></li>
                  <li><img src="images/home-6/banner/banner-user2.png" alt="Image" /></li>
                  <li><img src="images/home-6/banner/banner-user3.png" alt="Image" /></li>
                  <li>30k</li>
                </ul>
                <h6 className="user-title">Our 30k Satisfaction Clients Worldwide</h6>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
            <div className="banner-image ed_top_img">
              <img src="images/home-6/banner/banner-image-1.png" alt="img" />

              <div className="circle-shape animation__rotateAndScale">
                <img src="images/home-6/banner/circle-shape.png" alt="" />
                <div className="circle-light"></div>
              </div>

              <div className="banner-quote sway_Y__animationY">
                <div className="icon-box">
                  <i className="flaticon-business-017-medal"></i>
                </div>
                <div className="content-box">
                  <div className="content-title">Certified Consultant</div>
                  <div className="content-text">
                    Accelerate innovation with world match entire remote team
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shape-image1 sway_Y__animationY">
        <img src="images/home-6/banner/shape-image1.png" alt="img" />
      </div>
    </section>
  );
}

export default Banner;

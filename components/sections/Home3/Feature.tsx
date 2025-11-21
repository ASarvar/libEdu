import React from "react";
import Link from "next/link";

const Feature = () => {
  return (
      <section className="feature-section-3 fix">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="feature-box-3">
              <div className="arrow-shape">
                <img src="images/home-3/arrow-shape.png" alt="img"/>
              </div>
              <div className="client-image wow fadeInUp" data-wow-delay=".2s">
                <img src="images/home-1/client-1.png" alt="img"/>
                <img src="images/home-1/client-2.png" alt="img" className="icon-2"/>
                <img src="images/home-1/client-3.png" alt="img" className="icon-3"/>
                <img src="images/home-1/client-4.png" alt="img" className="icon-4"/>
              </div>
              <span className="wow fadeInUp" data-wow-delay=".4s"><b>120M</b> Active Clients</span>
              <Link href="/page-contact" className="theme-btn btn-style-one wow fadeInUp" data-wow-delay=".6s">
                Lets Talk With Us
                <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
              </Link>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="row g-4">
              <div className="col-xl-6 col-lg-12 col-sm-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="feature-service-card-items">
                <div className="icon">
                  <i className="flaticon-business-028-briefcase"></i>
                </div>
                <div className="content">
                  <h3><Link href="/page-service-details">Business Consulting</Link></h3>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected 
                  </p>
                  <Link href="/page-service-details" className="text-btn">
                    Read More
                  </Link>
                </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12 col-sm-6 wow fadeInUp" data-wow-delay=".5s">
                <div className="feature-service-card-items">
                  <div className="icon">
                    <i className="flaticon-finance-business-expense-svgrepo-com-1"></i>
                  </div>
                  <div className="content">
                    <h3><Link href="/page-service-details">business Strategy</Link></h3>
                    <p>
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected 
                    </p>
                    <Link href="/page-service-details" className="text-btn">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Feature;

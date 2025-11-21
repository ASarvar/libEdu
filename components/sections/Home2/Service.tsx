import React from "react";
import Link from "next/link";

interface ServiceProps {
  className?: string;
}

const Service: React.FC<ServiceProps> = ({ className }) => {
  return (
    <>
      <section id="service" className={`service-section-2 section-padding fix ${className || ""}`}>
        <div className="auto-container">
          <div className="sec-title text-center">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              What We Do
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">We Cover All Business Services</h2>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="service-card-items-2">
                <div className="service-icon">
                  <div className="icon">
                    <i className="flaticon-business-028-briefcase"></i>
                    <div className="service-triangle"></div>
                  </div>
                  <span className="number">
                    01
                  </span>
                </div>
                <div className="content">
                  <h3><Link href="/page-service-details">Business Consulting</Link></h3>
                  <p>
                    everyone with high and useful reward for  his We offer a free consultation <br/>
                    so that .
                  </p>
                </div>
                <div className="arrow-shape-2 float-bob-x">
                  <img src="images/home-2/service-icon/arrow-shape.png" alt="img"/>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="service-card-items-2">
                <div className="service-icon">
                  <div className="icon">
                    <i className="lnr-icon-folder-open"></i>
                    <div className="service-triangle"></div>
                  </div>
                  <span className="number">
                    02
                  </span>
                </div>
                <div className="content">
                  <h3><Link href="/page-service-details">Invest Process</Link></h3>
                  <p>
                    everyone with high and useful reward for  his We offer a free consultation <br/>
                    so that .
                  </p>
                </div>
                <div className="arrow-shape-2 float-bob-x">
                  <img src="images/home-2/service-icon/arrow-shape.png" alt="img"/>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="service-card-items-2">
                <div className="service-icon">
                  <div className="icon">
                    <i className=" lnr-icon-layers"></i>
                    <div className="service-triangle"></div>
                  </div>
                  <span className="number">
                    03
                  </span>
                </div>
                <div className="content">
                  <h3><Link href="/page-service-details">Life Insurance</Link></h3>
                  <p>
                    everyone with high and useful reward for  his We offer a free consultation <br/>
                    so that .
                  </p>
                </div>
                <div className="arrow-shape-2 float-bob-x">
                  <img src="images/home-2/service-icon/arrow-shape.png" alt="img"/>
                </div>
              </div>
            </div>
          </div>
          <div className="service-know-box wow fadeInUp" data-wow-delay=".3s">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" viewBox="0 0 24 34" fill="none">
              <defs>
                <linearGradient id="paint0_linear_1_745" x1="11.9987" y1="0.333008" x2="11.9987" y2="33.6663" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#099696"/>
                <stop offset="1" stopColor="#B2E66E"/>
                </linearGradient>
              </defs>
              <path d="M11.9987 13.6663H23.6654L5.33203 33.6663L10.332 18.6663H0.332031L13.6654 0.333008L11.9987 13.6663Z"
                  fill="url(#paint0_linear_1_745)" />
              </svg>
            </div>
            <p>We Strive To Lead The way In  The business <Link href="/page-services">Know All Services <i className="fa-regular fa-arrow-right"></i></Link></p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;

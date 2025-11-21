import React from 'react';
import Link from 'next/link';

function Pricing() {
  return (
    <>
      <section className="pricing-section-three">
        <div className="auto-container">
          <div className="sec-title text-center mb-50">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              Pricing Plan
            </h6>
            <h2 className="text-anim wow fadeInUp" data-wow-delay=".3s">our popular pricing plan <br/>by company</h2>
          </div>
          <div className="row">
            <div className="pricing-block-three col-xl-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
              <div className="inner-box">
                <div className="pricing-icon">
                  <i className="flaticon-business-023-lifesaver"></i>
                </div>
                <div className="content">
                  <div className="bg-layer"></div>
                  <div className="pricing-box">
                    <div className="price"><sub>$</sub> 50 <sup>.99</sup></div>
                    <span className="time">Monthly</span>
                  </div>
                  <h4 className="pricing-title">Personal Plan</h4>
                  <div className="text">There are many variation of passages of Lorem Ipsum available form.</div>
                  <ul className="list-style-three">
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Unlimited features
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Multi language content
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      30 Days free trial features
                    </li>
                    <li className="disable-color">
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Data backup and recovery
                    </li>
                    <li className="disable-color">
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Updates via dashboard & slack
                    </li>
                  </ul>
                  <div className="btn-box">
                    <Link href="#" className="theme-btn btn-style-two"><span className="btn-title">Get Started Now</span></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-block-three col-xl-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".5s">
              <div className="inner-box">
                <div className="pricing-icon">
                  <i className="flaticon-business-063-diamond"></i>
                </div>
                <div className="content">
                  <div className="bg-layer"></div>
                  <div className="pricing-box">
                    <div className="price"><sub>$</sub> 60 <sup>.99</sup></div>
                    <span className="time">Monthly</span>
                  </div>
                  <h4 className="pricing-title">Premium Plan</h4>
                  <div className="text">There are many variation of passages of Lorem Ipsum available form.</div>
                  <ul className="list-style-three">
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Unlimited features
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Multi language content
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      30 Days free trial features
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Data backup and recovery
                    </li>
                    <li className="disable-color">
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Updates via dashboard & slack
                    </li>
                  </ul>
                  <div className="btn-box">
                    <Link href="#" className="theme-btn btn-style-two"><span className="btn-title">Get Started Now</span></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pricing-block-three col-xl-4 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".7s">
              <div className="inner-box">
                <div className="pricing-icon">
                  <i className="flaticon-business-007-settings"></i>
                </div>
                <div className="content">
                  <div className="bg-layer"></div>
                  <div className="pricing-box">
                    <div className="price"><sub>$</sub> 70 <sup>.99</sup></div>
                    <span className="time">Monthly</span>
                  </div>
                  <h4 className="pricing-title">Standard Plan</h4>
                  <div className="text">There are many variation of passages of Lorem Ipsum available form.</div>
                  <ul className="list-style-three">
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Unlimited features
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Multi language content
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      30 Days free trial features
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Data backup and recovery
                    </li>
                    <li>
                      <div className="icon"><i className="fa-solid fa-check"></i></div>
                      Updates via dashboard & slack
                    </li>
                  </ul>
                  <div className="btn-box">
                    <Link href="#" className="theme-btn btn-style-two"><span className="btn-title">Get Started Now</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pricing;
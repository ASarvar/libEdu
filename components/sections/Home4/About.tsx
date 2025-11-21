import React from "react";
import Link from 'next/link';
import CounterUp from "../../elements/CounterUp";

function About() {
  return (
    <>
      <section id="about" className="about-section-4 section-padding pt-0">
        <div className="auto-container">
          <div className="row g-4 align-items-center">
              <div className="col-xl-6">
                <div className="about-image-style-4 wow img-custom-anim-left">
                  <img src="images/home-4/about/about-01.png" alt="img"/>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="about-content-style-4">
                  <div className="sec-title mb-0">
                    <h6 className="sub-title wow fadeInUp">
                      <span className="triangle triangle1"></span>
                      <span className="triangle triangle2"></span>
                      Who We Are
                    </h6>
                    <h2 className="wow fadeInUp" data-wow-delay=".2s">
                      The Journey Behind Our Business Success
                    </h2>
                  </div>
                  <p className="about-text wow fadeInUp mt-3" data-wow-delay=".6s">
                    Consultez is the go-to hub for early adopters and innovation enthusiasts, offering cutting-edge technology. Collaboratively disintermediate one to one functionalities and long term impact niche.
                  </p>
                  <div className="about-icon-box">
                    <div className="count-box wow fadeInUp" data-wow-delay=".3s">
                      <h2>
                        <span className="count-text"><CounterUp end={15} /></span>+
                      </h2>
                      <p>
                        Years of Experience
                      </p>
                    </div>
                    <div className="icon-right">
                      <div className="about-block wow fadeInUp" data-wow-delay=".6s">
                          <div className="inner-box">
                            <div className="icon">
                              <i className="flaticon-finance-creativity-1-1"></i>
                            </div>
                            <div className="content">
                              <h6 className="title">Business Consulting</h6>
                              <p className="text">On the other hand, we denounce</p>
                            </div>
                          </div>
                      </div>
                      <div className="about-block mb-0 wow fadeInUp" data-wow-delay=".8s">
                        <div className="inner-box">
                          <div className="icon">
                            <i className="flaticon-finance-edit-tools-1"></i>
                          </div>
                          <div className="content">
                            <h6 className="title">Audit & Assurance</h6>
                            <p className="text">Innovation is the key to staying </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info mt-50 wow fadeInUp" data-wow-delay=".2s">
                    <Link href="/page-contact" className="theme-btn btn-style-one">
                      Lets Talk With Us
                      <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                    </Link>
                    <div className="user">
                      <div className="image">
                        <img src="images/home-3/about/about-user.png" alt="Image"/>
                      </div>
                      <div>
                        <img src="images/home-3/about/signature.png" alt="Image"/>
                        <p className="sub-title">Founder</p>
                      </div>
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

export default About;
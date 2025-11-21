import React from "react";
import Link from 'next/link';
import CounterUp from '../../elements/CounterUp';

function Service() {

  return (
    <>
      <section id="service" className="service-section section-padding fix bg-cover" style={{backgroundImage: 'url(images/home-1/service/service-bg.jpg)'}}> 
        <span className="ellipse-bg"></span>
        <div className="auto-container">
          <div className="sec-title">
            <div className="row g-4 justify-content-between align-items-center">
              <div className="col-xl-7 col-lg-7">
                <h6 className="text-white sub-title wow fadeInUp">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  LATEST SERVICES
                </h6>
                <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">Guidance for Personal and Professional Growth.</h2>
              </div>
              <div className="col-xl-3 col-lg-4 wow fadeInUp" data-wow-delay=".3s">
                <div className="section-counter-content">
                  <h3 className="count-box"><span className="count-text"><CounterUp end={5} /></span>k+</h3>
                  <h6 className="text-white font-size-20 line-height-1 font-weight-400">Satisfied Clients</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service-wrapper">
          <div className="row">
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="service-card-items">
                <div className="icon"><i className="flaticon-finance-business-expense-svgrepo-com-1"></i></div>
                <div className="content">
                  <h3><Link href="/page-service-details">Business Consulting</Link></h3>
                  <p>We promise cost-effective business consulting solutions designed to help you lower expenses and boost profits.</p>
                  <Link href="/page-service-details" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
              <div className="service-card-items">
                <div className="icon"><i className=" lnr-icon-layers"></i></div>
                <div className="content">
                  <h3><Link href="/page-service-details">Invest Propose</Link></h3>
                  <p>We promise cost-effective business consulting solutions designed to help you lower expenses and boost profits.</p>
                  <Link href="/page-service-details" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
              <div className="service-card-items">
                <div className="icon"><i className="flaticon-business-023-lifesaver"></i></div>
                <div className="content">
                  <h3><Link href="/page-service-details">Accounting</Link></h3>
                  <p>We promise cost-effective business consulting solutions designed to help you lower expenses and boost profits.</p>
                  <Link href="/page-service-details" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
              <div className="service-card-items">
                <div className="icon"><i className="lnr-icon-folder-open"></i></div>
                <div className="content">
                  <h3><Link href="/page-service-details">Career Development</Link></h3>
                  <p>We promise cost-effective business consulting solutions designed to help you lower expenses and boost profits.</p>
                  <Link href="/page-service-details" className="link-btn"><i className="lnr-icon-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Service;

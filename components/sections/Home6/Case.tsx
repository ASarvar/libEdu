import React from 'react';
import Link from 'next/link';

function Case() {
  return (
    <>
      <section className="case-section section-padding">
        <div className="auto-container">
          <div className="row g-4 justify-content-between">
            <div className="col-xxl-4 col-lg-5 col-md-8">
              <div className="case-title-box sticky-style">
                <div className="sec-title mb-0">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    Case Studies
                  </h6>
                  <h2 className="text-anim wow fadeInUp" data-wow-delay=".3s">Recent Solutions in Action</h2>
                </div>
                <p className="title-text wow fadeInUp mb-30" data-wow-delay=".4s">The client experienced rapid growth and needed to reassess its insurance coverage. Their existing policies lacked clarity and they faced</p>
                <Link href="/page-services" className="theme-btn btn-style-two wow fadeInUp" data-wow-delay=".5s">
                  Show More
                  <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                </Link>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="case-block-one mb-50 wow fadeInUp" data-wow-delay="0s">
                <div className="inner-box" style={{backgroundImage: 'url(images/home-6/case/case-image-1.jpg)'}}>
                  <h3 className="case-title"><Link href="/page-service-details">Strategic Insurance Advisor</Link></h3>
                  <div className="content">
                    <div className="sl-number">01</div>
                    <Link href="/page-service-details" className="icon"><i className="fa-regular fa-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="case-block-one mb-50 wow fadeInUp" data-wow-delay=".2s">
                <div className="inner-box" style={{backgroundImage: 'url(images/home-6/case/case-image-2.jpg)'}}>
                  <h3 className="case-title"><Link href="/page-service-details">Operational Efficiency Consultant</Link></h3>
                  <div className="content">
                    <div className="sl-number">02</div>
                    <Link href="/page-service-details" className="icon"><i className="fa-regular fa-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="case-block-one mb-50 wow fadeInUp" data-wow-delay=".3s">
                <div className="inner-box" style={{backgroundImage: 'url(images/home-6/case/case-image-3.jpg)'}}>
                  <h3 className="case-title"><Link href="/page-service-details">Claims Management Support</Link></h3>
                  <div className="content">
                    <div className="sl-number">03</div>
                    <Link href="/page-service-details" className="icon"><i className="fa-regular fa-arrow-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="case-block-one wow fadeInUp" data-wow-delay=".4s">
                <div className="inner-box" style={{backgroundImage: 'url(images/home-6/case/case-image-4.jpg)'}}>
                  <h3 className="case-title"><Link href="/page-service-details">Insurance Provider Evaluation</Link></h3>
                  <div className="content">
                    <div className="sl-number">04</div>
                    <Link href="/page-service-details" className="icon"><i className="fa-regular fa-arrow-right"></i></Link>
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

export default Case;

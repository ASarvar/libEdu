import React from 'react';
import CounterUp from '../../elements/CounterUp';

function Banner() {
  return (
    <>
      <section id="home" className="hero-section hero-4">
        <div className="ellipse-bg">
          <img src="images/home-4/hero/ellipse-bg.png" alt="img"/>
        </div>
        <div className="container-fluid">
          <div className="right-shape float-bob-x">
            <img src="images/home-4/hero/right-shape.png" alt="img"/>
          </div>
          <div className="hero-content">
            <h1 className="wow fadeInUp" data-wow-delay=".3s">
              We are Helping to Grow <br/> Your <span>Business</span> 
            </h1>
          </div>
          <div className="image-box anim-fade-move wow fadeInUp" data-wow-delay=".5s">
            <div className="image-1">
              <img src="images/home-4/hero/hero-image.png" alt="img"/>
            </div>
            <div className="customer-info anim-fade-move" data-fade-from="right" data-delay="0.05">
              <div className="count-outer">
                <div className="client-img">
                  <img src="images/home-4/hero/customer.png" alt="img"/>
                </div>
                <div className="count-box"><span className="count-text"><CounterUp end={200} /></span>k</div>
              </div>
              <h5 className="title">Active Clients Worldwide</h5>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
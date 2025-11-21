import React from "react";
import CounterUp from '../../elements/CounterUp';

function About() {
  return (
      <section id="about" className="about-section section-padding">
        <div className="star-shape bounce-y">
          <img src="images/home-1/about/star-shape.png" alt="img" />
        </div>
        <div className="arrow-shape-1 bounce-x">
          <img src="images/home-1/about/arrow-1.png" alt="img" />
        </div>
        <div className="arrow-shape-2 bounce-y">
          <img src="images/home-1/about/arrow-2.png" alt="img" />
        </div>
        <div className="auto-container">
          <div className="row g-4 align-items-center">
            <div className="col-xl-6">
              <div className="about-image-1 wow img-custom-anim-left">
                <img src="images/home-1/about/about-image.png" alt="img" />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="about-content-1">
                <div className="sec-title mb-0">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                      Who We Are
                  </h6>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">Increase your money systematically</h2>
                </div>
                <div className="icon-items wow fadeInUp" data-wow-delay=".4s">
                  <div className="icon">
                    <i className="lnr-icon-briefcase"></i>
                  </div>
                  <p>everyone with high and useful reward for his/her trading, purchase and investment</p>
                </div>
                <p className="about-text wow fadeInUp" data-wow-delay=".6s">everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the</p>
                <div className="about-list-items">
                  <ul className="about-list wow fadeInUp" data-wow-delay=".8s">
                    <li><span className="icon"> <i className="fa-solid fa-check"></i> </span> Protecting your company</li>
                    <li><span className="icon"> <i className="fa-solid fa-check"></i> </span> We offer you solutions</li>
                    <li><span className="icon"> <i className="fa-solid fa-check"></i> </span> we take care of you</li>
                    <li><span className="icon"> <i className="fa-solid fa-check"></i> </span> everyone with high</li>
                  </ul>
                  <div className="counter-box bg-cover wow fadeInUp" data-wow-delay=".8s">
                    <div className="butterfly-shape"><img src="images/home-1/about/butterfly.png" alt="img" /></div>
                    <div className="count-box"><h2><span className="count-text"><CounterUp end={25} /></span> +</h2></div>
                    <div className="counter-bottom">
                      <p>Years of Experience</p>
                      <div className="icon"><i className="flaticon-business-006-target"></i></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default About;
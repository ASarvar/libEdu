import React from "react";
import Link from "next/link";
import ProgressCircle from '../../elements/ProgressCircle';

function Growth() {
  const data = [
    { value: 90, title: "Scalable Solutions", text: "End to end fiber optic cable connectivity for stable" },
    { value: 95, title: "Automation Features", text: "End to end fiber optic cable connectivity for stable" },
    { value: 75, title: "24/7 Support", text: "End to end fiber optic cable connectivity for stable" },
  ];

  return (
    <section
      className="growth-section section-padding bg-cover"
      style={{ backgroundImage: "url(images/home-3/growth-bg.jpg)" }}
    >
      <div className="sec-shape">
        <img className="sway_Y__animation" src="images/growth-shape.png" alt="Shape" />
      </div>
      <div className="auto-container">
        <div className="sec-title">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-7 col-lg-7">
              <h6 className="text-white sub-title">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Growth Rate
              </h6>
              <h2 className="text-white">
                Building Connections for grow Limitless Opportunities.
              </h2>
            </div>
            <div className="col-xl-3 col-lg-4">
              <Link href="/page-contact" className="theme-btn btn-style-one">
                Lets Talk With Us
                <span className="icon">
                  <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-5">
          {data.map((item, i) => (
            <div key={i} className="col-xl-4">
              <div className="growth-block">
                <ProgressCircle value={item.value} fgColor="#C8F169" bgColor="#fff" />
                <div className="content-box">
                  <h4 className="title">{item.title}</h4>
                  <p className="text">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Growth;
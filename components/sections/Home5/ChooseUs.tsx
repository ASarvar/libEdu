"use client";

import React, { useState, useEffect } from "react";

const tabs = [
  {
    id: "Mission",
    title: "Our Mission",
    desc: "everyone with high and useful reward for his/her trading, purchase investment to make the Collabo",
    list: [
      "Protecting your company",
      "We offer you solutions",
      "We take care of you",
    ],
    progress: [
      { label: "Success Rate", value: 90 },
      { label: "Business Growth", value: 80 },
    ],
  },
  {
    id: "Vision",
    title: "Our Vision",
    desc: "everyone with high and useful reward for his/her trading, purchase investment to make the Collabo",
    list: [
      "Protecting your company",
      "We offer you solutions",
      "We take care of you",
    ],
    progress: [
      { label: "Success Rate", value: 85 },
      { label: "Business Growth", value: 75 },
    ],
  },
  {
    id: "Philosophy",
    title: "Our Philosophy",
    desc: "everyone with high and useful reward for his/her trading, purchase investment to make the Collabo",
    list: [
      "Protecting your company",
      "We offer you solutions",
      "We take care of you",
    ],
    progress: [
      { label: "Success Rate", value: 88 },
      { label: "Business Growth", value: 78 },
    ],
  },
  {
    id: "Acchievment",
    title: "Achievement",
    desc: "everyone with high and useful reward for his/her trading, purchase investment to make the Collabo",
    list: [
      "Protecting your company",
      "We offer you solutions",
      "We take care of you",
    ],
    progress: [
      { label: "Success Rate", value: 92 },
      { label: "Business Growth", value: 85 },
    ],
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState("Mission");
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([]);

  const activeData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // Animate progress whenever tab changes
  useEffect(() => {
    let start = Array(activeData.progress.length).fill(0);
    const step = () => {
      let done = true;
      start = start.map((val, i) => {
        if (val < activeData.progress[i].value) {
          done = false;
          return Math.min(val + 1, activeData.progress[i].value);
        }
        return val;
      });
      setAnimatedProgress([...start]);
      if (!done) requestAnimationFrame(step);
    };
    step();
  }, [activeTab]);

  return (
    <section
      className="why-choose-section fix section-bg-2">
        <div className="shape-1 bounce-y"><img src="images/home-5/shape/shape-image-1.png" alt="Image"/></div>
      <div className="auto-container">
        <div className="why-choose-us-wrapper">
          <div className="row g-4 align-items-center">
            {/* Left Image */}
            <div className="col-xl-5">
              <div className="why-choose-us-image-1">
                <img
                  src="images/home-1/choose-us/choose-us.jpg"
                  alt="img"
                  className="wow img-custom-anim-left"
                />
                <div className="icon-box-items">
                  <div className="icon">
									<i className="flaticon-finance-award-svgrepo-com-1"></i>
								</div>
                  <h3>Best Business Consulting Awards</h3>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-xl-7">
              <div className="why-choose-us-content-1">
                <div className="sec-title mb-0">
                  <h6 className="sub-title light">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    Why Choose Us
                  </h6>
                  <h2 className="title light wow fadeInUp">you need someone with Strategic support</h2>
                </div>

                {/* Tab Nav */}
                <ul className="nav">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${
                          activeTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Tab Content */}
                <div className="tab-content light">
                  <div className="why-choose-list">
                    <h3>{activeData.title}</h3>
                    <p>{activeData.desc}</p>
                  </div>
                  <div className="why-choose-list-items">
                    <ul className="why-list">
                      {activeData.list.map((item, index) => (
                        <li key={index}>
                          <span className="icon">
                            <i className="fa-solid fa-check"></i>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Animated Progress Bars */}
                    <div className="choose-us-progressbar">
                      {activeData.progress.map((prog, index) => (
                       <div className="progress-container" key={index}>
                          <div
                            className="circular-progress"
                            style={{
                              background: `conic-gradient(#C8F169 ${animatedProgress[index] * 3.6}deg, #D4D4D4 0deg)`,
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: "1",
                              position: "relative",
                            }}
                          >
                            {/* Inner circle with count */}
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "500",
                                fontSize: "21px",
                                color: "#000",
                                zIndex: "1",
                              }}
                            >
                              {animatedProgress[index]}%
                            </div>
                          </div>

                          {/* Label under progress bar */}
                          <div
                            className="text"
                            style={{ marginTop: "8px", fontWeight: "500", textAlign: "center" }}
                          >
                            {prog.label}
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Right */}
          </div>
        </div>
      </div>
    </section>
  );
}

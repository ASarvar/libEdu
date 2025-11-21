"use client";

import React, { useState } from "react";
import Link from "next/link";

const BenefitSection = () => {
  const [activeTab, setActiveTab] = useState("Mission");

  const tabs = [
    {
      id: "Mission",
      title: "Our Mission",
      content:
        "everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the Collabo",
      list: ["Protecting your company", "We offer you solutions"],
    },
    {
      id: "Vision",
      title: "Our Vision",
      content:
        "everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the Collabo",
      list: ["Protecting your company", "We offer you solutions"],
    },
    {
      id: "Philosophy",
      title: "Our Philosophy",
      content:
        "everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the Collabo",
      list: ["Protecting your company", "We offer you solutions"],
    },
  ];

  return (
    <section className="benifit-section fix">
      <div className="circle-shape">
        <img
          src="images/home-2/choose-us/circle-shape-2.png"
          alt="circle shape"
        />
      </div>
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title">
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            Our Benefits
          </h6>
          <h2>You have Full Control on us</h2>
        </div>

        <div className="benifit-wrapper">
          <div className="row">
            {/* Left Boxes */}
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="benifit-box-items-style-1">
                <div className="benifit-image">
                  <img src="images/home-2/benefit/benifit-01.jpg" alt="Consultant" />
                  <img src="images/home-2/benefit/benifit-01.jpg" alt="Consultant" />
                </div>
                <div className="benefit-content">
                  <h3>Consultant</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random.</p>
                  <Link href="/page-about" className="arrow-icon">
                    <i className="lnr-icon-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="benifit-box-items-style-1">
                <div className="benifit-image">
                  <img src="images/home-2/benefit/benifit-02.jpg" alt="Management" />
                  <img src="images/home-2/benefit/benifit-02.jpg" alt="Management" />
                </div>
                <div className="benefit-content">
                  <h3>Management</h3>
                  <p>Contrary to popular belief, Lorem Ipsum is not simply random.</p>
                  <Link href="/page-about" className="arrow-icon">
                    <i className="lnr-icon-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="col-xl-6 col-lg-12">
              <div
                className="benifit-box-items-style-2 bg-cover"
                style={{
                  backgroundImage: "url('images/home-2/benefit-bg.jpg')",
                }}
              >
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

                <div className="tab-content">
                  {tabs.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <div key={tab.id} className="tab-pane fade show active">
                          <div className="why-choose-list">
                            <h3>{tab.title}</h3>
                            <p>{tab.content}</p>
                          </div>
                          <ul className="about-list">
                            {tab.list.map((item, i) => (
                              <li key={i}>
                                <span className="icon">
                                  <i className="fa-solid fa-check"></i>
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="benefit-feature-wrapper">
          <div className="row g-4">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="icon-items-style-2">
                <div className="icon">
                  <i className="flaticon-finance-business-expense-svgrepo-com-1"></i>
                </div>
                <div className="content">
                  <h3>Business Consulting</h3>
                  <p>everyone with high and useful reward for his.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="icon-items-style-2">
                <div className="icon">
                  <i className="lnr-icon-layers"></i>
                </div>
                <div className="content">
                  <h3>Management</h3>
                  <p>everyone with high and useful reward for his.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="icon-items-style-2">
                <div className="icon">
                  <i className="flaticon-business-023-lifesaver"></i>
                </div>
                <div className="content">
                  <h3>Finance Service</h3>
                  <p>everyone with high and useful reward for his.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="icon-items-style-2">
                <div className="icon">
                  <i className="lnr-icon-folder-open"></i>
                </div>
                <div className="content">
                  <h3>Digital Services</h3>
                  <p>everyone with high and useful reward for his.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;

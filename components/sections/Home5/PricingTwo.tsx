"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Pricing() {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <section className="pricing-section fix section-padding">
      <div className="pricing-circle">
        <img src="images/home-1/pricing-circle.png" alt="img" />
      </div>
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title wow fadeInUp">
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            Pricing Plan
          </h6>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            our populer pricing plan <br />by company
          </h2>
        </div>

        {/* Tabs */}
        <ul className="nav">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "monthly" ? "active" : ""}`}
              onClick={() => setActiveTab("monthly")}
              role="tab"
            >
              Monthly
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "yearly" ? "active" : ""}`}
              onClick={() => setActiveTab("yearly")}
              role="tab"
            >
              Yearly
            </button>
          </li>
        </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Monthly */}
            {activeTab === "monthly" && (
              <div id="Monthly" className="tab-pane fade show active">
                <div className="row">
                  {/* Personal Plan */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div className="pricing-box-items">
                      <div className="pricing-header">
                        <div className="title-icon">
                          <i className="flaticon-finance-Priicng-Plan"></i>
                        </div>
                        <h3>Personal Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">
                          $2500/ Month
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Premium Plan */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                    <div className="pricing-box-items active">
                      <span className="gt-price-tag">recommend</span>
                      <div className="pricing-header">
                        <div className="title-icon">
                          <i className="flaticon-finance-Priicng-Plan"></i>
                        </div>
                        <h3>Premium Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">
                          Choose Pricing Plan
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Standard Plan */}
                  <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                    <div className="pricing-box-items">
                      <div className="pricing-header">
                        <div className="title-icon">
                          <i className="flaticon-finance-Priicng-Plan"></i>
                        </div>
                        <h3>Standard Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="fa-solid fa-check"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">
                          $2500/ Month
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Yearly */}
            {activeTab === "yearly" && (
              <div id="Yearly" className="tab-pane fade show active">
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <div className="pricing-box-items">
                      <div className="pricing-header">
                        <div className="title-icon"><i className="flaticon-finance-Priicng-Plan"></i></div>
                        <h3>Personal Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">$2500/ Yearly</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <div className="pricing-box-items active">
                      <span className="gt-price-tag">recommend</span>
                      <div className="pricing-header">
                        <div className="title-icon"><i className="flaticon-finance-Priicng-Plan"></i></div>
                        <h3>Premium Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">choose pricing plan</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <div className="pricing-box-items">
                      <div className="pricing-header">
                        <div className="title-icon"><i className="flaticon-finance-Priicng-Plan"></i></div>
                        <h3>Standard Plan</h3>
                        <span>Customized anything in anytime</span>
                      </div>
                      <ul className="pricing-list">
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Unlimited features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Multi language content</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> 30 Days free trial features</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Data backup and recovery</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Updates via dashboard & slack</li>
                        <li><div className="icon"><i className="lnr-icon-checkmark-circle"></i></div> Synced to cloud database</li>
                      </ul>
                      <div className="pricing-button">
                        <Link href="/page-pricing" className="theme-btn btn-style-one w-100">$2500/ Yearly</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className="info-bottom wow fadeInUp" data-wow-delay=".5">
          <div className="info-box">
            Trusted by 3200+ happy customers & counting
            <img src="images/trustpilot-logo.png" alt="Image"/>
            <img src="images/rating-star.png" alt="Image"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

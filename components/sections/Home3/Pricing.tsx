"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Pricing() {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
	<section className="pricing-section-2 fix section-padding">
		<div className="auto-container">
			<div className="sec-title text-center">
				<h6 className="sub-title wow fadeInUp">
					<span className="triangle triangle1"></span>
					<span className="triangle triangle2"></span>
					Pricing Table
				</h6>
				<h2 className="wow fadeInUp" data-wow-delay=".2s">
					Secure the success of your <br/> business journey…
				</h2>
			</div>
				<div className="d-flex justify-content-center mt-3 mt-md-0">
				<div className="pricing-two__tab wow fadeInUp" data-wow-delay=".4s">
					<div className="save-text">
						<span className="each-object">Save 40%</span>
						<img src="images/home-3/line.png" alt="img"/>
					</div>
					<nav>
						<div className="nav nav-tabs" id="nav-tab" role="tablist">
							<button id="pt-1-tab"
								className={`nav-link ${activeTab === "monthly" ? "active" : ""}`}
								onClick={() => setActiveTab("monthly")}
								role="tab">
								Monthly
							</button>

							<button id="pt-2-tab"
								className={`nav-link ${activeTab === "yearly" ? "active" : ""}`}
								onClick={() => setActiveTab("yearly")}
								role="tab">
								Yearly
							</button>
						</div>
					</nav>
				</div>
			</div>
			<div className="pricing__tab-content">
				<div className="tab-content" id="nav-tabContent">
					{activeTab === "monthly" && (
						<div className="tab-pane fade show active" id="pt-1" role="tabpanel" aria-labelledby="pt-1-tab">
						<div className="row">
							<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
							<div className="pricing-card-items">
								<div className="pricing-shape">
								<img src="images/home-3/pricing-shape.png" alt="img"/>
								</div>
								<h5 className="plan-text">Regular Plan</h5>
								<p>For Small Businesses</p>
								<ul className="pricing-list">
								<li>Email marketing</li>
								<li>Unlimited chat history</li>
								<li>Unlimited landing pages</li>
								<li>Automation templates</li>
								<li>Great Customer Support</li>
								</ul>
								<div className="pricing-price">
								<h2>
									$19.99 <sub>/ Monthly</sub>
								</h2>
								<span>For Small Businesses</span>
								</div>
								<Link href="/page-pricing" className="theme-btn btn-style-one">
								Choose Package
								<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
							<div className="pricing-main-items">
								<div className="popular">
								Popular Package
								</div>
								<div className="pricing-card-items">
								<div className="pricing-shape">
								<img src="images/home-3/pricing-shape.png" alt="img"/>
								</div>
								<h5 className="plan-text">Standard Plan</h5>
								<p>For Medium Businesses</p>
								<ul className="pricing-list">
								<li>Email marketing</li>
								<li>Unlimited chat history</li>
								<li>Unlimited landing pages</li>
								<li>Automation templates</li>
								<li>Great Customer Support</li>
								</ul>
								<div className="pricing-price">
								<h2>
									$29.99 <sub>/ Monthly</sub>
								</h2>
								<span>For Medium Businesses</span>
								</div>
								<Link href="/page-pricing" className="theme-btn btn-style-one">
								Choose Package
								<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
							</div>
							</div>
							<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
							<div className="pricing-card-items">
								<div className="pricing-shape">
								<img src="images/home-3/pricing-shape.png" alt="img"/>
								</div>
								<h5 className="plan-text">Premium Plan</h5>
								<p>For Big Businesses</p>
								<ul className="pricing-list">
								<li>Email marketing</li>
								<li>Unlimited chat history</li>
								<li>Unlimited landing pages</li>
								<li>Automation templates</li>
								<li>Great Customer Support</li>
								</ul>
								<div className="pricing-price">
								<h2>
									$99.10 <sub>/ Monthly</sub>
								</h2>
								<span>For Big Businesses</span>
								</div>
								<Link href="/page-pricing" className="theme-btn btn-style-one">
								Choose Package
								<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
							</div>
						</div>
						</div>
					)}
					{activeTab === "yearly" && (
						<div className="tab-pane fade show active" id="pt-2" role="tabpanel" aria-labelledby="pt-2-tab">
							<div className="row">
								<div className="col-xl-4 col-lg-6 col-md-6">
									<div className="pricing-card-items">
										<div className="pricing-shape">
											<img src="images/home-3/pricing-shape.png" alt="img"/>
										</div>
										<h5 className="plan-text">Regular Plan</h5>
										<p>For Small Businesses</p>
										<ul className="pricing-list">
											<li>Email marketing</li>
											<li>Unlimited chat history</li>
											<li>Unlimited landing pages</li>
											<li>Automation templates</li>
											<li>Great Customer Support</li>
										</ul>
										<div className="pricing-price">
											<h2>
												$19.99 <sub>/ Yearly</sub>
											</h2>
											<span>For Small Businesses</span>
										</div>
										<Link href="/page-pricing" className="theme-btn btn-style-one">
											Choose Package
											<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
										</Link>
									</div>
								</div>
								<div className="col-xl-4 col-lg-6 col-md-6">
									<div className="pricing-main-items">
										<div className="popular">
											Popular Package
										</div>
										<div className="pricing-card-items">
											<div className="pricing-shape">
											<img src="images/home-3/pricing-shape.png" alt="img"/>
										</div>
										<h5 className="plan-text">Standard Plan</h5>
										<p>For Medium Businesses</p>
										<ul className="pricing-list">
											<li>Email marketing</li>
											<li>Unlimited chat history</li>
											<li>Unlimited landing pages</li>
											<li>Automation templates</li>
											<li>Great Customer Support</li>
										</ul>
										<div className="pricing-price">
											<h2>
												$29.99 <sub>/ Yearly</sub>
											</h2>
											<span>For Medium Businesses</span>
										</div>
										<Link href="/page-pricing" className="theme-btn btn-style-one">
											Choose Package
											<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
										</Link>
									</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-6 col-md-6">
									<div className="pricing-card-items">
										<div className="pricing-shape">
											<img src="images/home-3/pricing-shape.png" alt="img"/>
										</div>
										<h5 className="plan-text">Premium Plan</h5>
										<p>For Big Businesses</p>
										<ul className="pricing-list">
											<li>Email marketing</li>
											<li>Unlimited chat history</li>
											<li>Unlimited landing pages</li>
											<li>Automation templates</li>
											<li>Great Customer Support</li>
										</ul>
										<div className="pricing-price">
											<h2>
												$99.10 <sub>/ Yearly</sub>
											</h2>
											<span>For Big Businesses</span>
										</div>
										<Link href="/page-pricing" className="theme-btn btn-style-one">
											Choose Package
											<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	</section>
  );
}

export default Pricing;
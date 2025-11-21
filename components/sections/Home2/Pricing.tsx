import React from "react";
import Link from "next/link";

function Pricing () {
    return (
	<section className="pricing-section section-padding">
		<div className="auto-container">
			<div className="row g-4 justify-content-between">
				<div className="col-xxl-4 col-xl-5 col-lg-5">
					<div className="pricing-content-2 sticky-style">
						<div className="sec-title mb-0">
							<h6 className="sub-title wow fadeInUp">
								<span className="triangle triangle1"></span>
								<span className="triangle triangle2"></span>
								Pricing Table
							</h6>
							<h2 className="text-anim">
								Choose your 
								Right Affordable
								Pricing Plan
							</h2>
						</div>
						<p className="wow fadeInUp" data-wow-delay=".4s">
							everyone with high and useful reward for  his/her trading, purchase and investment. Our goal is to make the
						</p>
					</div>
				</div>
				<div className="col-xxl-7 col-xl-7 col-lg-7">
					<div className="pricing-card-item-2">
						<div className="blur-shape">
							<img src="images/home-2/pricing-icon/blur-shape.png" alt="img"/>
						</div>
						<div className="pricing-left-ber">
							<div className="pricing-icon">
								<i className="flaticon-finance-Fertile--Streamline-Sharp-Material-Symbols-1"></i>
							</div>
							<div className="pricing-header">
								<h5>Premium</h5>
								<h3>$39</h3>
							</div>
						</div>
						<div className="pricing-right-ber">
							<ul className="pricing-list">
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Teams
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Custom Branding for team
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Schedule
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Basic Anaytics for team
								</li>
							</ul>
							<Link href="/page-pricing" className="theme-btn btn-style-one">
								Get Started
								<i className="icon flaticon-finance-arrow-right-svgrepo-com1-2"></i>
							</Link>
						</div>
					</div>
					<div className="pricing-card-item-2">
						<div className="blur-shape">
							<img src="images/home-2/pricing-icon/blur-shape.png" alt="img"/>
						</div>
						<div className="pricing-left-ber">
							<div className="pricing-icon">
								<i className="flaticon-finance-Fertile--Streamline-Sharp-Material-Symbols-1"></i>
							</div>
							<div className="pricing-header">
								<h5>Premium</h5>
								<h3>$99</h3>
							</div>
						</div>
						<div className="pricing-right-ber">
							<ul className="pricing-list">
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Teams
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Custom Branding for team
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Schedule
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Basic Anaytics for team
								</li>
							</ul>
							<Link href="/page-pricing" className="theme-btn btn-style-one">
								Get Started
								<i className="icon flaticon-finance-arrow-right-svgrepo-com1-2"></i>
							</Link>
						</div>
					</div>
					<div className="pricing-card-item-2 mb-0">
						<div className="blur-shape">
							<img src="images/home-2/pricing-icon/blur-shape.png" alt="img"/>
						</div>
						<div className="pricing-left-ber">
							<div className="pricing-icon">
								<i className="flaticon-finance-Fertile--Streamline-Sharp-Material-Symbols-1"></i>
							</div>
							<div className="pricing-header">
								<h5>Premium</h5>
								<h3>$199</h3>
							</div>
						</div>
						<div className="pricing-right-ber">
							<ul className="pricing-list">
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Teams
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Custom Branding for team
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Unlimited Schedule
								</li>
								<li>
									<i className="fa-solid fa-check"></i>
									Basic Anaytics for team
								</li>
							</ul>
							<Link href="/page-pricing" className="theme-btn btn-style-one">
								Get Started
								<i className="icon flaticon-finance-arrow-right-svgrepo-com1-2"></i>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
};

export default Pricing;
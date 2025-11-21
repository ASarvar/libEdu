import React from "react";
import Link from "next/link";

function Service() {
  return (
	<section id="service" className="service-section-three fix section-padding">
		<div className="auto-container">
			<div className="sec-title mb-50">
				<div className="row g-4 justify-content-between align-items-end">
					<div className="col-xl-6 col-md-8">
						<h6 className="sub-title wow fadeInUp">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							Our Services
						</h6>
						<h2 className="title wow fadeInUp" data-wow-delay=".2s">Worldwide Insurance Tailored Solutions</h2>
					</div>
					<div className="col-xl-5 col-md-4 wow fadeInUp animated" data-wow-delay=".4s">
						<Link href="/page-services" className="theme-btn btn-style-two">
							All Services
							<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
						</Link>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
					<div className="service-block-three">
						<div className="outer-box">
							<div className="icon-box">
								<div className="icon">
									<i className="flaticon-business-023-lifesaver"></i>
								</div>
							</div>
							<div className="content-box">
								<h4 className="contact-title"><Link href="/page-service-details">Risk Assessment & Analysis</Link></h4>
								<ul className="feature-list">
									<li>Insurance Regulation</li>
									<li>Insurer Reputation</li>
									<li>Tailored insurance</li>
									<li>Consultants Ensure</li>
									<li>Benefit Packages</li>
								</ul>
							</div>
							<div className="arrow-shape-2 float-bob-x">
								<img src="images/home-6/service/arrow-shape.png" alt="img"/>
							</div>
						</div>						
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="100ms" data-wow-duration="1500ms">
					<div className="service-block-three">
						<div className="outer-box">
							<div className="icon-box">
								<div className="icon">
									<i className="flaticon-business-024-configure"></i>
								</div>
							</div>
							<div className="content-box">
								<h4 className="contact-title"><Link href="/page-service-details">Policy Review & Optimization</Link></h4>
								<ul className="feature-list">
									<li>Insurance Regulation</li>
									<li>Insurer Reputation</li>
									<li>Tailored insurance</li>
									<li>Consultants Ensure</li>
									<li>Benefit Packages</li>
								</ul>
							</div>
							<div className="arrow-shape-2 float-bob-x">
								<img src="images/home-6/service/arrow-shape.png" alt="img"/>
							</div>
						</div>						
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
					<div className="service-block-three">
						<div className="outer-box">
							<div className="icon-box">
								<div className="icon">
									<i className="flaticon-business-036-idea"></i>
								</div>
							</div>
							<div className="content-box">
								<h4 className="contact-title"><Link href="/page-service-details">Insurance Planning & Strategy</Link></h4>
								<ul className="feature-list">
									<li>Insurance Regulation</li>
									<li>Insurer Reputation</li>
									<li>Tailored insurance</li>
									<li>Consultants Ensure</li>
									<li>Benefit Packages</li>
								</ul>
							</div>
							<div className="arrow-shape-2 float-bob-x">
								<img src="images/home-6/service/arrow-shape.png" alt="img"/>
							</div>
						</div>						
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
					<div className="service-block-three">
						<div className="outer-box">
							<div className="icon-box">
								<div className="icon">
									<i className="flaticon-business-054-graph"></i>
								</div>
							</div>
							<div className="content-box">
								<h4 className="contact-title"><Link href="/page-service-details">Employee Benefits Consulting</Link></h4>
								<ul className="feature-list">
									<li>Insurance Regulation</li>
									<li>Insurer Reputation</li>
									<li>Tailored insurance</li>
									<li>Consultants Ensure</li>
									<li>Benefit Packages</li>
								</ul>
							</div>
							<div className="arrow-shape-2 float-bob-x">
								<img src="images/home-6/service/arrow-shape.png" alt="img"/>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
	</section>
  );
}

export default Service;
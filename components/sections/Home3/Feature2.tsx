import React from "react";
import Link from "next/link";

const Feature2 = () => {
  return (
	<section className="feature-growth-section fix section-padding">
		<div className="auto-container">
			<div className="sec-title">
				<div className="row g-4 justify-content-between align-items-center">
					<div className="col-xl-6 col-lg-8">
						<h6 className="sub-title wow fadeInUp">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							LATEST SERVICES
						</h6>
						<h2 className="wow fadeInUp" data-wow-delay=".2s"> We provide consulting to strategic growth.</h2>
					</div>
					<div className="col-xl-5 col-lg-4 col-md-8 wow fadeInUp animated" data-wow-delay=".4s">
						<p>Finclix is the destination where early adopters and innovation enthusiasts discover cutting-edge technology </p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
					<div className="feature-growth-box-items mb-5 mb-xl-0">
						<div className="icon">
							<i className="flaticon-finance-Starategic-Invesment"></i>
						</div>
						<div className="content">
							<h3>Strategic <br/>Investments</h3>
							<p>Everyone with high and useful reward for  his We offer </p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
					<div className="feature-growth-box-items mb-5 mb-xl-0 style-top">
						<div className="icon">
							<i className="flaticon-finance-customer-1"></i>
						</div>
						<div className="content">
							<h3>Putting <br/> Customers First</h3>
							<p>Everyone with high and useful reward for  his We offer </p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
					<div className="feature-growth-box-items mb-5 mb-xl-0">
						<div className="icon">
							<i className="flaticon-finance-investment-1"></i>
						</div>
						<div className="content">
							<h3>Smarter Business <br/> Decisions</h3>
							<p>Everyone with high and useful reward for  his We offer </p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow bounceInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
					<div className="feature-growth-box-items mb-5 mb-xl-0 style-top">
						<div className="icon">
							<i className="flaticon-finance-iteration-1"></i>
						</div>
						<div className="content">
							<h3>Driving Innovation <br/>with agile</h3>
							<p>Everyone with high and useful reward for  his We offer </p>
						</div>
					</div>
				</div>
			</div>
			<div className="service-know-box wow fadeInUp" data-wow-delay=".3s">
				<div className="icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" viewBox="0 0 24 34" fill="none">
					<defs>
						<linearGradient id="paint0_linear_1_745" x1="11.9987" y1="0.333008" x2="11.9987" y2="33.6663" gradientUnits="userSpaceOnUse">
						<stop offset="0" stopColor="#099696"/>
						<stop offset="1" stopColor="#B2E66E"/>
						</linearGradient>
					</defs>
					<path d="M11.9987 13.6663H23.6654L5.33203 33.6663L10.332 18.6663H0.332031L13.6654 0.333008L11.9987 13.6663Z"
							fill="url(#paint0_linear_1_745)" />
					</svg>
				</div>
				<p>We Strive To Lead The way In  The business <Link href="/page-services">Know All Services <i className="fa-regular fa-arrow-right"></i></Link></p>
			</div>
		</div>
	</section>
  );
};

export default Feature2;

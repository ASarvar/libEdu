import React from "react";
import Link from "next/link";


function Service() {

  return (
    <>
	<section id="service" className="service-section-four pb-90">
		<div className="service-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
						<div className="sec-title mb-40">
							<h6 className="sub-title wow fadeInUp">
								<span className="triangle triangle1"></span>
								<span className="triangle triangle2"></span>
								Our Services
							</h6>
							<h2 className="title wow fadeInUp mb-30" data-wow-delay=".2s">Delivering the Best marketing Solutions</h2>
							<div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
								<Link href="/page-contact" className="theme-btn btn-style-two">
									All Services
									<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
						<div className="service-block-four">
							<div className="icon">
								<i className="flaticon-business-054-graph"></i>
							</div>
							<div className="content">
								<h3 className="title"><Link href="/page-service-details">Financial Planning</Link></h3>
								<p className="text">Financial planning is the process of managing your finances to meet your life goals. These goals can include saving</p>
								<Link href="/page-service-details" className="link-btn">
									Read More
									<i className="icon fa-solid fa-arrow-right-long"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".4s">
						<div className="service-block-four">
							<div className="icon">
								<i className="flaticon-business-013-idea"></i>
							</div>
							<div className="content">
								<h3 className="title"><Link href="/page-service-details">Operational Optimize</Link></h3>
								<p className="text">Operational optimization is the process of improving the efficiency, effectiveness, and performance of an organization’s</p>
								<Link href="/page-service-details" className="link-btn">
									Read More
									<i className="icon fa-solid fa-arrow-right-long"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
						<div className="service-block-four">
							<div className="icon">
								<i className="flaticon-business-011-dollar"></i>
							</div>
							<div className="content">
								<h3 className="title"><Link href="/page-service-details">Marketing Strategy</Link></h3>
								<p className="text">A marketing strategy is a long-term plan that outlines how a business will promote its good products or services</p>
								<Link href="/page-service-details" className="link-btn">
									Read More
									<i className="icon fa-solid fa-arrow-right-long"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
						<div className="service-block-four">
							<div className="icon">
								<i className="flaticon-business-030-settings"></i>
							</div>
							<div className="content">
								<h3 className="title"><Link href="/page-service-details">Risk Management</Link></h3>
								<p className="text">Risk management is the process of identifying assessing and controlling to organization's capital earnings operations</p>
								<Link href="/page-service-details" className="link-btn">
									Read More
									<i className="icon fa-solid fa-arrow-right-long"></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1s">
						<div className="service-block-four">
							<div className="icon">
								<i className="flaticon-business-057-file"></i>
							</div>
							<div className="content">
								<h3 className="title"><Link href="/page-service-details">Account & Audit </Link></h3>
								<p className="text">Accounting refers to the systematic recording reporting and analysis of financial transactions of a business It helps track income</p>
								<Link href="/page-service-details" className="link-btn">
									Read More
									<i className="icon fa-solid fa-arrow-right-long"></i>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>			
		</div>
	</section>

    </>
  );
}

export default Service;

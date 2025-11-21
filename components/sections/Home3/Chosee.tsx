import React from 'react';
import Link from 'next/link';


function Chosee() {
  return (
	<section className="why-choose-section-2 section-padding fix bg-cover" style={{backgroundImage: 'url(images/home-3/service-bg-2.jpg)'}}>
		<div className="circle-shape">
			<img src="images/home-2/choose-us/circle-shape.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="why-choose-us-wrapper-2 p-0">
				<div className="row g-4 justify-content-between">
					<div className="col-xl-5">
						<div className="service-imagestyle-3 fix wow fadeInUp" data-wow-delay=".3s">
							<img src="images/home-3/service-image.jpg" alt="img"/>
						</div>
					</div>
					<div className="col-xl-7">
						<div className="choose-us-content-2">
							<div className="sec-title mb-0">
								<h6 className="sub-title text-white">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Latest Services
								</h6>
								<h2 className="text-white wow fadeInUp" data-wow-delay=".2s">You Need Someone At with Strategic Support</h2>
							</div>
							<div className="row">
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp">
									<div className="choose-us-box-style-2">
										<div className="icon">
											<i className="flaticon-finance-business-expense-svgrepo-com-1"></i>
										</div>
										<div className="content">
											<h3><Link href="/page-service-details">Business Consulting</Link></h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
									<div className="choose-us-box-style-2">
										<div className="icon">
											<i className=" lnr-icon-layers"></i>
										</div>
										<div className="content">
											<h3><Link href="/page-service-details">Finance Management</Link></h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
									<div className="choose-us-box-style-2">
										<div className="icon">
											<i className="flaticon-business-023-lifesaver"></i>
										</div>
										<div className="content">
											<h3><Link href="/page-service-details">Invest Process</Link></h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
									<div className="choose-us-box-style-2">
										<div className="icon">
											<i className="lnr-icon-folder-open"></i>
										</div>
										<div className="content">
											<h3><Link href="/page-service-details">Life Insurance</Link></h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
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

export default Chosee;

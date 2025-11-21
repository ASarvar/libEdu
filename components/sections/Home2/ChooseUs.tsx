import React from 'react';
import Link from 'next/link';


function ChooseUs() {
  return (
	<section className="why-choose-section-2 parallaxie pb-0 section-padding fix bg-cover" style={{backgroundImage: 'url(images/home-2/choose-us/choose-us-bg.jpg)'}}>
		<div className="circle-shape">
			<img src="images/home-2/choose-us/circle-shape.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="why-choose-us-wrapper-2">
				<div className="row justify-content-between">
					<div className="col-xxl-3 col-xl-5">
						<div className="choose-us-image-2 wow fadeInUp" data-wow-delay=".3s">
							<img src="images/home-2/choose-us/choose-us-image.png" alt="img"/>
						</div>
					</div>
					<div className="col-xxl-8 col-xl-7">
						<div className="choose-us-content-2">
							<div className="sec-title mb-0">
								<h6 className="sub-title text-white">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Why Choose Us
								</h6>
								<h2 className="text-white wow fadeInUp" data-wow-delay=".3s">You Need Someone At with Strategic Support</h2>
							</div>
							<div className="row">
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp">
									<div className="choose-us-box-style-2">
                						<div className="icon"><i className="flaticon-finance-business-expense-svgrepo-com-1"></i></div>
										<div className="content">
											<h3>Hassle Fre Service</h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
									<div className="choose-us-box-style-2">
                						<div className="icon"><i className=" lnr-icon-layers"></i></div>
										<div className="content">
											<h3>Finance Managment</h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
									<div className="choose-us-box-style-2">
                						<div className="icon"><i className="flaticon-business-023-lifesaver"></i></div>
										<div className="content">
											<h3>No Extra Fees</h3>
											<p>
												everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis.
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
									<div className="choose-us-box-style-2">
                						<div className="icon"><i className="lnr-icon-folder-open"></i></div>
										<div className="content">
											<h3>Expert Team Member</h3>
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

export default ChooseUs;

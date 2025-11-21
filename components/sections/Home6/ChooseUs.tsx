import React from "react";
import Link from "next/link";

function ChooseUs() {
  return (
    <>
	<section id="about" className="why-choose-section-3 parallaxie fix">
		<div className="bg-image wow tm-gsap-img-parallax fix">
			<img className="img-fit-cover" src="images/home-6/choose/choose-us-image.jpg" alt="Image"/>
		</div>
		<div className="outer-box">
			<div className="choose-content">
				<div className="inner-box">
					<div className="sec-title mb-30">
						<h6 className="sub-title text-white">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							Who We Are
						</h6>
						<h2 className="title text-white wow fadeInUp" data-wow-delay=".2s">The Top Choice for All  Insurance Needs</h2>
					</div>
					<div className="row">
						<div className="col-md-6 wow fadeInUp" data-wow-delay=".4s">
							<h4 className="content-title">With 30 Years of Experience</h4>
							<div className="content-text">Our Mission To deliver peace of mind through customized insurance</div>
							<div className="choose-us-box">
								<div className="icon-box">
									<div className="icon">
										<i className="lnr-icon-square"></i>
									</div>
								</div>
								<div className="content-box">
									<span>Our Target</span>
									<h5>Deliver Exceptional Service</h5>
								</div>
							</div>
							<div className="choose-us-box">
								<div className="icon-box">
									<div className="icon">
										<i className="flaticon-business-044-stapler"></i>
									</div>
								</div>
								<div className="content-box">
									<span>Our Growth</span>
									<h5>Rich industry experience</h5>
								</div>
							</div>
							<div className="btn-box">
								<Link href="/page-contact" className="theme-btn btn-style-two">
									Get Started
									<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
						</div>
						<div className="col-md-6 wow fadeInUp" data-wow-delay=".6s">
							<div className="process-bar">
								<img src="images/home-6/choose/process-bar.jpg" alt="Image"/>
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

export default ChooseUs;
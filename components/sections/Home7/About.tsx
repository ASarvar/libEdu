import React from "react";
import Link from 'next/link';
import CounterUp from "../../elements/CounterUp";

function About() {
  return (
    <>
	<section id="about" className="about-section-four have-margin fix section-padding">
		<div className="arrow-shape-1 bounce-x">
			<img src="images/home-7/about/arrow-1.png" alt="img"/>
		</div>
		<div className="arrow-shape-2 bounce-y">
			<img src="images/home-7/about/arrow-1.png" alt="img"/>
		</div>
		<div className="shape-1">
			<img src="images/home-7/about/shape-1.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="row g-4 align-items-center">
				<div className="col-lg-6">
					<div className="about-image-four wow img-custom-anim-left">
						<div className="about-image">
							<img src="images/home-7/about/about-01.png" alt="img"/>
						</div>
						<div className="shape-bg1"></div>
						<div className="about-counter-four">
							<div className="count-box">
								<div className="counter"><span className="count-text"><CounterUp end={25} /></span>+</div>
								<div className="counter-title">Years of <br/>Experience</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="about-content-four">
						<div className="sec-title mb-30">
							<h6 className="sub-title light wow fadeInUp">
								<span className="triangle triangle1"></span>
								<span className="triangle triangle2"></span>
								Who We Are
							</h6>
							<h2 className="title light fadeInUp" data-wow-delay=".2s">Increase your money systematically </h2>
						</div>
						<div className="icon-items-area">
							<div className="icon-items wow fadeInUp" data-wow-delay=".3s">
								<div className="icon-box">
									<div className="icon">
										<i className="flaticon-business-028-briefcase"></i>
									</div>									
								</div>
								<h6 className="icon-title">Worldwide <br/>business Grow</h6>
							</div>
							<div className="icon-items wow fadeInUp" data-wow-delay=".5s">
								<div className="icon-box">
									<div className="icon">
										<i className="flaticon-business-006-target"></i>
									</div>
								</div>
								<h6 className="icon-title">business Strategy & <br/> growth planning</h6>
							</div>
						</div>
						<p className="about-text wow fadeInUp" data-wow-delay=".5s">
							everyone with high and useful reward for  his/her trading, purchase and investment. Our goal is to make the Discover the transformative power of our solutions. Learn how we've helped businesses of all 
							sizes overcome challenges.
						</p>
						<Link href="/page-contact" className="theme-btn btn-style-two wow fadeInUp" data-wow-delay=".7s">
							Lets Talk With Us
							<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  );
}

export default About;
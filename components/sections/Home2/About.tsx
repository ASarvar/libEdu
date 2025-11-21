import React from "react";
import Link from 'next/link';
import CounterUp from '../../elements/CounterUp';

function About() {
  return (
	<section id="about" className="about-section-2 fix section-padding section-bg">
		<div className="arrow-shape-1 bounce-x">
			<img src="images/home-1/about/arrow-1.png" alt="img"/>
		</div>
		<div className="arrow-shape-2 bounce-y">
			<img src="images/home-1/about/arrow-2.png" alt="img"/>
		</div>
		<div className="shape-1">
			<img src="images/home-2/about/shape-1.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="about-wrapper-2 section-padding pt-0">
				<div className="row g-4 align-items-center">
					<div className="col-xl-6">
						<div className="about-image-items-2 wow img-custom-anim-left">
							<div className="about-image">
								<img src="images/home-2/about/about-01.png" alt="img"/>
							</div>
							<div className="about-counter2">
								<div className="count-box">
									<h2>
										<span className="count-text"><CounterUp end={25} /></span>+
									</h2>
									<p>
										Years of 
										Experience
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6">
						<div className="about-content-2">
							<div className="sec-title mb-0">
								<h6 className="sub-title wow fadeInUp">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Who We Are
								</h6>
								<h2 className="wow fadeInUp" data-wow-delay=".2s">Increase your money systematically </h2>
							</div>
							<div className="icon-items-area">
								<div className="icon-items wow fadeInUp mb-4 mb-sm-0" data-wow-delay=".3s">
									<div className="icon"><i className="flaticon-business-028-briefcase"></i></div>
									<h6>Worldwide business Grow</h6>
								</div>
								<div className="icon-items wow fadeInUp" data-wow-delay=".5s">
									<div className="icon"><i className="flaticon-business-006-target"></i></div>
									<h6>business Strategy & growth planning</h6>
								</div>
							</div>
							<p className="about-text wow fadeInUp" data-wow-delay=".5s">
								everyone with high and useful reward for  his/her trading, purchase and investment. Our goal is to make the Discover the transformative power of our solutions. Learn how we've helped businesses of all 
								sizes overcome challenges.
							</p>
							<Link href="/page-contact" className="theme-btn btn-style-one wow fadeInUp" data-wow-delay=".7s">
								Lets Talk With Us
								<span className="icon">
									<i className="flaticon-finance-fi_3385625"></i>
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="row g-4">
				<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
					<div className="about-counter">
						<div className="count-box">
							<h2>
								<span className="count-text"><CounterUp end={1} /></span>M
							</h2>
							<p>
								Worldwide <br/>
								business Grow
							</p>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
					<div className="about-counter">
						<div className="count-box">
							<h2>
								<span className="count-text"><CounterUp end={32} /></span>+
							</h2>
							<p>
								Best Business <br/>
								Awards
							</p>
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
					<div className="about-counter">
						<div className="count-box">
							<h2>
								<span className="count-text"><CounterUp end={3} /></span>K+
							</h2>
							<p>
								Satisfied <br/>
								Clients
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
}

export default About;
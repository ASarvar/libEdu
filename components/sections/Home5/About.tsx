import React from "react";
import CounterUp from "../../elements/CounterUp";

function About() {
  return (
    <>
	<section id="about" className="about-section-three fix pb-120">
		<div className="auto-container">
			<div className="row g-4 align-items-center">
				<div className="col-md-6">
					<div className="content-colmun">
						<div className="content-box">
							<div className="sec-title">
								<h6 className="sub-title wow fadeInUp">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Who We Are
								</h6>
								<h2 className="wow fadeInUp" data-wow-delay=".2s">Providing Consulting for Financial Solutions </h2>
								<div className="text">Our team of experienced professionals delivers personalized, results-driven financial strategies tailored to your unique</div>
							</div>
							<div className="feature-box">
								<div className="shape-image"><img src="images/home-5/about/about-shape-image.png" alt="shape"/></div>
								<div className="feature-title">Our consulting services deliver value to our customers</div>
								<ul className="feature-list">
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										Minimizing tax liabilities within legal
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										Budget creation funding strategy
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										Monitoring income and expenses
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										Tailored strategies based on industry
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										Custom reports and dashboards
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="image-colmun">
						<div className="image-box">
							<div className="about-image">
								<img src="images/home-5/about/about-image.jpg" alt="img"/>
							</div>
							<div className="count-box">
								<div className="counter"><span className="count-text"><CounterUp end={30} /></span>+</div>
								<div className="counter-title">Expert Team Members</div>
								<div className="counter-btn">Quick solutions</div>
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

export default About;
import React from "react";
import CounterUp from '../../elements/CounterUp';

function ChooseUs() {
  return (
	<section className="why-choose-us-section-4 fix section-padding">
		<div className="shape-1">
			<img src="images/home-4/why-choose-us/choose-us-left-shape.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="why-choose-us-wrapper-4 section-padding pt-0">
				<div className="row g-4 align-items-center">
					<div className="col-lg-6">
						<div className="choose-us-image-items-4 wow img-custom-anim-left">
							<div className="choose-image">
								<img src="images/home-4/why-choose-us/choose-us-img.png" alt="img"/>
							</div>
							<div className="choose-counter4">
								<div className="count-box">
									<h2>
										<span className="count-text"><CounterUp end={25} /></span>+
									</h2>
									<p>
										Years of <br/>
										Experience
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="choose-content-4">
							<div className="sec-title mb-0">
								<h6 className="sub-title wow fadeInUp">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Why Choose US
								</h6>
								<h2 className="wow fadeInUp" data-wow-delay=".2s">Reason for Choosing Our Digital Agency</h2>
							</div>
							<p className="about-text wow fadeInUp" data-wow-delay=".5s">
								Lorem ipsum dolor sit amet consectetur adipiscing elit commodo hendrerit, morbi non at metus nisi condimentum cubilia nulla, netus nec consequat
							</p>
							<div className="icon-items-area">
								<div className="icon-items wow fadeInUp" data-wow-delay=".3s">
									<div className="icon">
										<i className="lnr-icon-rocket1"></i>
									</div>
									<div className="icon-content">
										<h4>
											Where Your Money Works Harder
										</h4>
										<p>
											15+ years crafting identities for Fortune 500s to fast-growth startups  Backgrounds in design psychology
										</p>
									</div>
								</div>
								<div className="icon-items wow fadeInUp" data-wow-delay=".5s">
									<div className="icon style-2">
										<i className="lnr-icon-user1"></i>
									</div>
									<div className="icon-content">
										<h4>
											We Listen First, Invest Second
										</h4>
										<p>
											Experts in responsive logo systems (SVG, animated, dark/light modes), Former start-up founders who understand business challenges
										</p>
									</div>
								</div>
								<div className="icon-items wow fadeInUp" data-wow-delay=".5s">
									<div className="icon">
										<i className="flaticon-business-028-briefcase"></i>
									</div>
									<div className="icon-content">
										<h4>
											AI-Enhanced Portfolio Optimization
										</h4>
										<p>
											15+ years crafting identities for Fortune 500s to fast-growth startups  Backgrounds in design psychology
										</p>
									</div>
								</div>
							</div>
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

export default ChooseUs;
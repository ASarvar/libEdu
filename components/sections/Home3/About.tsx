import React from "react";
import Link from 'next/link';
import ProgressBar from '../../elements/ProgressBar3';

function About() {
  return (
    <>
	<section id="about" className="about-section fix section-padding">
		<div className="auto-container">
			<div className="row g-4">
				<div className="col-lg-6">
					<div className="image-column-3">
							<div className="inner-column">
							<div className="image1 overlay-anim wow fadeInUp" data-wow-delay=".3s">
								<img src="images/home-3/about/about-01.jpg" alt="Image"/>
							</div>
							<div className="info float-bob-x">
								<img src="images/home-3/about/about-info.png" alt="Image"/>
							</div>
							<div className="image2 wow fadeInUp" data-wow-delay=".5s">
								<img src="images/home-3/about/about-02.jpg" alt="Image"/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-6">
					<div className="about-content-3">
						<div className="sec-title mb-0">
							<h6 className="sub-title wow fadeInUp">
								<span className="triangle triangle1"></span>
								<span className="triangle triangle2"></span>
								Who We Are
							</h6>
							<h2 className="wow fadeInUp" data-wow-delay=".2s">The Journey Behind Our Business Success</h2>
						</div>
						<p className="about-text wow fadeInUp" data-wow-delay=".4s">Consultez is the go-to hub for early adopters and innovation enthusiasts, offering cutting-edge technology </p>
						<div className="about-block wow fadeInUp" data-wow-delay=".6s">
							<div className="inner-box">
								<div className="icon">
									<i className="flaticon-finance-creativity-1-1"></i>
								</div>
								<div className="content">
								<h4 className="title">Creative Solutions</h4>
								<p className="text">In today's competitive business landscape, the need for
									efficient IT
									solutions
									has been more critical.</p>
								</div>
							</div>
						</div>
						<div className="about-block wow fadeInUp" data-wow-delay=".8s">
							<div className="inner-box">
							<div className="icon">
								<i className="flaticon-finance-edit-tools-1"></i>
							</div>
								<div className="content">
								<h4 className="title">Actionable Solutions</h4>
								<p className="text">Innovation is the key to staying ahead in a changing world. We
									harness cutting-edge technology</p>
								</div>
							</div>
						</div>
						<div className="skill-feature wow fadeInUp" data-wow-delay="1s">
							<h3 className="box-title">Business Success</h3>
							<ProgressBar percentage={88} duration={2600} />
						</div>
						<div className="info mt-50 wow fadeInUp" data-wow-delay=".2s">
							<Link href="/page-contact" className="theme-btn btn-style-one wow fadeInUp" data-wow-delay=".5s">
								Lets Talk With Us
								<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
							</Link>
							<div className="user">
							<div className="image">
								<img src="images/home-3/about/about-user.png" alt="Image"/>
							</div>
							<div>
								<img src="images/home-3/about/signature.png" alt="Image"/>
								<p className="sub-title">Founder</p>
							</div>
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

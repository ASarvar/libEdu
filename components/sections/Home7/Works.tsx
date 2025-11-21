import React from 'react';
import Link from 'next/link';

function Works() {
  return (
 	<section className="how-it-work-section fix section-padding gray-bg">
		<div className="auto-container">
			<div className="sec-title text-center mb-60">
				<h6 className="sub-title wow fadeInUp">
					<span className="triangle triangle1"></span>
					<span className="triangle triangle2"></span>
					How It Work
				</h6>
				<h2 className="title wow fadeInUp" data-wow-delay=".2s">Behind the Scenes of Our Marketing Consulting</h2>
			</div>
			<div className="how-it-work-wrapper border-none">
				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
						<div className="how-it-work-items-style-3 style-2">
							<h3 className="number">01</h3>
							<h4 className="title">Strategic Growth</h4>
							<p className="text">Sparking Innovation, Shaping Tomorrow successful</p>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".4s">
						<div className="how-it-work-items-style-3 style-2">
							<h3 className="number">02</h3>
							<h4 className="title">Fuel Innovation</h4>
							<p className="text">Sparking Innovation, Shaping Tomorrow successful</p>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".6s">
						<div className="how-it-work-items-style-3 style-2">
							<h3 className="number">03</h3>
							<h4 className="title">Financial Planning</h4>
							<p className="text">Helping You Stay on Track with Accurate Estimates</p>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".8s">
						<div className="how-it-work-items-style-3 style-2">
							<h3 className="number">04</h3>
							<h4 className="title">Sustainable Success</h4>
							<p className="text">Amazing Support! with lot of ele
							demos to choose from top</p>
						</div>
					</div>
				</div>
			</div>
			<h5 className="how-sec-text mt-20 wow fadeInUp" data-wow-delay=".3s">Embrace Innovation, Adapt Quickly, and Lead with Confidence. <Link href="/page-contact">Consult Now</Link></h5>
		</div>
	</section>
  );
}

export default Works;

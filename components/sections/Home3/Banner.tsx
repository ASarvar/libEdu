import React from 'react';
import Link from 'next/link';

function Banner() {
  return (
    <>
	<section id="home" className="hero-section bg-cover hero-3" style={{backgroundImage: 'url(images/home-3/hero/hero-bg.png)'}}>
		<div className="row g-4 align-items-center">
			<div className="col-xl-7 col-lg-6">
				<div className="hero-content">
					<h1 className="wow fadeInUp" data-wow-delay=".2s">We are Helping Grow <span>Business</span> Success</h1>
					<div className="text-item wow fadeInUp" data-wow-delay=".4s">
						<p>
							everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the
						</p>
						<img src="images/home-3/hero/small-image.jpg" alt="img"/>
					</div>
					<div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
						<Link href="/page-contact" className="theme-btn btn-style-one">
							Lets Talk With Us
							<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
						</Link>
					</div>
				</div>
			</div>
			<div className="col-xl-5 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
				<div className="hero-image ed_top_img">
					<img src="images/home-3/hero/hero-image.png" alt="img"/>
					<div className="ellipse-shape">
						<img src="images/home-3/hero/ellipse-shape.png" alt="img"/>
					</div>
					<div className="text-circle">
						<img src="images/home-3/hero/text-circle.png" alt="img" className="animation__rotate"/>
						<img src="images/home-3/hero/star.png" alt="img" className="star"/>
					</div>
				</div>
			</div>
		</div>
		<div className="paper-shape">
			<img src="images/home-3/hero/paper-shape.png" alt="img"/>
		</div>
	</section>
    </>   
  );
}

export default Banner;
import React from 'react';
import Link from 'next/link';

function Footer3 (){
  return (
	<footer className="footer-section-2 footer-section-4 fix footer-bg bg-cover" style={{backgroundImage: 'url(images/home-1/footer-shape.png)'}}>
		<div className="footer-left-shape">
			<img src="images/home-4/footer-left-shape.png" alt="img"/>
		</div>
		<div className="footer-right-shape">
			<img src="images/home-4/footer-right-shape.png" alt="img"/>
		</div>
		<div className="auto-container">
			<div className="footer-top-wrapper">
				<Link href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
					<img src="images/white-logo.png" alt="img"/>
				</Link>
				<div className="social-icon wow fadeInUp" data-wow-delay=".5s">
					<Link href="#"><i className="fa-brands fa-x-twitter"></i></Link>
					<Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
					<Link href="#"><i className="fa-brands fa-pinterest"></i></Link>
					<Link href="#"><i className="fa-brands fa-instagram"></i></Link>
				</div>
			</div>
			<div className="footer-widget-wrapper style-2">
				<div className="row justify-content-between">
					<div className="col-xl-3 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".3s">
						<div className="footer-widget-items mt-30">
							<div className="widget-title mb-25">
								<h3 className="font-size-24 text-white font-weight-500">Head office</h3>
							</div>
							<div className="footer-content">
								<p className="text-white">2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
								<ul className="contact-list-2">
									<li>
										<Link href="#">+ (123) 456-7890</Link>
									</li>
									<li>
										<Link href="#">Yourcompany@example.com</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-2 d-none d-xl-block"></div>
					<div className="col-xl-3 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".5s">
						<div className="footer-widget-items mt-30">
							<div className="widget-title mb-25">
								<h3 className="font-size-24 text-white font-weight-500">Quick Link</h3>
							</div>
							<div className="user-links-area">
								<ul className="user-links">
									<li><Link href="/page-about">About Us</Link></li>
									<li><Link href="/page-team">Our Team</Link></li>
									<li><Link href="/page-projects">Our Portfolio</Link></li>
									<li><Link href="/page-contact">Careers</Link></li>
									<li><Link href="/page-contact">Contact Us</Link></li>
								</ul>
								<ul className="user-links">
									<li><Link href="/page-services">Works</Link></li>
									<li><Link href="/page-services">Expertise</Link></li>
									<li><Link href="/news-grid">Blog</Link></li>
									<li><Link href="/page-about">Awards</Link></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".7s">
						<div className="footer-widget-items mt-30">
							<div className="widget-title mb-25">
								<h3 className="font-size-24 text-white font-weight-500">Our Solutions</h3>
							</div>
							<ul className="user-links">
								<li><Link href="/page-service-details">Web Development</Link></li>
								<li><Link href="/page-service-details">UI/UX Design</Link></li>
								<li><Link href="/page-service-details">Mobile Application</Link></li>
								<li><Link href="/page-service-details">Cloud Service</Link></li>
								<li><Link href="/page-service-details">Cyber Security </Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<p className="footer-text wow fadeInUp" data-wow-delay=".3s">Copyright © 2025 Finclix.  All Rights Reserved</p>
		</div>
	</footer>
  );
};

export default Footer3;

import React from "react";
import Link from "next/link";

function Team (){
	return (
		<>
			<section className="team-section-six pt-120 pb-90 fix">
				<div className="auto-container">
					<div className="sec-title mb-50">
						<div className="row g-4 justify-content-between align-items-end">
							<div className="col-xl-6 col-md-8">
								<h6 className="sub-title wow fadeInUp">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									Our Team
								</h6>
								<h2 className="title wow fadeInUp" data-wow-delay=".2s">Our Dedicated Experts at Your Service</h2>
							</div>
							<div className="col-xl-5 col-md-4 wow fadeInUp animated" data-wow-delay=".4s">
								<Link href="/page-contact" className="theme-btn btn-style-two">
									Know More
									<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
							<div className="team-block-six">
								<div className="inner-box">
									<div className="team-image">
										<img src="images/home-7/team/team-image-1.jpg" alt="img"/>
										<img src="images/home-7/team/team-image-1.jpg" alt="img"/>
									</div>						
									<div className="content-box">
										<h4 className="name"><Link href="/page-team-details">Madison Loren</Link></h4>
										<p className="designation">Chief Executive</p>
										<div className="social-links">
											<ul>
												<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-x-twitter"></i></Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
							<div className="team-block-six">
								<div className="inner-box">
									<div className="team-image">
										<img src="images/home-7/team/team-image-2.jpg" alt="img"/>
										<img src="images/home-7/team/team-image-2.jpg" alt="img"/>
									</div>						
									<div className="content-box">
										<h4 className="name"><Link href="/page-team-details">Wanda Maximoff</Link></h4>
										<p className="designation">Investment advisor</p>
										<div className="social-links">
											<ul>
												<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-x-twitter"></i></Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
							<div className="team-block-six">
								<div className="inner-box">
									<div className="team-image">
										<img src="images/home-7/team/team-image-3.jpg" alt="img"/>
										<img src="images/home-7/team/team-image-3.jpg" alt="img"/>
									</div>						
									<div className="content-box">
										<h4 className="name"><Link href="/page-team-details">Esther Howard</Link></h4>
										<p className="designation">Tax consultant</p>
										<div className="social-links">
											<ul>
												<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
												<li><Link href="#"><i className="fa-brands fa-x-twitter"></i></Link></li>
											</ul>
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
};

export default Team;

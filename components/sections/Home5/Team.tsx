import React from "react";
import Link from "next/link";

function Team (){
	return (
		<>
	<section className="team-section-five fix have-after">
		<div className="container-fluid">
			<div className="sec-title text-center mb-50">
				<h6 className="sub-title light wow fadeInUp">
					<span className="triangle triangle1"></span>
					<span className="triangle triangle2"></span>
					Our Teammate
				</h6>
				<h2 className="title light wow fadeInUp" data-wow-delay=".3s">Enhance Your Experience with <br/> Expert Consulting</h2>
			</div>
			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
					<div className="team-block-five">
						<div className="inner-box">
							<div className="team-image">
								<img src="images/home-5/team/team-image-1.jpg" alt="img"/>
								<img src="images/home-5/team/team-image-1.jpg" alt="img"/>
							</div>						
							<div className="content-box">
								<h4 className="name"><Link href="/page-team-details">Madison Loren</Link></h4>
								<p className="designation">Chief Executive</p>
								<div className="social-links">
									<ul>
										<li><Link href="#"><i className="fa-brands fa-pinterest"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
									</ul>									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
					<div className="team-block-five">
						<div className="inner-box">
							<div className="team-image">
								<img src="images/home-5/team/team-image-2.jpg" alt="img"/>
								<img src="images/home-5/team/team-image-2.jpg" alt="img"/>
							</div>						
							<div className="content-box">
								<h4 className="name"><Link href="/page-team-details">Wanda Maximoff</Link></h4>
								<p className="designation">Investment advisor</p>
								<div className="social-links">
									<ul>
										<li><Link href="#"><i className="fa-brands fa-pinterest"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
									</ul>									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
					<div className="team-block-five">
						<div className="inner-box">
							<div className="team-image">
								<img src="images/home-5/team/team-image-3.jpg" alt="img"/>
								<img src="images/home-5/team/team-image-3.jpg" alt="img"/>
							</div>						
							<div className="content-box">
								<h4 className="name"><Link href="/page-team-details">Esther Howard</Link></h4>
								<p className="designation">Tax consultant</p>
								<div className="social-links">
									<ul>
										<li><Link href="#"><i className="fa-brands fa-pinterest"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
									</ul>									
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
					<div className="team-block-five">
						<div className="inner-box">
							<div className="team-image">
								<img src="images/home-5/team/team-image-4.jpg" alt="img"/>
								<img src="images/home-5/team/team-image-4.jpg" alt="img"/>
							</div>						
							<div className="content-box">
								<h4 className="name"><Link href="/page-team-details">Harleen Quinzel</Link></h4>
								<p className="designation">Co-Ordinator</p>
								<div className="social-links">
									<ul>
										<li><Link href="#"><i className="fa-brands fa-pinterest"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
										<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
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

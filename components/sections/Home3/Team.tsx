import React from "react";
import Link from "next/link";

const Team = () => {  
  return (
	<section className="team-section-3 fix section-padding">
		<div className="auto-container">
			<div className="sec-title text-center">
				<h6 className="sub-title wow fadeInUp">
					<span className="triangle triangle1"></span>
					<span className="triangle triangle2"></span>
					Our Teammate
				</h6>
				<h2 className="wow fadeInUp" data-wow-delay=".3s">
					Enhance Your Experience with <br/> Expert Consulting
				</h2>
			</div>
			<div className="row">
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
					<div className="team-box-items-4">
						<div className="team-image">
							<img src="images/home-3/team/team-01.jpg" alt="img"/>
							<img src="images/home-3/team/team-01.jpg" alt="img"/>
						</div>
						<div className="socials">
							<i className="fa-solid fa-plus"></i>
							<ul>
								<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
							</ul>
						</div>
						<div className="content-box">
							<h3 className="title"><Link href="/page-team-details">Guy Hawkins</Link></h3>
							<p className="sub-title">Admin</p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".4s">
					<div className="team-box-items-4">
						<div className="team-image">
							<img src="images/home-3/team/team-02.jpg" alt="img"/>
							<img src="images/home-3/team/team-02.jpg" alt="img"/>
						</div>
						<div className="socials">
							<i className="fa-solid fa-plus"></i>
							<ul>
								<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
							</ul>
						</div>
						<div className="content-box">
							<h3 className="title"><Link href="/page-team-details">Jacob Jones</Link></h3>
							<p className="sub-title">Manager</p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".6s">
					<div className="team-box-items-4">
						<div className="team-image">
							<img src="images/home-3/team/team-03.jpg" alt="img"/>
							<img src="images/home-3/team/team-03.jpg" alt="img"/>
						</div>
						<div className="socials">
							<i className="fa-solid fa-plus"></i>
							<ul>
								<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
							</ul>
						</div>
						<div className="content-box">
							<h3 className="title"><Link href="/page-team-details">Kristin Watson</Link></h3>
							<p className="sub-title">Consultant</p>
						</div>
					</div>
				</div>
				<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".8s">
					<div className="team-box-items-4">
						<div className="team-image">
							<img src="images/home-3/team/team-04.jpg" alt="img"/>
							<img src="images/home-3/team/team-04.jpg" alt="img"/>
						</div>
						<div className="socials">
							<i className="fa-solid fa-plus"></i>
							<ul>
								<li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
								<li><Link href="#"><i className="fa-brands fa-behance"></i></Link></li>
							</ul>
						</div>
						<div className="content-box">
							<h3 className="title"><Link href="/page-team-details">Bessie Cooper</Link></h3>
							<p className="sub-title">Founder</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  );
};

export default Team;

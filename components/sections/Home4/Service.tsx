import React from "react";
import Link from 'next/link';

function Service() {

  return (    
    <>
	<section id="service" className="service-section-4 section-padding fix">
		<div className="container-fluid">
			<div className="row g-4">
				<div className="col-xxl-3 col-lg-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
					<div className="service-card-items-4">
						<div className="service-icon">
							<div className="icon">
								<i className="flaticon-business-054-graph"></i> 
							</div>
							<span className="number">
								01
							</span>
						</div>
						<div className="content">
							<h3><Link href="/page-service-details">Expertise & Trust</Link></h3>
							<p>
								Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur
							</p>
						</div>
					</div>
				</div>
				<div className="col-xxl-3 col-lg-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
					<div className="service-card-items-4">
						<div className="service-icon">
							<div className="icon">
							<i className="flaticon-business-062-diagram"></i>
							</div>
							<span className="number">
								02
							</span>
						</div>
						<div className="content">
							<h3><Link href="/page-service-details">Data Over Guesswork</Link></h3>
							<p>
								Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur
							</p>
						</div>
					</div>
				</div>
				<div className="col-xxl-3 col-lg-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
					<div className="service-card-items-4">
						<div className="service-icon">
							<div className="icon">
								<i className="flaticon-business-059-plant"></i>
							</div>
							<span className="number">
								03
							</span>
						</div>
						<div className="content">
							<h3><Link href="/page-service-details">Exclusive Access</Link></h3>
							<p>
								Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur
							</p>
						</div>
					</div>
				</div>
				<div className="col-xxl-3 col-lg-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
					<div className="service-card-items-4">
						<div className="service-icon">
							<div className="icon">
								<i className="flaticon-business-048-coin"></i>
							</div>
							<span className="number">
								04
							</span>
						</div>
						<div className="content">
							<h3><Link href="/page-service-details">Tech & Innovation</Link></h3>
							<p>
								Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  );
}

export default Service;

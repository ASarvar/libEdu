import Link from 'next/link';
import React from 'react';

function ProjectDetails(){
	return (
		<>
		<section className="project-details pt-120 pb-70">
			<div className="auto-container">
			<div className="row">
				<div className="col-xl-7 col-lg-8 mb-5 mb-lg-0">
					<div className="sec-title mb-40">
						<h6 className="sub-title wow fadeInUp">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							About The Project
						</h6>
						<h2 className="title mb-30 wow fadeInUp" data-wow-delay=".3s">Deeper Dive into Our Digital Product Design Masterpieces</h2>
						<p className="text wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">Sed ut perspiciatis unde omniste natus voluptatem accusantiume rem  aperia eaque ipsa quae abillo inventore veritatis quasi architecto beatae vitae dicta sunt explicabo. Nemo enim epsam voluptatem quia voluptas aspernatur odites sed quia consequunture</p>
					</div>
					<div className="project-details-btn">
						<Link href="/page-contact" className="theme-btn btn-style-one">
							Visit Website
							<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
						</Link>
					</div>
				</div>
				<div className="col-xl-3 offset-xl-1 col-lg-4">
					<div className="project-details__content-right mt-0">
						<div className="project-details__details-box rounded-0">
							<ul className="list-unstyled project-details__details-list">
								<li>
								<h4 className="project-details__name mb-2">Clients</h4>
								<p className="project-details__client">Design Studio In USA</p>
								</li>
								<li>
								<h4 className="project-details__name mb-2">Project Type</h4>
								<p className="project-details__client">Digital Product Design</p>
								</li>
								<li>
								<h4 className="project-details__name mb-2">Date</h4>
								<p className="project-details__client">25 October 2023</p>
								</li>
								<li>
								<h4 className="project-details__name mb-2">Website</h4>
								<p className="project-details__client"><Link href="#">yourdomain.com</Link></p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="row mb-5 mb-lg-0">
				<div className="col-lg-4 col-md-6">
				<div className="project-details__top mt-5">
					<div className="project-details__img"> <img className="rounded-0" src="images/inner/project-details/project-details-1.jpg" alt="Image"/> </div>
				</div>
				</div>
				<div className="col-lg-8 col-md-6">
				<div className="project-details__top mt-5">
					<div className="project-details__img"> <img className="rounded-0" src="images/inner/project-details/project-details-2.jpg" alt="Image"/> </div>
				</div>
				</div>
			</div>
			<div className="row align-items-lg-center">
				<div className="col-lg-6">
				<div className="sec-title mb-40">
					<h2 className="title mb-30 wow splt-txt" data-splitting>Interesting facts in <br className="d-none d-lg-block"/> Development</h2>
				</div>
				</div>
				<div className="col-lg-6">
				<div className="project-details__top mt-lg-5">
					<div className="text mb-40">Must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter</div>
					<ul className="project-list mb-5">
					<li className="d-flex align-items-center"><i className="icon fa-classic fa-solid fa-check fa-fw"></i> Efficient Sprint Planning</li>
					<li className="d-flex align-items-center"><i className="icon fa-classic fa-solid fa-check fa-fw"></i> Standups and Demos</li>
					<li className="d-flex align-items-center"><i className="icon fa-classic fa-solid fa-check fa-fw"></i> Iterative Delivery Approach</li>
					<li className="d-flex align-items-center"><i className="icon fa-classic fa-solid fa-check fa-fw"></i> Problem-solving</li>
					</ul>
				</div>
				</div>
			</div>
			<hr className="mt-4 mb-5 mb-lg-0"/>
			<div className="row align-items-center">
				<div className="col-lg-6">
				<div className="sec-title mb-40">
					<h2 className="title mb-30 wow splt-txt" data-splitting>The Results of <br className="d-none d-lg-block"/> Our Project</h2>
				</div>
				</div>
				<div className="col-lg-6">
				<div className="project-details__top mt-lg-5">
					<div className="text mb-40">Will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness rejects, dislikes, or avoids pleasure </div>
					<div className="project-list-item mb-5">
					<h5 className="title"><i className="icon fa-classic fa-solid fa-circle-check fa-fw mr-15"></i> Support clients</h5>
					<div className="text">Sed ut perspiciatis unde omnis natus voluptatem accusantium doloremque laudantium, totam rem aperiam inventore</div>
					</div>
					<div className="project-list-item">
					<h5 className="title"><i className="icon fa-classic fa-solid fa-circle-check fa-fw mr-15"></i> Solve problems</h5>
					<div className="text">Sed ut perspiciatis unde omnis natus voluptatem accusantium doloremque laudantium, totam rem aperiam inventore</div>
					</div>
				</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
				<div className="project-details__top mt-5">
					<div className="project-details__img"> <img className="rounded-0" src="images/inner/project-details/project-details-3.jpg" alt="Image"/> </div>
				</div>
				</div>
				<div className="col-md-6">
				<div className="project-details__top mt-5">
					<div className="project-details__img"> <img className="rounded-0" src="images/inner/project-details/project-details-4.jpg" alt="Image"/> </div>
				</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xl-12">
				<div className="project-details__pagination-box">
					<ul className="project-details__pagination list-unstyled">
						<li className="next text-start">
							<div className="content">Previous</div>
							<h4 className="title"><Link href="#">Business Website Design</Link></h4>
						</li>
						<li className="count"><Link href="#"></Link></li>
						<li className="count"><Link href="#"></Link></li>
						<li className="count"><Link href="#"><img src="images/inner/project-details/pagination-bar.png" alt="Image"/></Link></li>
						<li className="count"><Link href="#"></Link></li>
						<li className="count"><Link href="#"></Link></li>
						<li className="previous text-end">
							<div className="content">Next</div>
							<h4 className="title"> <Link href="#">Mobile Application Design</Link> </h4>
						</li>
					</ul>
				</div>
				</div>
			</div>
			</div>
		</section>
		</>
	);
};

export default ProjectDetails;
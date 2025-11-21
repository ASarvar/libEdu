import React from "react";
import Link from "next/link";

function ChooseUs() {
  return (
    <>
	<div className="ks-choose-2-area" style={{backgroundImage: 'url(images/home-6/background/choose-us.png)'}}>
		<div className="container">
			<div className="row">
				<div className="col-xl-6 col-lg-6">
					<div className="ks-choose-2-content">
						<div className="sec-title">
							<h6 className="sub-title light wow fadeInUp" data-wow-delay=".2s">
								<span className="triangle triangle1"></span>
								<span className="triangle triangle2"></span>
								why choose us
							</h6>
							<h2 className="title light text-anim wow fadeInUp" data-wow-delay=".3s">Why You Should Choose Our Company?</h2>
						</div>
						<p className="text wow fadeInUp" data-wow-delay=".4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout The point of using Lorem Ipsum</p>
						<div className="ks-choose-2-more-wrap flex-wrap d-sm-flex align-items-center wow fadeInUp" data-wow-delay=".5">
							<div className="ks-choose-2-more-info d-flex align-items-center">
								<span className="icon">
									<i className="flaticon-business-041-cash-bag"></i>
								</span>
								<b>Less Pay Get <br/> More Benefits</b>
							</div>
							<p className="text2">The point using Lorem Ipsum is that it has a more.</p>
						</div>
						<div className="ks_fade_anim wow fadeInUp" data-wow-delay=".6">
							<Link href="/page-contact" className="theme-btn btn-style-two">
								Get In Touch
								<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
							</Link>
						</div>
					</div>
				</div>
				<div className="col-xl-6 col-lg-6 col-md-10">
					<div className="ks-choose-2-thumb-wrap ks_fade_anim" data-fade-from="right" data-delay=".4">
						<div className="ks-choose-2-icon">
							<img src="images/home-6/choose/favicon.png" alt="Image"/>
						</div>
						<div className="row gx-0">
							<div className="col-lg-6 col-md-6 col-6">
								<div className="ks-choose-2-thumb">
									<img src="images/home-6/choose/choose-2-1.jpg" alt="Image"/>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-6">
								<div className="ks-choose-2-circle">
									<h3 className="title text-white"> Insurance <br/>Managements</h3>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-6">
								<div className="ks-choose-2-circle style-2">
									<h3 className="title text-white"> Strategic <br/>Investments</h3>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-6">
								<div className="ks-choose-2-thumb style-2">
									<img src="images/home-6/choose/choose-2-2.jpg" alt="Image"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  );
}

export default ChooseUs;
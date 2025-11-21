"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

const progressData = [
	{
		title: "Latest Boat Experience",
		percent: "90%",
	},
	{
		title: "Sailing Boat Experience",
		percent: "80%",
	},
	{
		title: "Power Boat Experience",
		percent: "75%",
		noMargin: true,
	},
];

function TeamDetails() {
	const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const bar = entry.target as HTMLElement;
				const countText = bar.querySelector(".count-text") as HTMLElement | null;
				if (!countText) return;

				const percentStr = bar.getAttribute("data-percent") || "0%";
				const percent = parseInt(percentStr.replace("%", ""), 10);
				bar.style.width = percent + "%";

				let current = 0;
				const duration = 1000;
				const stepTime = Math.max(Math.floor(duration / percent), 10);

				const timer = setInterval(() => {
				if (current >= percent) {
					clearInterval(timer);
					countText.textContent = percent + "%";
				} else {
					current++;
					countText.textContent = current + "%";
				}
				}, stepTime);
			}
			});
		},
		{ threshold: 0.5 }
		);

		progressRefs.current.forEach((el) => {
		if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<>
			<section className="team-details fix section-padding">
				<div className="auto-container">
					<div className="team-details__top pb-70">
						<div className="row">
						<div className="col-xl-6 col-lg-6">
							<div className="team-details__top-left">
							<div className="team-details__top-img">
								<img className="w-100" src="images/inner/team-details.jpg" alt="Image"/>
								<div className="team-details__big-text"></div>
							</div>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6">
							<div className="team-details__top-right pt-50">
							<div className="team-details__top-content">
								<h3 className="team-details__top-name">Alen Hispro</h3>
								<p className="team-details__top-title">Chief Attorney</p>
								<p className="team-details__top-text-1">I help my clients stand out and they help me grow.</p>
								<div className="team-details-contact mb-30">
								<h5 className="mb-0">Email Address</h5>
								<div className=""><span>needhelp@yourdomain.com</span></div>
								</div>
								<div className="team-details-contact mb-30">
								<h5 className="mb-0">Phone Number</h5>
								<div className=""><span>+012-3456-789</span></div>
								</div>
								<div className="team-details-contact">
								<h5 className="mb-0">Web Address</h5>
								<div className=""><span>www.yourdomain.com</span></div>
								</div>
								<div className="team-details__social">
									<Link href="#"><i className="fa fa-x"></i></Link>
									<Link href="#"><i className="fab fa-facebook"></i></Link>
									<Link href="#"><i className="fab fa-pinterest-p"></i></Link>
									<Link href="#"><i className="fab fa-instagram"></i></Link>
								</div>
							</div>
							</div>
						</div>
						</div>
					</div>
					<div className="team-details__bottom pt-100">
						<div className="row">
						<div className="col-xl-6 col-lg-6">
							<div className="team-details__bottom-left">
							<h4 className="team-details__bottom-left-title">Personal Experience</h4>
							<p className="team-details__bottom-left-text">When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries architecto dolorem ipsum quia</p>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6">
							<div className="team-details__bottom-right">
								<div className="team-details__progress">
									{progressData.map((item, index) => (
									<div className="team-details__progress-single" key={index}>
										<h4 className="team-details__progress-title">{item.title}</h4>
										<div className="bar">
										<div
											className={`bar-inner count-bar ${item.noMargin ? "marb-0" : ""}`}
											data-percent={item.percent}
											ref={(el) => {
											progressRefs.current[index] = el;
											}}
											style={{ width: "0%" }}
										>
											<div className="count-text">0%</div>
										</div>
										</div>
									</div>
									))}
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</section>

			<section className="team-contact-form pt-120 pb-110">
				<div className="auto-container">
					<div className="sec-title mb-5 text-center">
						<h6 className="sub-title wow fadeInUp">
							<span className="triangle triangle1"></span>
							<span className="triangle triangle2"></span>
							Contact With Us Now
						</h6>
						<h2 className="wow fadeInUp" data-wow-delay=".3s">
							Feel Free to Write Our <br/> Alen Hispro
						</h2>
					</div>
					<div className="row justify-content-center">
						<div className="col-lg-8">
						<form id="contact_form" name="contact_form" className="team-details-form" action="/" method="get">
							<div className="row">
							<div className="col-sm-6">
								<div className="mb-3">
								<input name="form_name" className="form-control" type="text" placeholder="Enter Name"/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="mb-3">
								<input name="form_email" className="form-control required email" type="email" placeholder="Enter Email"/>
								</div>
							</div>
							</div>
							<div className="row">
							<div className="col-sm-6">
								<div className="mb-3">
								<input name="form_subject" className="form-control required" type="text" placeholder="Enter Subject"/>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="mb-3">
								<input name="form_phone" className="form-control" type="text" placeholder="Enter Phone"/>
								</div>
							</div>
							</div>
							<div className="mb-3">
							<textarea name="form_message" className="form-control required" rows={5} placeholder="Enter Message"></textarea>
							</div>
							<div className="mb-3 text-center">
							<input name="form_botcheck" className="form-control" type="hidden" value=""/>

							<button type="submit" className="theme-btn btn-style-one rounded-0 wow fadeInUp me-2" data-wow-delay="200ms" data-wow-duration="1500ms" data-loading-text="Please wait...">Send message</button>
							<button type="reset" className="theme-btn theme-btn-2 btn-style-one rounded-0 wow fadeInUp rounded-0" data-wow-delay="200ms" data-wow-duration="1500ms" data-loading-text="Please wait...">Reset</button>
							</div>
						</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default TeamDetails;
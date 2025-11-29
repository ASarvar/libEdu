"use client";
import React from "react";
import { useTranslation } from 'react-i18next';
import CounterUp from "../../elements/CounterUp";
import Link from "next/link";

function About() {
  const { t } = useTranslation();
  
  return (
    <>
	<section id="about" className="about-section-three fix pb-120 pt-120">
		<div className="auto-container">
			<div className="row g-4 align-items-center">
				<div className="col-md-6">
					<div className="content-colmun">
						<div className="content-box">
							<div className="sec-title">
								<h6 className="sub-title wow fadeInUp">
									<span className="triangle triangle1"></span>
									<span className="triangle triangle2"></span>
									{t('about.subtitle')}
								</h6>
								<h2 className="wow fadeInUp" data-wow-delay=".2s">{t('about.title')}</h2>
								<div className="text">{t('about.description')}</div>
							</div>
							<div className="feature-box">
								<div className="shape-image"><img src="images/home-5/about/about-shape-image.png" alt="shape"/></div>
								<div className="feature-title">{t('about.featureTitle')}</div>
								<ul className="feature-list">
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										{t('about.features.feature1')}
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										{t('about.features.feature2')}
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										{t('about.features.feature3')}
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										{t('about.features.feature4')}
									</li>
									<li>
										<span className="icon">
											<i className="fa-solid fa-check"></i>
										</span>
										{t('about.features.feature5')}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="image-colmun">
						<div className="image-box">
							<div className="about-image">
								<img src="images/about/about-1.jpg" alt="img"/>
							</div>
							<div className="count-box">
								<div className="counter"><span className="count-text"><CounterUp end={100} /></span>+</div>
								<div className="counter-title">{t('about.counterTitle')}</div>
								<Link href="#" className="theme-btn btn-style-one w-100">{t('about.counterBtn')}</Link>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  );
}

export default About;
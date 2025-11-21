import React from "react";
import CounterUp from '../../elements/CounterUp';
import Link from "next/link";


function Contact (){
    return (
        <>
            <section id="contact" className="lets-talk-banner-section parallaxie  section-padding fix bg-cover" style={{backgroundImage: 'url(images/home-2/feature/banner.jpg)'}}>
                <div className="blur-shape-1">
                    <img src="images/home-2/feature/blur-shape-1.png" alt="img"/>
                </div>
                <div className="blur-shape-2">
                    <img src="images/home-2/feature/blur-shape-2.png" alt="img"/>
                </div>
                <div className="auto-container">
                    <div className="lets-talk-banner-wrapper">
                        <div className="row g-4 align-items-center justify-content-between">
                            <div className="col-lg-8">
                                <div className="lets-talk-banner-content">
                                    <h2 className="wow fadeInUp" data-wow-delay=".2s">
                                        have a project? let’s talk
                                    </h2>
                                    <p className="wow fadeInUp" data-wow-delay=".4s">
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy.Lorem ipsum dolor sit amet, consectetuer 									adipiscing elit sed diam nonummy.
                                    </p>
                                    <div className="count-item">
                                        <div className="count-box wow fadeInUp" data-wow-delay=".6s">
                                            <h2>
                                                <span className="count-text"><CounterUp end={99} /></span>%
                                            </h2>
                                            <span>
                                                client satisfaction
                                            </span>
                                        </div>
                                        <div className="count-box wow fadeInUp" data-wow-delay=".6s">
                                            <h2>
                                                <span className="count-text"><CounterUp end={67} /></span>%
                                            </h2>
                                            <span>
                                                Product Design
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 text-end wow fadeInUp" data-wow-delay=".3s">
                                <Link href="/page-contact" className="circle-box">
                                    <span>
                                        Contact 
                                        with us
                                        <i className="lnr-icon-arrow-right1"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
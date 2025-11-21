"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video';

function Testimonial (){
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section id="testimonial" className="testimonial-section-five pt-120 pb-120">
        <div className="auto-container">
          <div className="row">
            <div className="col-xl-5 col-lg-4">
              <div className="title-box sticky-style mb-30">
                <div className="sec-title mb-30">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    Testimonials
                  </h6>
                  <h2 className="title fadeInUp" data-wow-delay=".2s">What our Client Says About our Services</h2>
                </div>
                <Link href="/page-contact" className="theme-btn btn-style-two">
                  Get In Touch
                  <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-8">
              <div className="testimonials-outer">
                <div className="testimonial-block-five">
                  <div className="inner-box">
                    <figure className="thumb">
                      <img src="images/home-7/testimonial/testimonial-image-1.jpg" alt="Image"/>
                      <a onClick={() => setOpen(true)} data-fancybox="gallery" className="video-btn playbtnanim"><i className="fa-sharp fa-solid fa-play"></i></a>
                    </figure>
                    <div className="content-box">
                      <div className="logo"><img src="images/home-7/testimonial/netflix.png" alt="Image"/></div>
                      <div className="text">We get absolutely raving reviews from our sales and customer support teams using close. Even our co- sales founders are very happy. We get absolutely raving reviews from our Even our co- founders are very happy for services</div>
                      <div className="info-box">
                        <div className="user-info">
                          <h4 className="name">Rudra Ghosh</h4>
                          <span className="designation">Founder & CEO</span>
                        </div>
                        <div className="rating-info">
                          <div className="rating">4.9</div>
                          <i className="icon fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-five">
                  <div className="inner-box">
                    <figure className="thumb">
                      <img src="images/home-7/testimonial/testimonial-image-2.jpg" alt="Image"/>
                      <a onClick={() => setOpen(true)} data-fancybox="gallery" className="video-btn playbtnanim"><i className="fa-sharp fa-solid fa-play"></i></a>
                    </figure>
                    <div className="content-box">
                      <div className="logo"><img src="images/home-7/testimonial/shopify.png" alt="Image"/></div>
                      <div className="text">We get absolutely raving reviews from our sales and customer support teams using close. Even our co- sales founders are very happy. We get absolutely raving reviews from our Even our co- founders are very happy for services</div>
                      <div className="info-box">
                        <div className="user-info">
                          <h4 className="name">Rudra Ghosh</h4>
                          <span className="designation">Business Owner</span>
                        </div>
                        <div className="rating-info">
                          <div className="rating">4.9</div>
                          <i className="icon fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="testimonial-block-five">
                  <div className="inner-box">
                    <figure className="thumb">
                      <img src="images/home-7/testimonial/testimonial-image-3.jpg" alt="Image"/>
                      <a onClick={() => setOpen(true)} data-fancybox="gallery" className="video-btn playbtnanim"><i className="fa-sharp fa-solid fa-play"></i></a>
                    </figure>
                    <div className="content-box">
                      <div className="logo"><img src="images/home-7/testimonial/spotify.png" alt="Image"/></div>
                      <div className="text">We get absolutely raving reviews from our sales and customer support teams using close. Even our co- sales founders are very happy. We get absolutely raving reviews from our Even our co- founders are very happy for services</div>
                      <div className="info-box">
                        <div className="user-info">
                          <h4 className="name">Rudra Ghosh</h4>
                          <span className="designation">CO Founder</span>
                        </div>
                        <div className="rating-info">
                          <div className="rating">4.9</div>
                          <i className="icon fa fa-star"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo channel='youtube' isOpen={isOpen} videoId="Fvae8nxzVz4" onClose={() => setOpen(false)} />
    </>

  );
};

export default Testimonial;

"use client";

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const swiperOptions = {
  modules: [Autoplay, Navigation],
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  slidesPerView:5,
  loop: true,
  spaceBetween: 30,
  breakpoints : {
    320: {
        slidesPerView: 1,
    },
    575: {
        slidesPerView: 2,
    },
    767: {
        slidesPerView: 3,
    },
    991: {
        slidesPerView: 4,
    },
    1199: {
        slidesPerView: 5,
    },
    1350: {
        slidesPerView: 5,
    },
  }
};

function Contact() {
  return (
      <section id="contact" className="contact-four-area mt-120 pb-120 bg-cover" style={{backgroundImage: 'url(images/home-5/contact/contact-bg.jpg)'}}>
        <div className="auto-container">
          <div className="contact-four__wrp">
            <div className="contact-form">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="contact-four__form">
                    <div className="sec-title">
                      <h6 className="sub-title wow fadeInUp">
                        <span className="triangle triangle1"></span>
                        <span className="triangle triangle2"></span>
                        Contact Us
                      </h6>
                      <h2 className="title wow fadeInUp" data-wow-delay=".3s">We’re here to help</h2>
                      <div className="text wow fadeInUp" data-wow-delay=".3s">Need help with a project or have a question about our work? We're here for you.</div>
                    </div>
                    <form action="#">
                      <input type="text" name="name" id="name" placeholder="Name*"/>
                      <input type="email" name="email" id="email" placeholder="Email Address"/>
                      <textarea name="message" id="message" placeholder="Message"></textarea>
                      <button className="theme-btn btn-style-one rounded-0 w-100" type="submit" data-splitting data-text="Submit Now">Submit Now</button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="contact-four__image imageLeftToRight wow">
                    <img src="images/home-5/contact/contact-image.jpg" alt="image"/>
                  <div className="content">
                    <h3 className="title wow splt-txt" data-splitting>An insightful consulting firm with an engaged team</h3>
                    <div className="info">
                      <div>
                        <h5 className="text-white">Brooklyn Simmons</h5>
                        <span className="text-white">Founder & CEO</span>
                      </div>
                      <img className="logo" src="images/white-logo.png" alt="logo"/>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-four__brand mb-100">
              <div className="swiper marqueeSwiper-five__slider">
                <Swiper {...swiperOptions} className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand1.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand2.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand3.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand4.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand5.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand1.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand2.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand3.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand4.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="brand-two__item">
                      <Link href="#"><img src="images/home-5/brand/contact-brand5.png" alt="image"/></Link>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <h5 className="contact-four__brand-text">2,600 Companies and Individuals Trust Us. <Link href="#" className="hover-link-light fw-600">View All Clients <i className="fa-regular fa-chevron-right mx-1"></i></Link></h5>
          </div>
        </div>
      </section>
  );
}

export default Contact;

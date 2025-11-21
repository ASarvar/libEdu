"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    img: "images/home-1/testimonial/client-01.png",
    name: "Alison Hedge",
    role: "CEO & Founder",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
  {
    img: "images/home-1/testimonial/client-02.png",
    name: "Eleanor Pena",
    role: "Head Of Design",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
  {
    img: "images/home-1/testimonial/client-03.png",
    name: "Jenny Wilson",
    role: "Team Manager",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
   {
    img: "images/home-1/testimonial/client-02.png",
    name: "Eleanor Pena",
    role: "Head Of Design",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonial" className="testimonial-section fix pt-80 pb-120">
      <div className="auto-container">
        <div
          className="testimonial-wrapper bg-cover"
          style={{
            backgroundImage:
              "url(images/home-1/testimonial/testimonial-bg.png)",
          }}
        >
          <div className="sec-title text-center">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              Testimonials
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              What our top Customers <br /> Say About us
            </h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true, el: ".dot2" }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            className="testimonial-slider fix"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-box-items">
                  <div className="client-info-items">
                    <div className="client-image">
                      <img src={t.img} alt={t.name} />
                      <div className="quote-icon">
                        <i className="lnr-icon-quote"></i>
                      </div>
                    </div>
                    <div className="client-content">
                      <h5>{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <div className="star">
                      {Array.from({ length: t.stars }).map((_, starIndex) => (
                        <i key={starIndex} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <p>{t.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-dot mt-5 mb-0">
            <div className="dot2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    img: "/images/home-1/testimonial/client-01.png",
    name: "Alison Hedge",
    role: "CEO & Founder",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
  {
    id: 2,
    img: "/images/home-1/testimonial/client-02.png",
    name: "Eleanor Pena",
    role: "Head Of Design",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
  {
    id: 3,
    img: "/images/home-1/testimonial/client-03.png",
    name: "Jenny Wilson",
    role: "Team Manager",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
   {
    id: 1,
    img: "/images/home-1/testimonial/client-01.png",
    name: "Alison Hedge",
    role: "CEO & Founder",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
  {
    id: 2,
    img: "/images/home-1/testimonial/client-02.png",
    name: "Eleanor Pena",
    role: "Head Of Design",
    text: "Everyone receives valuable and rewarding returns on their trading, purchases, and investments. There are many variations",
    stars: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonial" className="testimonial-section fix section-padding">
      <div className="auto-container">
        <div
          className="testimonial-wrapper bg-cover"
          style={{
            backgroundImage: "url(/images/home-1/testimonial/testimonial-bg.png)",
          }}
        >
          <div className="sec-title text-center">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              Testimonials
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              What our top Customers <br />
              Say About us
            </h2>
          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true, el: ".dot2" }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="testimonial-slider"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-box-items">
                  <div className="client-info-items">
                    <div className="client-image">
                      <Image src={item.img} alt={item.name} width={80} height={80} />
                      <div className="quote-icon">
                        <i className="lnr-icon-quote"></i>
                      </div>
                    </div>
                    <div className="client-content">
                      <h5>{item.name}</h5>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <div className="star">
                      {[...Array(item.stars)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <p>{item.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Swiper pagination dots */}
          <div className="swiper-dot mt-5 mb-0">
            <div className="dot2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

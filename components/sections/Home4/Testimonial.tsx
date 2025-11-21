"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    img: "images/home-2/testimonial/client-2.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    img: "images/home-2/testimonial/client-1.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    img: "images/home-2/testimonial/client-2.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    img: "images/home-2/testimonial/client-3.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
   {
    img: "images/home-2/testimonial/client-1.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    img: "images/home-2/testimonial/client-2.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

export default function TestimonialSlider() {
  return (
    <section id="testimonial" className="testimonial-section-2 fix bg-white">
      <div className="auto-container">
        <div className="sec-title mb-0">
          <div className="row g-4 justify-content-between">
            <div className="col-xl-5 col-lg-9">
              <h6 className="sub-title">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Testimonials
              </h6>
              <h2>
                What our Client Says About our <br /> Services
              </h2>
            </div>
            <div className="col-xl-7 col-lg-3">
              <div className="testimonial-top-right">
                <div className="bg-shape">
                  <img
                    src="images/home-2/testimonial/bg-shape.png"
                    alt="bg shape"
                  />
                </div>
                <div className="client-1">
                  <img
                    src="images/home-2/testimonial/client-4.png"
                    alt="client"
                  />
                </div>
                <div className="client-2">
                  <img
                    src="images/home-2/testimonial/client-5.png"
                    alt="client"
                  />
                </div>
                <div className="client-3">
                  <img
                    src="images/home-2/testimonial/client-6.png"
                    alt="client"
                  />
                </div>
                <div className="client-4">
                  <img
                    src="images/home-2/testimonial/client-7.png"
                    alt="client"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="testimonial-wrapper-2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: ".dot2" }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
            1300: { slidesPerView: 4 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card-item">
                <div className="box-shape">
                  <img
                    src="images/home-2/testimonial/box-shape.png"
                    alt="box shape"
                  />
                </div>
                <div className="client-item">
                  <div className="client-image">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className="info-text">
                    <h5>{item.name}</h5>
                    <span>{item.role}</span>
                  </div>
                </div>
                <div className="content">
                  <div className="quote-icon">
                    <i className="flaticon-finance-Quote"></i>
                    <div className="test-triangle"></div>
                  </div>
                  <div className="star">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots */}
        <div className="swiper-dot mt-5 mb-0">
          <div className="dot2"></div>
        </div>
      </div>
    </section>
  );
}

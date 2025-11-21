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
  {
    img: "images/home-2/testimonial/client-3.png",
    name: "Esther Howard",
    role: "Team Manager",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

function TestimonialSection() {
  return (
    <section id="testimonial" className="testimonial-section-2 section-padding fix section-bg-2">
      <div className="auto-container">
        <div className="sec-title">
          <div className="row g-4 justify-content-between">
            <div className="col-lg-5">
              <h6 className="sub-title wow fadeInUp">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Testimonials
              </h6>
              <h2 className="title text-white wow fadeInUp" data-wow-delay=".2s">
                What our Client <br /> Says About our <br /> Services
              </h2>
            </div>
            <div className="col-lg-7">
              <div className="testimonial-top-right">
                <div className="bg-shape">
                  <img src="images/home-2/testimonial/bg-shape.png" alt="img" />
                </div>
                <div className="client-1">
                  <img src="images/home-2/testimonial/client-4.png" alt="img" />
                </div>
                <div className="client-2">
                  <img src="images/home-2/testimonial/client-5.png" alt="img" />
                </div>
                <div className="client-3">
                  <img src="images/home-2/testimonial/client-6.png" alt="img" />
                </div>
                <div className="client-4">
                  <img src="images/home-2/testimonial/client-7.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-wrapper-2">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: ".dot2" }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={4}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="testimonial-slider-2"
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-card-item border-none">
                <div className="box-shape">
                  <img src="images/home-2/testimonial/box-shape.png" alt="img" />
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
                    {[...Array(5)].map((_, idx) => (
                      <i key={idx} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-dot mt-5 mb-0">
          <div className="dot2"></div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;

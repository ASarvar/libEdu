"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    text: `Ascend the mountain not to plant your flag, but to embrace the challenge,
           savour the journey, and marvel at the view.
           Climb to experience the world, not for the world to notice you. This is why they stand
           out with exceptional`,
    name: "Jacob Jones",
    role: "Business Owner",
    img: "/images/home-3/testimonial/tesimonial-01.jpg",
  },
  {
    id: 2,
    text: `Ascend the mountain not to plant your flag, but to embrace the challenge,
           savour the journey, and marvel at the view.
           Climb to experience the world, not for the world to notice you. This is why they stand
           out with exceptional`,
    name: "Devid Miller",
    role: "Business Owner",
    img: "/images/home-3/testimonial/tesimonial-02.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section id="testimonial" className="testimonial-section-3 fix section-padding">
      <div className="auto-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".array-next",
            prevEl: ".array-prev",
          }}
          loop={true}
          className="testimonial-slider-3"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial-wrapper-3">
                <div className="mask-shape-style-3">
                  <img src="images/home-3/testimonial/mask-shape.png" alt="img"/>
                </div>

                <div className="image-box-style-3">
                  <div className="quate">
                    <i className="flaticon-finance-Quote"></i>
                  </div>
                  <div className="image">
                    <Image src={item.img} alt={item.name} width={300} height={300} />
                    <div className="planet-shape">
                      <img src="images/home-3/testimonial/planet.png" alt="img"/>
                    </div>
                  </div>
                  <div className="star">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                </div>

                <div className="content-box-style-3">
                  <h3 className="text">{item.text}</h3>
                  <h3 className="title">
                    {item.name} / <span>{item.role}</span>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation Buttons */}
          <div className="array-button justify-content-end">
            <button className="array-prev">
              <i className="fa-regular fa-arrow-left"></i>
            </button>
            <button className="array-next">
              <i className="fa-regular fa-arrow-right"></i>
            </button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

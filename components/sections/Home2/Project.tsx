"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

const ProjectSlider = () => {
  const projects = [
    {
      img: "images/home-2/project/project-01.jpg",
      title: "Technology IT",
      category: "Business Tech",
    },
    {
      img: "images/home-2/project/project-02.jpg",
      title: "Technology IT",
      category: "Business Tech",
    },
    {
      img: "images/home-2/project/project-03.jpg",
      title: "Orion Group",
      category: "Business Tech",
    },
    {
      img: "images/home-2/project/project-04.jpg",
      title: "Business Firm",
      category: "Business Tech",
    },
    {
      img: "images/home-2/project/project-02.jpg",
      title: "Technology IT",
      category: "Business Tech",
    },
    {
      img: "images/home-2/project/project-03.jpg",
      title: "Orion Group",
      category: "Business Tech",
    },
  ];


  return (
    <section className="project-section-2 fix section-padding pt-0">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title wow fadeInUp">
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            Case Studies
          </h6>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            You Prefer to Have Full <br />
            Control for Business Issues
          </h2>
        </div>
      </div>

      <div className="project-wrapper-2">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true, el: ".dot" }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            1300: { slidesPerView: 4 },
          }}
          className="project-slider-2"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="project-box-items-2">
                <div className="project-image">
                  <img src={project.img} alt="img" />
                  <img src={project.img} alt="img" />
                  <div className="shape-1">
                    <img
                      src="images/home-2/project/shape-1.png"
                      alt="shape"
                    />
                  </div>
                  <div className="project-content">
                    <h3>
                      <Link href="/page-project-details">{project.title}</Link>
                    </h3>
                    <p>{project.category}</p>
                  </div>
                </div>
                <Link
                  href="/page-project-details"
                  className="theme-btn btn-style-one"
                >
                  View Full Study
                  <span className="icon">
                    <i className="lnr-icon-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Swiper pagination dots */}
        <div className="swiper-dot mt-5 mb-0">
          <div className="dot"></div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;

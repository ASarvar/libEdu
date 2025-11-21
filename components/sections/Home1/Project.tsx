"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const projects = [
  {
    id: 1,
    img: "/images/home-1/project/project-01.jpg",
    title: "Technology IT",
    subtitle: "Business Tech",
    link: "/page-project-details",
    number: "01",
  },
  {
    id: 2,
    img: "/images/home-1/project/project-02.jpg",
    title: "Orion Finance",
    subtitle: "Orion Finance",
    link: "/page-project-details",
    number: "02",
  },
  {
    id: 3,
    img: "/images/home-1/project/project-03.jpg",
    title: "Business Firm",
    subtitle: "Business Firm",
    link: "/page-project-details",
    number: "03",
  },
  {
    id: 4,
    img: "/images/home-1/project/project-02.jpg",
    title: "Orion Finance (Duplicate Example)",
    subtitle: "Orion Finance",
    link: "/page-project-details",
    number: "04",
  },
  {
    id: 5,
    img: "/images/home-1/project/project-01.jpg",
    title: "Technology IT (Duplicate Example)",
    subtitle: "Business Tech",
    link: "/page-project-details",
    number: "05",
  },
];


export default function ProjectSection() {
  return (
    <section className="project-section fix section-padding">
      {/* Shapes */}
      <div className="shape-1">
        <img src="images/home-1/project/shape-1.png" alt="img" />
      </div>
      <div className="shape-2">
        <img src="images/home-1/project/shape-2.png" alt="img" />
      </div>

      <div className="auto-container">
        {/* Section Title */}
        <div className="sec-title">
          <div className="row g-4 justify-content-between align-items-end">
            <div className="col-xl-7 col-lg-9">
              <h6 className="sub-title">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Case Studies
              </h6>
              <h2>
                You Prefer to Have full <br /> Control for Business Issues
              </h2>
            </div>
            <div className="col-xl-5 col-lg-3">
              <div className="array-button justify-content-end">
                <button className="array-prev">
                  <i className="fa-regular fa-arrow-left"></i>
                </button>
                <button className="array-next">
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper */}
        <div className="project-wrapper">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".array-next",
              prevEl: ".array-prev",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              415: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            className="project-slider"
          >
            {projects.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`}>
                <div className="project-card-items">
                  <div className="project-image">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={500}
                      height={400}
                    />
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={500}
                      height={400}
                    />
                    <span className="number">{item.number}</span>
                  </div>
                  <div className="project-content">
                    <div className="arrow-shape">
                      <Image
                        src="/images/home-1/project/arrow-shape.png"
                        alt="arrow"
                        width={100}
                        height={50}
                      />
                    </div>
                    <div className="content">
                      <h3>
                        <Link href={item.link}>{item.title}</Link>
                      </h3>
                      <p>{item.subtitle}</p>
                    </div>
                    <Link href={item.link} className="icon">
                      <i className="lnr-icon-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

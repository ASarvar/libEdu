"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const teamMembers = [
  {
    id: 1,
    name: "Arion Hezel",
    role: "Arion Hezel",
    img: "/images/home-1/team/team-01.jpg",
  },
  {
    id: 2,
    name: "Wade Warren",
    role: "Founder, finclix",
    img: "/images/home-1/team/team-02.jpg",
  },
  {
    id: 3,
    name: "Jacob Jones",
    role: "CEO, finclix",
    img: "/images/home-1/team/team-03.jpg",
  },
  {
    id: 4,
    name: "Cody Fisher",
    role: "Arion Hezel",
    img: "/images/home-1/team/team-04.jpg",
  },
  {
    id: 5,
    name: "Dianne Russell",
    role: "Admin, finclix",
    img: "/images/home-1/team/team-05.jpg",
  },
  {
    id: 2,
    name: "Wade Warren",
    role: "Founder, finclix",
    img: "/images/home-1/team/team-02.jpg",
  },
  {
    id: 3,
    name: "Jacob Jones",
    role: "CEO, finclix",
    img: "/images/home-1/team/team-03.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="team-section fix">
      <div className="team-wrapper section-padding">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h6 className="sub-title wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              Our Team
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              Our Experienced <br />
              team member
            </h2>
          </div>
          <div className="team-bg-shape section-bg">
            <Image
              src="/images/home-1/team/team-bg-shape.png"
              alt="Team Background"
              width={800}
              height={600}
            />
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".dot" }}
          breakpoints={{
            575: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1350: { slidesPerView: 5 },
          }}
          className="team-slider"
        >
          {teamMembers.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="team-box-items">
                <div className="team-image">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={300}
                    height={300}
                  />
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={300}
                    height={300}
                  />
                  <div className="arrow-shape">
                    <Image
                      src="/images/home-1/team/arrow-shape.png"
                      alt="Arrow"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="team-content">
                    <div className="content">
                      <h4>
                        <Link href="/page-team-details">{item.name}</Link>
                      </h4>
                      <p>{item.role}</p>
                    </div>
                    <div className="social-links">
                      <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                      <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                      <Link href="#"><i className="fab fa-instagram"></i></Link>
                    </div>
                    <span className="share-icon fa fa-share-alt"></span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper pagination dots */}
        <div className="swiper-dot">
          <div className="dot"></div>
        </div>
      </div>
    </section>
  );
}

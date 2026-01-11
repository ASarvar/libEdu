"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const getProjects = (t: any) => [
  {
    id: 1,
    img: "/images/home-1/project/project-01.jpg",
    titleKey: "projectSection.project1.title",
    subtitleKey: "projectSection.project1.subtitle",
    link: "/events",
    number: "01",
  },
  {
    id: 2,
    img: "/images/home-1/project/project-02.jpg",
    titleKey: "projectSection.project2.title",
    subtitleKey: "projectSection.project2.subtitle",
    link: "/events",
    number: "02",
  },
  {
    id: 3,
    img: "/images/home-1/project/project-03.jpg",
    titleKey: "projectSection.project3.title",
    subtitleKey: "projectSection.project3.subtitle",
    link: "/events",
    number: "03",
  },
  {
    id: 4,
    img: "/images/home-1/project/project-04.jpg",
    titleKey: "projectSection.project4.title",
    subtitleKey: "projectSection.project4.subtitle",
    link: "/events",
    number: "04",
  },
  {
    id: 5,
    img: "/images/home-1/project/project-05.jpg",
    titleKey: "projectSection.project5.title",
    subtitleKey: "projectSection.project5.subtitle",
    link: "/events",
    number: "05",
  },
];

export default function ProjectSection() {
  const { t } = useTranslation();
  const projects = getProjects(t);

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
                {t("projectSection.subtitle")}
              </h6>
              <h2>{t("projectSection.title")}</h2>
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
                      alt={t(item.titleKey)}
                      width={500}
                      height={400}
                      unoptimized
                      priority={index < 3}
                    />
                    <Image
                      src={item.img}
                      alt={t(item.titleKey)}
                      width={500}
                      height={400}
                      unoptimized
                      priority={index < 3}
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
                        <Link href={item.link}>{t(item.titleKey)}</Link>
                      </h3>
                      <p>{t(item.subtitleKey)}</p>
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

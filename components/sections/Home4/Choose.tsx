"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // 👈 Import Framer Motion

// Import image assets
import service01 from "/public/images/home-4/service/service-01.png";

const services = [
  {
    number: "01",
    title: "Audit & Assurance",
    icon: "flaticon-business-030-settings",
    img: service01,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    list: [
      { label: "Invest Like the 1%", desc: "Legacy Built Right" },
      { label: "Real-Time Wealth Tech", desc: "Higher Returns" },
      { label: "Algorithmic Edge", desc: "Grow Wealth" },
      { label: "Ethical Growth" },
    ],
  },
  {
    number: "02",
    title: "Business Consulting",
    icon: "flaticon-business-054-graph",
    img: service01,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    list: [
      { label: "Invest Like the 1%", desc: "Legacy Built Right" },
      { label: "Real-Time Wealth Tech", desc: "Higher Returns" },
      { label: "Algorithmic Edge", desc: "Grow Wealth" },
      { label: "Ethical Growth" },
    ],
  },
  {
    number: "03",
    title: "Finance Management",
    icon: "flaticon-business-059-plant",
    img: service01,
    text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
    list: [
      { label: "Invest Like the 1%", desc: "Legacy Built Right" },
      { label: "Real-Time Wealth Tech", desc: "Higher Returns" },
      { label: "Algorithmic Edge", desc: "Grow Wealth" },
      { label: "Ethical Growth" },
    ],
  },
];

export default function WhyChooseSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="why-choose-section-2 section-padding fix bg-cover"
      style={{ backgroundImage: "url('/images/home-3/service-bg-2.jpg')" }}
    >
      <div className="circle-shape">
        <img src="/images/home-2/choose-us/circle-shape.png" alt="shape" />
      </div>

      <div className="auto-container">
        {/* Title Section */}
        <motion.div
          className="sec-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-7">
              <h6 className="text-white sub-title">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Latest Services
              </h6>
              <h2 className="text-white">
                You Need Someone At with Strategic Support
              </h2>
            </div>
            <div className="col-xl-5">
              <p className="text-white">
                Digital agencies combine creativity, technical expertise, and
                data-driven strategies to deliver tailored solutions for their
                clients. They cater to businesses of all sizes, from startups to
                large enterprises, across various industries.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Service Blocks */}
        <div className="service-wrapper-4">
          {services.map((service, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                className={`service-block-two ${isActive ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.2, // staggered delay
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
              >
                <div className={`inner-box ${isActive ? "active" : ""}`}>
                  <div className="title-box">
                    <div className="number">
                      <span>{service.number}</span>
                    </div>
                    <div className="title">{service.title}</div>
                    <div className="icon-box">
                      <i className={service.icon}></i>
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      className="content-box"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="row">
                        <div className="image-column col-lg-6">
                          <div className="inner-column">
                            <div className="image">
                              <Image
                                src={service.img}
                                alt={service.title}
                                className="img-fluid"
                              />
                            </div>
                            <div className="icon-box">
                              <Link href="/page-service-details">
                                <span className="inner">
                                  <i className="fa-regular fa-arrow-right"></i>
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="content-column col-lg-6 col-xxl-5 offset-xxl-1">
                          <div className="inner-column">
                            <div className="text">{service.text}</div>
                            <div className="info-list">
                              {service.list.map((item, i) => (
                                <div key={i} className="list-item">
                                  <span>{item.label}</span>{" "}
                                  {item.desc ? item.desc : ""}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

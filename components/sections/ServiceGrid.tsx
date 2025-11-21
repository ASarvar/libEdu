import React from "react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: 1,
    icon: "flaticon-business-028-briefcase",
    number: "01",
    title: "Business Consulting",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".3s",
  },
  {
    id: 2,
    icon: "lnr-icon-folder-open",
    number: "02",
    title: "Invest Process",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".5s",
  },
  {
    id: 3,
    icon: "lnr-icon-layers",
    number: "03",
    title: "Life Insurance",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".7s",
  },
  {
    id: 4,
    icon: "lnr-icon-folder-open",
    number: "04",
    title: "Invest Process",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".3s",
  },
  {
    id: 5,
    icon: "lnr-icon-layers",
    number: "05",
    title: "Life Insurance",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".5s",
  },
  {
    id: 6,
    icon: "flaticon-business-028-briefcase",
    number: "06",
    title: "Business Consulting",
    desc: "everyone with high and useful reward for his We offer a free consultation so that.",
    delay: ".7s",
  },
];

export default function ServiceSection() {
  return (
    <section className="service-section-4 section-padding fix">
      <div className="auto-container">
        <div className="row g-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={service.delay}
            >
              <div className="service-card-items-2">
                <div className="service-icon">
                  <div className="icon">
                    <i className={service.icon}></i>
                    <div className="service-triangle"></div>
                  </div>
                  <span className="number">{service.number}</span>
                </div>
                <div className="content">
                  <h3>
                    <Link href="/page-service-details">{service.title}</Link>
                  </h3>
                  <p>{service.desc}</p>
                </div>
                <div className="arrow-shape-2 float-bob-x">
                  <Image
                    src="/images/home-2/service-icon/arrow-shape.png"
                    alt="icon"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

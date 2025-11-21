"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: "flaticon-business-054-graph",
    title: "Strategic Financial Planning",
    text: "Development of long-term financial goals roadmaps scenario planning",
    delay: ".3s",
  },
  {
    icon: "flaticon-business-048-coin",
    title: "Financial Analysis Reporting",
    text: "Development of long-term financial goals roadmaps scenario planning",
    delay: ".4s",
  },
  {
    icon: "flaticon-business-024-configure",
    title: "Investment Capital Advisory",
    text: "Development of long-term financial goals roadmaps scenario planning",
    delay: ".5s",
  },
  {
    icon: "flaticon-business-060-graph",
    title: "Tax Planning & Compliance",
    text: "Development of long-term financial goals roadmaps scenario planning",
    delay: ".6s",
  },
];

export default function FeatureSection() {
  const [defaultActiveIndex] = useState(1); // default second item active
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section className="feature-section pt-120 pb-90 fix">
      <div className="auto-container">
        <div className="row">
          {features.map((feature, index) => {
            const isActive =
              hoverIndex === index || (hoverIndex === null && defaultActiveIndex === index);

            return (
              <div
                key={index}
                className="col-xl-3 col-lg-4 col-md-6"
                data-wow-delay={feature.delay}
              >
                <div
                  className={`feature-block-one ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="inner-box">
                    <div className="feature-icon">
                      <i className={`svg-icon ${feature.icon}`}></i>
                    </div>
                    <div className="content-box">
                      <h4 className="feature-title">
                        <Link href="/page-service-details">{feature.title}</Link>
                      </h4>
                      <p className="feature-text">{feature.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

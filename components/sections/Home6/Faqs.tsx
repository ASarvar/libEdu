"use client";

import React, { useState, useRef, useEffect } from "react";

const faqData = [
  {
    question: "How Can Insurance Consulting Benefit My Company?",
    answer:
      "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as",
  },
  {
    question: "What Are the Costs of Your Consulting Services?",
    answer:
      "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as",
  },
  {
    question: "How Do You Measure the Success of a Project?",
    answer:
      "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as",
  },
  {
    question: "Do You Provide Remote Consulting Services?",
    answer:
      "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as",
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq-section-three">
      <div
        className="bg-layer"
        style={{
          backgroundImage: 'url("images/home-6/background/faq-bg.png")',
        }}
      ></div>

      <div className="auto-container">
        <div className="row g-4 justify-content-between align-items-flex-start">
          {/* Left Side */}
          <div className="col-xl-5 col-lg-6">
            <div className="faq-left-items-2">
              <div className="faq-image">
                <img
                  src="images/home-6/faq/faq-image.jpg"
                  alt="img"
                  className="wow img-custom-anim-left"
                />
              </div>
              <div className="info-box">
                <div className="icon-box">
                  <i className="icon flaticon-business-018-startup"></i>
                </div>
                <div className="content-box">
                  <div className="content-icon">
                    <i className="icon fa-regular fa-arrow-right"></i>
                  </div>
                  <div className="content">
                    <h5 className="content-title">To Get Your Answer</h5>
                    <span className="content-text">20.57% Growth per year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-xl-6 col-lg-6">
            <div className="sec-title mb-0">
              <h6 className="sub-title wow fadeInUp">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                FAQ’S
              </h6>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">
                Top Questions Answered Your Quick Guide
              </h2>
            </div>

            <div className="text mb-20">
              Lorem ipsum dolor sit amet consectetur adipiscing elit commodo
              hendrerit morbi non at metus nisi condimentum cubilia nulla
            </div>

            <div className="faq-content-1">
              <ul className="accordion-box">
                {faqData.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                    isActive={activeIndex === index}
                    onToggle={() => toggleFAQ(index)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const AccordionItem = ({
  index,
  question,
  answer,
  isActive,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      if (isActive) {
        setHeight(contentRef.current.scrollHeight + "px");
      } else {
        setHeight("0px");
      }
    }
  }, [isActive]);

  return (
    <li
      className={`accordion block wow fadeInUp ${isActive ? "active-block" : ""}`}
      data-wow-delay={`.${index * 2}s`}
    >
      <div
        className={`acc-btn ${isActive ? "active" : ""}`}
        onClick={onToggle}
      >
        {question}
        <i
          className={`arrow-icon fa-solid ${
            isActive ? "fa-angle-down" : "fa-angle-right"
          }`}
        ></i>
      </div>

      <div
        ref={contentRef}
        className={`acc-content ${isActive ? "current" : ""}`}
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <div className="content">
          <div className="text">{answer}</div>
        </div>
      </div>
    </li>
  );
};


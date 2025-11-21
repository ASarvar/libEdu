"use client";

import React, { useState, useRef, useEffect } from "react";

const faqData = [
  {
    question: "Financial consultants handle conflicts?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the...",
  },
  {
    question: "Errors with financial consequences in tax?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the...",
  },
  {
    question: "Prevention of damage of almost € 43,000?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the...",
  },
  {
    question: "Bad experience with financial service providers?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the...",
  },
  {
    question: "Monthly insurance rates far too high?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the...",
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section
      className="faq-section fix section-padding section-bg bg-cover"
      style={{
        backgroundImage: "url('images/home-1/faq/faq-shape.jpg')",
      }}
    >
      <div className="auto-container">
        <div className="row g-4 justify-content-between align-items-center">
          {/* Left side */}
          <div className="col-xl-5 col-lg-6">
            <div className="faq-left-items-1">
              <div className="sec-title mb-0">
                <h6 className="sub-title">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  FAQ’S
                </h6>
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="faq-image">
                <img
                  src="images/home-1/faq/faq-image.jpg"
                  alt="img"
                  className="img-custom-anim-left"
                />
                <div className="shape-1 float-bob-y">
                  <img src="images/home-1/faq/shape-01.png" alt="img" />
                </div>
                <div className="shape-2 float-bob-x">
                  <img src="images/home-1/faq/shape-02.png" alt="img" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side (Accordion) */}
          <div className="col-xl-6 col-lg-6">
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

// ✅ Animated Accordion Item
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

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      if (isActive) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    }
  }, [isActive]);

  return (
    <li className={`accordion block ${isActive ? "active-block" : ""}`}>
      <div className={`acc-btn ${isActive ? "active" : ""}`} onClick={onToggle}>
        {question}
        <div
          className={`icon fa ${isActive ? "fa-minus" : "fa-plus"}`}
        ></div>
      </div>
      <div
        ref={contentRef}
        className="acc-content"
        style={{
          maxHeight: isActive ? "auto" : "0px",
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

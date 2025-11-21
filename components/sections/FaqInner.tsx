"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const faqData = [
  {
    id: 1,
    question: "Financial consultants handle conflicts?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the",
  },
  {
    id: 2,
    question: "Errors with financial consequences in tax?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the",
  },
  {
    id: 3,
    question: "Prevention of damage of almost € 43,000?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the",
  },
  {
    id: 4,
    question: "Bad experience with financial service providers?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the",
  },
  {
    id: 5,
    question: "Monthly insurance rates far too high?",
    answer:
      "Everyone with high and useful reward for his/her trading, purchase and investment. Our goal is to make the",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq-section fix section-padding">
      <div className="auto-container">
        <div className="row g-4 justify-content-between align-items-center">
          {/* Left Column */}
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

              <div className="faq-image relative">
                <Image
                  src="/images/home-1/faq/faq-image.jpg"
                  alt="faq"
                  width={500}
                  height={500}
                  className="rounded"
                />
                <div className="shape-1 absolute float-bob-y">
                  <Image
                    src="/images/home-1/faq/shape-01.png"
                    alt="shape1"
                    width={120}
                    height={120}
                  />
                </div>
                <div className="shape-2 absolute float-bob-x">
                  <Image
                    src="/images/home-1/faq/shape-02.png"
                    alt="shape2"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
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
      setHeight(isActive ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isActive]);

  return (
    <li className={`accordion block ${isActive ? "active-block" : ""}`}>
      <div className="acc-btn" onClick={onToggle}>
        {index + 1}. {question}
        <div className={`icon fa ${isActive ? "fa-minus" : "fa-plus"}`}></div>
      </div>
      <div
        ref={contentRef}
        className={`acc-content ${isActive ? "current" : ""}`}
        style={{
          maxHeight: height,
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}>
        <div className="content">
          <div className="text">{answer}</div>
        </div>
      </div>
    </li>
  );
};

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const getFaqData = (t: any) => [
  {
    questionKey: "faqSection.faq1.question",
    answerKey: "faqSection.faq1.answer",
  },
  {
    questionKey: "faqSection.faq2.question",
    answerKey: "faqSection.faq2.answer",
  },
  {
    questionKey: "faqSection.faq3.question",
    answerKey: "faqSection.faq3.answer",
  },
  {
    questionKey: "faqSection.faq4.question",
    answerKey: "faqSection.faq4.answer",
  },
  {
    questionKey: "faqSection.faq5.question",
    answerKey: "faqSection.faq5.answer",
  },
];

export default function FAQAccordion() {
  const { t } = useTranslation();
  const faqData = getFaqData(t);
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
                  {t('faqSection.subtitle')}
                </h6>
                <h2>{t('faqSection.title')}</h2>
              </div>
              <div className="faq-image">
                <img
                  src="images/home-1/faq/faq-image.jpg"
                  alt="img"
                  className="img-custom-anim-left"
                />
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
                    question={t(faq.questionKey)}
                    answer={t(faq.answerKey)}
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

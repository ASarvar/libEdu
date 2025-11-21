
"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

export default function FAQAccordion() {

  const faqData = [
    {
      question: "How Can Business Consulting Benefit My Company?",
      answer:
        "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as their default placeholder text."
    },
    {
      question: "What Are the Costs of Your Consulting Services?",
      answer:
        "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as their default placeholder text."
    },
    {
      question: "How Do You Measure the Success of a Project?",
      answer:
        "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as their default placeholder text."
    },
    {
      question: "Do You Provide Remote Consulting Services?",
      answer:
        "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as their default placeholder text."
    },
    {
      question: "What Industries Do You Specialize In?",
      answer:
        "It is widely recognized that a reader's attention can be diverted by the content layout of a page. Many desktop publishing software and website editors now use Lorem Ipsum as their default placeholder text."
    }
  ];

 const [activeIndex, setActiveIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  
  return (
	<section className="faq-section-2 fix">
		<div className="faq-wrapper-2">
			<div className="dotted-shape">
				<img src="images/home-3/dotted-map.png" alt="img"/>
			</div>
			<div className="row g-4 align-items-center">
				<div className="col-xxl-4">
					<div className="faq-image-style-3 image-pllx fix">
						<img src="images/home-3/faq-image.jpg" alt="img"/>
					</div>
				</div>
				<div className="col-xxl-8">
					<div className="faq-items-wrap">
						<div className="row g-5">
							<div className="col-xl-5 col-lg-6">
								<div className="faq-content-style-3">
									<div className="sec-title mb-0">
										<h6 className="text-white sub-title wow fadeInUp">
											<span className="triangle triangle1"></span>
											<span className="triangle triangle2"></span>
											FAQ
										</h6>
										<h2 className="text-white wow fadeInUp" data-wow-delay=".2s">
											Top Questions Answered
										</h2>
									</div>
									<p className="faq-text wow fadeInUp" data-wow-delay=".4s">
										Everyone with high and useful reward for his Financial statement analysis, Cost-benefit analysis everyone with high and useful reward for his
									</p>
									<Link href="/page-contact" className="theme-btn btn-style-one wow fadeInUp animated" data-wow-delay=".6s">
									Lets Talk With Us
									<span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
								</Link>
								</div>
							</div>
							<div className="col-xl-7 col-lg-6">
								<div className="faq-accordion-style-3">
                    <div className="accordion" id="accordionExample2">
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
                    </div>
                </div>
							</div>
						</div>
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
    <div className="accordion-item" key={index}>
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${isActive ? "" : "collapsed"}`}
          type="button"
          onClick={onToggle}
        >
          {question}
        </button>
      </h2>
      <div
        ref={contentRef}
        className={`accordion-collapse ${isActive ? "show" : ""}`}
        style={{
          overflow: "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <div className="accordion-body">
          <p className="text">{answer}</p>
        </div>
      </div>
    </div>
  );
};
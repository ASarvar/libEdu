"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const AccordionItem = ({ title, number, content, imageSrc, delay, isActive, onClick }: any) => (
  <div
    className={`hzAccordion__item ${isActive ? 'active' : ''}`}
    style={{ animationDelay: delay }}
    onClick={onClick}
  >
    <div className="head">
      <h3 className="head-title">
        <span className="title">{title}</span>
        <span className="number">{number}</span>
      </h3>
    </div>
    {isActive && (
      <div className="content">
        <div className="wrp">
          <div className="content-wrp">
            <p className="text">{content}</p>
            <Link className="arry-btn" href="/page-service-details">
              <i className="fa-thin fa-arrow-up-right" />
            </Link>
          </div>
          <div className="shape">
            <img src="images/home-5/shape/hz-accordion-shap.png" alt="shape" />
          </div>
          <div className="image">
            <img src={imageSrc} alt="image" />
          </div>
        </div>
      </div>
    )}
  </div>
);

const HorizontalAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const accordionData = [
    {
      title: 'Organizational Culture & Leadership Alignment',
      number: '01',
      content: 'We develop customized strategies that incorporate tactics proven to deliver outstanding results testing.',
      imageSrc: 'images/home-5/service/service-one-image1.jpg',
      delay: '0ms',
    },
    {
      title: 'Strategic Planning & Development',
      number: '02',
      content: 'We develop customized strategies that incorporate tactics proven to deliver outstanding results testing.',
      imageSrc: 'images/home-5/service/service-one-image2.jpg',
      delay: '200ms',
    },
    {
      title: 'Operational Efficiency Optimization',
      number: '03',
      content: 'We develop customized strategies that incorporate tactics proven to deliver outstanding results testing.',
      imageSrc: 'images/home-5/service/service-one-image3.jpg',
      delay: '400ms',
    },
    {
      title: 'Tailored Consulting Solutions & Advisory Services',
      number: '04',
      content: 'We develop customized strategies that incorporate tactics proven to deliver outstanding results testing.',
      imageSrc: 'images/home-5/service/service-one-image4.jpg',
      delay: '600ms',
    },
  ];

  return (
    <>

    <section id="service" className="hzAccordion-area pt-120 pb-120">
      <div className="outer-box">
        <div className="container-fluid">
          <div className="sec-title center mb-60">
            <h6 className="sub-title light wow fadeInUp">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              Service area
            </h6>
            <h2 className="title light wow fadeInUp" data-wow-delay=".2s">Delivering Comprehensive Global <br/>Financial Solutions</h2>
          </div>
          <div className="hzAccordion__wrp">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                number={item.number}
                content={item.content}
                imageSrc={item.imageSrc}
                delay={item.delay}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? 0 : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default HorizontalAccordion;

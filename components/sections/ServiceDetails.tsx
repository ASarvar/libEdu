"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ModalVideo from "react-modal-video";

const serviceProcess = [
  { number: "01", title: "Creative Analysis", text: "Creative analysis is important. It is common for marketers to measure campaign performance at a superficial level. But to fully understand it" },
  { number: "02", title: "Design & Sketches", text: "A design sketch is a graphical sketched representation of a design plan. It is a visualization tool." },
  { number: "03", title: "Prototype & Wireframing", text: "A prototype is a barebones, relatively simple working model of an app or webpage." },
  { number: "04", title: "Delivery & Deploy", text: "Continuous delivery is an extension of continuous integration since it automatically deploys to testing and/or production." },
];

const outcomeList = [
  "Excepteur sint occaecat cupidatat a deserunt mollit anim id est laborum.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  "Accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
  "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
];

const faqList = [
  { question: "Do you offer marketing contracts or relationships?", answer: "Ne summo dictas pertinacia nam. Illum cetero vocent ei vim, case regione signiferumque vim te. Ex mea quem munere lobortis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { question: "What kind of marketing efforts do you specialize in?", answer: "Ne summo dictas pertinacia nam. Illum cetero vocent ei vim, case regione signiferumque vim te. Ex mea quem munere lobortis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { question: "Can I use the demos made by Ewebot?", answer: "Ne summo dictas pertinacia nam. Illum cetero vocent ei vim, case regione signiferumque vim te. Ex mea quem munere lobortis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { question: "What everybody ought to know about digital marketing?", answer: "Ne summo dictas pertinacia nam. Illum cetero vocent ei vim, case regione signiferumque vim te. Ex mea quem munere lobortis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
];

const sidebarServices = [
  "Web Development",
  "UI/UX Design",
  "Digital Marketing",
  "Product Design",
  "Branding & Illustration",
  "Mobile Solutions",
  "App Development",
];

export default function ServiceDetails() {
  const [isOpen, setOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setActiveFaq((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <section className="services-details section-padding">
        <div className="auto-container">
          {/* Header */}
          <div className="row align-items-lg-center">
            <div className="col-lg-6">
              <div className="sec-title mb-40">
                <h6 className="sub-title">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  Service Details
                </h6>
                <h2>
                  Product Development <br className="d-none d-lg-block" /> For Better Business
                </h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="project-details__top mt-lg-5">
                <div className="text mb-40">
                  Rorem ipsum dolor sit amet consectetur adipiscing elit, tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="services-details__content position-relative my-5">
                <img src="images/inner/service-details/service-details.jpg" alt="Image" />
                <div className="btn-wrp d-flex align-items-center">
                  <button
                    className="video-btn playbtnanim wow fadeInLeft"
                    data-wow-delay="700ms"
                    data-wow-duration="1500ms"
                    onClick={() => setOpen(true)}
                  >
                    <i className="fa-sharp fa-solid fa-play"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="services-details__content">
                <h3>Description</h3>
                <p className="mb-30">
                  UX design refers to “user experience design”, while UI stands for “user interface design”.
                </p>
                <p className="mb-30">
                  UI design considers the look, feel, and interactivity of the product, making sure everything is intuitive.
                </p>

                {/* Service Process */}
                <div className="service-nr-list">
                  <h3 className="mb-5">Service Process</h3>
                  <div className="row">
                    {serviceProcess.map((step, i) => (
                      <div className="col-lg-6" key={i}>
                        <div className="nr-list mb-5">
                          <h4 className="title d-flex align-items-center mb-4">
                            <span>{step.number}</span> {step.title}
                          </h4>
                          <p>{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcome */}
                <div className="content mt-40">
                  <h3 className="mb-4">Service Outcome</h3>
                  <ul className="outcome-list mb-5">
                    {outcomeList.map((item, i) => (
                      <li key={i}>
                        <i className="fal fa-check"></i> {item}
                      </li>
                    ))}
                  </ul>

                  {/* Images */}
                  <div className="feature-list my-5">
                    <div className="row clearfix">
                      <div className="col-md-6">
                        <Image
                          src="/images/inner/service-details/service-details-2.jpg"
                          alt="details"
                          width={400}
                          height={250}
                          className="mb-3"
                        />
                      </div>
                      <div className="col-md-6">
                        <Image
                          src="/images/inner/service-details/service-details-3.jpg"
                          alt="details"
                          width={400}
                          height={250}
                          className="mb-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Accordion */}
                <div className="faq-content-1 mt-4">
                  <ul className="accordion-box">
                    {faqList.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        index={index}
                        question={faq.question}
                        answer={faq.answer}
                        isActive={activeFaq === index}
                        onToggle={() => toggleFAQ(index)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="service-sidebar mt-5 mt-lg-0">
                {/* Services List */}
                <div className="sidebar-service-list mb-30">
                  <h4 className="title">More Services</h4>
                  <ul>
                    {sidebarServices.map((service, i) => (
                      <li key={i}>
                        <Link href="/page-service-details">
                          <i className="far fa-arrow-right"></i> <span>{service}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="sidebar-service-list mb-30">
                  <h4 className="title">Contact With Us</h4>
                  <ul className="address">
                    <li>New South Head Rd, Double Bay</li>
                    <li>2028, New York</li>
                    <li>
                      <Link href="#">contact@fufo.com</Link>
                    </li>
                    <li>
                      <Link href="#">+1300 877 503</Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Form */}
                <div className="sidebar-service-list">
                  <h4 className="title">Send Message</h4>
                  <form>
                    <input className="form-control mb-3" type="text" placeholder="Your Name" />
                    <input className="form-control mb-3" type="email" placeholder="Email Address" />
                    <textarea className="form-control mb-3" rows={5} placeholder="Write a Message"></textarea>
                    <button className="theme-btn btn-style-one rounded-1 mt-3">Send Message Us</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="Fvae8nxzVz4"
        onClose={() => setOpen(false)}
      />
    </>
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
      <div className={`acc-btn ${isActive ? "active" : ""}`} onClick={onToggle}>
        {question}
        <div className={`icon fa ${isActive ? "fa-minus" : "fa-plus"}`}></div>
      </div>
      <div
        ref={contentRef}
        className="acc-content"
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

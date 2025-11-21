"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/autoplay';

const teamMembers = [
  {
    img: "images/home-4/team/team-01.png",
    name: "Albert Flores",
    designation: "CEO-Founder",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    img: "images/home-4/team/team-02.png",
    name: "Albert Flores",
    designation: "CEO-Founder",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    img: "images/home-4/team/team-03.png",
    name: "Ralph Edwards",
    designation: "UX Designer",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    img: "images/home-4/team/team-04.png",
    name: "Wade Warren",
    designation: "CEO-Founder",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    img: "images/home-4/team/team-02.png",
    name: "Albert Flores",
    designation: "CEO-Founder",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    img: "images/home-4/team/team-03.png",
    name: "Ralph Edwards",
    designation: "UX Designer",
    links: {
      instagram: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

export default function TeamSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="team-section-4 section-padding">
      <div className="auto-container">
        <div className="sec-title">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-6 col-md-8">
              <h6 className="sub-title">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Our Team
              </h6>
              <h2>Get to Know Our Leadership Team</h2>
            </div>
            <div className="col-xl-5 col-md-4">
              <div className="array-button justify-content-end">
                <button ref={prevRef} className="array-prev">
                  <i className="fa-regular fa-arrow-left"></i>
                </button>
                <button ref={nextRef} className="array-next">
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="team-wrapper-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 4 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="team-block">
                <div className="inner-box text-center">
                  <div className="image-box">
                    <figure className="image">
                      <Link href="/page-team-details">
                        <img src={member.img} alt={member.name} />
                      </Link>
                    </figure>
                    <div className="share-icon">
                      <span className="icon far fa-plus"></span>
                      <div className="social-links">
                        <Link href={member.links.instagram}>
                          <i className="fab fa-instagram"></i>
                        </Link>
                        <Link href={member.links.twitter}>
                          <i className="fas fa-x"></i>
                        </Link>
                        <Link href={member.links.linkedin}>
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="content-box">
                    <span className="designation">{member.designation}</span>
                    <h4 className="name">
                      <Link href="/page-team-details">{member.name}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

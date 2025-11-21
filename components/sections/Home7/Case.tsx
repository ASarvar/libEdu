import React from "react";
import Link from "next/link";
import Image from "next/image";

const caseItems = [
  {
    img: "/images/home-7/case/case-three-image1.jpg",
    title: "HR Development",
    subtitle: "Consultuing",
    detailsLink: "/page-project-details",
    categoryLink: "/page-projects",
  },
  {
    img: "/images/home-7/case/case-three-image2.jpg",
    title: "HR Development",
    subtitle: "Consultuing",
    detailsLink: "/page-project-details",
    categoryLink: "/page-projects",
  },
  {
    img: "/images/home-7/case/case-three-image3.jpg",
    title: "HR Development",
    subtitle: "Consultuing",
    detailsLink: "/page-project-details",
    categoryLink: "/page-projects",
  },
  {
    img: "/images/home-7/case/case-three-image4.jpg",
    title: "HR Development",
    subtitle: "Consultuing",
    detailsLink: "/page-project-details",
    categoryLink: "/page-projects",
  },
];

export default function CaseSectionThree() {
  return (
    <section className="case-section-three">
      {/* Background Shape */}
      <div className="sec-shape">
        <Image
          className="sway_Y__animation"
          src="/images/home-7/case/case-three-shape.png"
          alt="Decorative Shape"
          width={300}
          height={300}
        />
      </div>

      {/* Boxes */}
      <div className="box-shape">
        <div className="box1 wow slideInUp" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
        <div className="box2 wow slideInLeft" data-wow-delay="200ms" data-wow-duration="1500ms"></div>
      </div>

      <div className="outer-box">
        {/* Left Content */}
        <div className="content-column">
          <div className="inner-column">
            <div className="sec-title mb-20">
              <h6 className="sub-title light wow fadeInUp">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                Case Studies
              </h6>
              <h2 className="title light fadeInUp" data-wow-delay=".2s">
                Together We Build Your Success Story
              </h2>
            </div>

            <div className="text">
              Sed ut perspiciatis unde omnis iste natus voluptatem doloremque laudantium
              totames aperiam eaque quaesy inventore a tetar bikal architecto beatae vitae dicta.
            </div>

            <ul className="info wow fadeInDown mb-30" data-wow-delay="00ms" data-wow-duration="1500ms">
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#C6D936" />
                  <path
                    d="M8.37891 13.8438L5.13672 10.6016C4.94141 10.4062 4.94141 10.0742 5.13672 9.87891L5.83984 9.17578C6.03516 8.98047 6.34766 8.98047 6.54297 9.17578L8.75 11.3633L13.4375 6.67578C13.6328 6.48047 13.9453 6.48047 14.1406 6.67578L14.8438 7.37891C15.0391 7.57422 15.0391 7.90625 14.8438 8.10156L9.10156 13.8438C8.90625 14.0391 8.57422 14.0391 8.37891 13.8438Z"
                    fill="black"
                  />
                </svg>
                Real-time insights to drive results.
              </li>
              <li>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="10" fill="#C6D936" />
                  <path
                    d="M8.37891 13.8438L5.13672 10.6016C4.94141 10.4062 4.94141 10.0742 5.13672 9.87891L5.83984 9.17578C6.03516 8.98047 6.34766 8.98047 6.54297 9.17578L8.75 11.3633L13.4375 6.67578C13.6328 6.48047 13.9453 6.48047 14.1406 6.67578L14.8438 7.37891C15.0391 7.57422 15.0391 7.90625 14.8438 8.10156L9.10156 13.8438C8.90625 14.0391 8.57422 14.0391 8.37891 13.8438Z"
                    fill="black"
                  />
                </svg>
                Accept fast payments directly during meetings.
              </li>
            </ul>

            <Link href="/page-contact" className="theme-btn btn-style-two">
              Get In Touch
              <span className="icon">
                <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
              </span>
            </Link>
          </div>
        </div>

        {/* Right Images */}
        <div className="image-column">
          <div className="row g-0">
            {caseItems.map((item, index) => (
              <div className="col-sm-6" key={index}>
                <div className="case-block-three overlay-anim">
                  <figure className="image">
                    <Image src={item.img} alt={item.title} width={500} height={500} />
                  </figure>
                  <Link className="icon" href={item.detailsLink}>
                    <i className="fa-solid fa-arrow-up-right"></i>
                  </Link>
                  <div className="content">
                    <h5 className="title">
                      <Link href={item.detailsLink}>{item.title}</Link>
                    </h5>
                    <h4 className="sub-title">
                      <Link href={item.categoryLink}>{item.subtitle}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

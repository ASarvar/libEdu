import React from "react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: '1',
    name: "Guy Hawkins",
    role: "Admin",
    img: "/images/home-3/team/team-01.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '2',
    name: "Jacob Jones",
    role: "Manager",
    img: "/images/home-3/team/team-02.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '3',
    name: "Kristin Watson",
    role: "Consultant",
    img: "/images/home-3/team/team-03.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '4',
    name: "Bessie Cooper",
    role: "Founder",
    img: "/images/home-3/team/team-04.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '3',
    name: "Kristin Watson",
    role: "Consultant",
    img: "/images/home-3/team/team-03.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '4',
    name: "Bessie Cooper",
    role: "Founder",
    img: "/images/home-3/team/team-04.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '1',
    name: "Guy Hawkins",
    role: "Admin",
    img: "/images/home-3/team/team-01.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
  {
    id: '2',
    name: "Jacob Jones",
    role: "Manager",
    img: "/images/home-3/team/team-02.jpg",
    socials: [
      { icon: "fa-facebook-f", link: "#" },
      { icon: "fa-instagram", link: "#" },
      { icon: "fa-linkedin-in", link: "#" },
      { icon: "fa-behance", link: "#" },
    ],
  },
];

const TeamSection = () => {
  return (
    <section className="team-section-3 fix section-padding">
      <div className="auto-container">
        <div className="row g-4">
          {teamMembers.map((member, index) => (
            <div key={`${member.id}-${index}`} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
              <div className="team-box-items-4 mt-0">
                <div className="team-image">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={400}
                    height={450}
                  />
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={400}
                    height={450}
                  />
                </div>
                <div className="socials">
                  <i className="fa-solid fa-plus"></i>
                  <ul>
                    {member.socials.map((social, i) => (
                      <li key={i}>
                        <Link href={social.link}>
                          <i className={`fa-brands ${social.icon}`}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="content-box">
                  <h3 className="title">
                    <Link href="/page-team-details">{member.name}</Link>
                  </h3>
                  <p className="sub-title">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

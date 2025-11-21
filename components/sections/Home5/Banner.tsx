"use client";

import React, { useState } from 'react';
import ModalVideo from 'react-modal-video'


function Banner() {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
    <section id='home' className="hero-section hero-5 parallaxie bg-cover" style={{backgroundImage: 'url(images/home-5/hero/hero-image.jpg)'}}>
      <div className="banner-outer">
        <div className="hero-content">
          <div className="star">
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <span className="star-title">Trusted by 50,000+ Clients</span>
          </div>
          <h1 className="banner-title wow fadeInUp" data-wow-delay=".2s">Fuel Business Success <br/> with Informed Financial <br/> Strategies</h1>
          <div className="hero-button wow fadeInLeft" data-wow-delay="700ms" data-wow-duration="1500ms">
            <a className="video-btn playbtnanim" onClick={() => setOpen(true)} data-fancybox="gallery" data-caption=""><i className="fa-sharp fa-solid fa-play"></i></a>
            <h4 className="btn-title">Watch  Videos</h4>
          </div>
        </div>
        <div className="hero-box-items">
          <div className="content-box wow fadeInUp" data-wow-delay=".3s">
            <p>(406) 555-012022</p>
            <p>Give Us a Call</p>
          </div>
          <div className="content-box wow fadeInUp" data-wow-delay=".5s">
            <p>Mon - Fri: 8:00AM - 7:00PM</p>
            <p>Sat - Sun: Closed</p>
          </div>
          <div className="content-box wow fadeInUp" data-wow-delay=".8s">
            <p>65 North Medical Drive</p>
            <p>Salt Lake City, Australia 84132</p>
          </div>
        </div>
      </div>
    </section>
     <ModalVideo channel='youtube' isOpen={isOpen} videoId="Fvae8nxzVz4" onClose={() => setOpen(false)} />
    </>
  );
}

export default Banner;
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ModalVideo from 'react-modal-video'
import { useSite } from '@/lib/useSite';


function Banner() {
  const [isOpen, setOpen] = useState(false)
  const { site } = useSite();

  const contactPhone = site?.contact_phone || '+998 (71) 233-45-67';
  const contactAddress = site?.contact_address || 'Toshkent shahri, O`zbekiston';

  return (
    <>
    <section id='home' className="hero-section hero-5 parallaxie bg-cover" style={{backgroundImage: 'url(/images/home-5/hero/hero-image.jpg)'}}>
      <div className="banner-outer">
        <div className="hero-content">
          <div className="star">
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <i className="icon fa-solid fa-star"></i>
            <span className="star-title">O`zbekiston kutubxonalari uchun yagona platforma</span>
          </div>
          <h1 className="banner-title wow fadeInUp" data-wow-delay=".2s">
            Raqamli Kutubxona Ekotizimi <br/> Bilimga Kirishni Osonlashtiring <br/> va O`quvchilarni Bog`lang
          </h1>
          <div className="hero-button wow fadeInLeft" data-wow-delay="700ms" data-wow-duration="1500ms">
            <button
              className="video-btn playbtnanim"
              onClick={() => setOpen(true)}
              type="button"
              aria-label="Platforma tanishtiruv videosini ochish"
            >
              <i className="fa-sharp fa-solid fa-play"></i>
            </button>
            <h4 className="btn-title">Batafsil</h4>
          </div>
          <div className="hero-button wow fadeInUp pl-60" data-wow-delay="900ms" data-wow-duration="1500ms">
            <Link href="/contact" className="theme-btn btn-style-one">
              Yordam
            </Link>
          </div>
        </div>
        <div className="hero-box-items">
          <div className="content-box wow fadeInUp" data-wow-delay=".3s">
            <p>{contactPhone}</p>
            <p>Bog`lanish uchun qo`ng`iroq qiling</p>
          </div>
          <div className="content-box wow fadeInUp" data-wow-delay=".5s">
            <p>Dushanba - Juma: 09:00 - 18:00</p>
            <p>Shanba - Yakshanba: Dam olish kuni</p>
          </div>
          <div className="content-box wow fadeInUp" data-wow-delay=".8s">
            <p>{contactAddress}</p>
          </div>
        </div>
      </div>
    </section>
     <ModalVideo channel='youtube' isOpen={isOpen} videoId="Fvae8nxzVz4" onClose={() => setOpen(false)} />
    </>
  );
}

export default Banner;
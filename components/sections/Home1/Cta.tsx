import React from "react";
import Link from "next/link";

function Cta (){
    return (
      <section className="cta-contact-section fix"> 
        <div className="auto-container">
          <div className="cta-contact-wrapper bg-cover" style={{backgroundImage: 'url(images/home-1/cta-bg.jpg)'}}>
            <div className="left-shape float-bob-x">
              <img src="images/home-1/left-shape.png" alt="img" />
            </div>
            <h3 className="font-size-32 text-white font-weight-600 wow fadeInUp" data-wow-delay=".3s">No strategy for the Long-Term</h3>
            <Link href="/page-contact" className="theme-btn btn-style-one wow fadeInUp" data-wow-delay=".5s">Lets Talk With Us</Link>
          </div>
        </div>
      </section>
    );
};

export default Cta;
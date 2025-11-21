import Link from 'next/link';
import React from 'react';

const MenuSingle = () => {
    return (

        <ul className="navigation onepage-nav">
            <li><Link href="#home">Home</Link></li>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#service">Services</Link></li>
            <li><Link href="#testimonial">Testimonial</Link></li>
            <li><Link href="#news">News</Link></li>
            <li><Link href="#contact">Contact</Link></li>
        </ul>

    );
};

export default MenuSingle;



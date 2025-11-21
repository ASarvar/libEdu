import Link from 'next/link';
import Image from 'next/image';
import LogoWhite from '../../public/images/home-1/logo/white-logo.svg';
import FooterBgImage from '../../public/images/home-1/footer-shape.png';

function Footer(){
    return (
        <>
        <footer className="footer-section-1 fix footer-bg bg-cover" style={{ backgroundImage: `url(${FooterBgImage})` }}>
            <span className="circle-shape"></span>
            <span className="circle-shape-2"></span>
            <div className="auto-container">
            <div className="footer-newsletter-wrapper">
                <div className="footer-newsletter-left wow fadeInUp" data-wow-delay=".3s">
                <div className="icon">
                <i className="lnr-icon-envelope"></i>
                </div>
                <h3 className="text-white font-weight-700 font-size-28"> subscribe to <br /> newsletter</h3>
                </div>
                <form action="#" className="wow fadeInUp" data-wow-delay=".5s">
                    <div className="form-clt">
                        <input type="text" name="email" id="email2" placeholder="Your email address" />
                        <button className="arrow-icon" type="submit">
                        <i className="lnr-icon-arrow-right"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="footer-widget-wrapper">
                <div className="row justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <Link href="/" className="footer-logo">
                            <Image src={LogoWhite} alt="img" />
                            </Link>
                        </div>
                        <div className="footer-content">
                            <p>everyone with high and useful reward for his/her trading</p>
                            <div className="social-icon">
                            <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link href="#"><i className="fa-brands fa-x-twitter"></i></Link>
                            <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <h3 className="font-size-24 text-white font-weight-500">Company</h3>
                        </div>
                        <ul className="user-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/page-about">About us</Link></li>
                            <li><Link href="/page-services">Services</Link></li>
                            <li><Link href="/page-contact">Contact Us</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <h3 className="font-size-24 text-white font-weight-500">Support</h3>
                        </div>
                        <ul className="user-links">
                            <li><Link href="/page-service-details">Customer Support</Link></li>
                            <li><Link href="/page-service-details">Privacy & policy</Link></li>
                            <li><Link href="/page-service-details">Terms & condition</Link></li>
                            <li><Link href="/page-service-details">Help Center</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".8s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <h3 className="font-size-24 text-white font-weight-500">Contact Us</h3>
                        </div>
                        <ul className="contact-list">
                            <li>
                            <i className="lnr-icon-phone-handset"></i>
                            <p><Link href="#">+10500-55-900</Link></p>
                            </li>
                            <li>
                            <i className="lnr-icon-envelope"></i>
                            <p><Link href="#">Finclix@help.us</Link></p>
                            </li>
                            <li>
                            <i className="lnr-icon-map-marker"></i>
                            <p>44 Danwers, NY City, USA, 70-102</p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-bottom">
                <div className="auto-container">
                    <p className="wow fadeInUp" data-wow-delay=".3s">Copyright © 2025 Finclix. All Rights Reserved</p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;
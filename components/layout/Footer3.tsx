"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import LogoWhite from '../../public/images/logo_white.svg';
import FooterBgImage from '../../public/images/home-1/footer-shape.png';

function Footer3(){
    const { t } = useTranslation();

    return (
        <footer className="footer-section-2 footer-section-4 fix footer-bg bg-cover" style={{backgroundImage: `url(${FooterBgImage})`}}>
            <div className="footer-left-shape">
                <img src="images/home-4/footer-left-shape.png" alt="img"/>
            </div>
            <div className="footer-right-shape">
                <img src="images/home-4/footer-right-shape.png" alt="img"/>
            </div>
            <div className="auto-container">
                <div className="footer-top-wrapper">
                    <Link href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
                        <Image src={LogoWhite} alt="Kutubxona Logo"/>
                    </Link>
                    <div className="social-icon wow fadeInUp" data-wow-delay=".5s">
                        <Link href="https://facebook.com" target="_blank"><i className="fa-brands fa-facebook-f"></i></Link>
                        <Link href="https://twitter.com" target="_blank"><i className="fa-brands fa-x-twitter"></i></Link>
                        <Link href="https://instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                    </div>
                </div>
                <div className="footer-widget-wrapper style-2">
                    <div className="row justify-content-between">
                        <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="footer-widget-items mt-30">
                                <div className="widget-title mb-25">
                                    <h3 className="font-size-24 text-white font-weight-500">{t('footerSection.contactTitle')}</h3>
                                </div>
                                <div className="footer-content">
                                    <p className="text-white">{t('footer.address')}</p>
                                    <ul className="contact-list-2">
                                        <li>
                                            <Link href="tel:+998712334567">+998 (71) 233-45-67</Link>
                                        </li>
                                        <li>
                                            <Link href="mailto:info@kutubxona.uz">info@kutubxona.uz</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 d-none d-xl-block"></div>
                        <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                            <div className="footer-widget-items mt-30">
                                <div className="widget-title mb-25">
                                    <h3 className="font-size-24 text-white font-weight-500">{t('footerSection.company')}</h3>
                                </div>
                                <div className="user-links-area">
                                    <ul className="user-links">
                                        <li><Link href="/">{t('footerSection.home')}</Link></li>
                                        <li><Link href="/about">{t('footerSection.about')}</Link></li>
                                        <li><Link href="/catalog">{t('footerSection.services')}</Link></li>
                                        <li><Link href="/contact">{t('footerSection.contactUs')}</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                            <div className="footer-widget-items mt-30">
                                <div className="widget-title mb-25">
                                    <h3 className="font-size-24 text-white font-weight-500">{t('footerSection.support')}</h3>
                                </div>
                                <ul className="user-links">
                                    <li><Link href="/contact">{t('footerSection.customerSupport')}</Link></li>
                                    <li><Link href="/about">{t('footerSection.privacy')}</Link></li>
                                    <li><Link href="/about">{t('footerSection.terms')}</Link></li>
                                    <li><Link href="/contact">{t('footerSection.helpCenter')}</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="footer-text wow fadeInUp" data-wow-delay=".3s">{t('footer.copyright')} © 2026 Kutubxona. {t('footerSection.copyright')}</p>
            </div>
        </footer>
    );
};

export default Footer3;

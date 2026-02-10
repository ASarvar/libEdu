"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import LogoWhite from '../../public/images/logo_white.svg';
import FooterBgImage from '../../public/images/home-1/footer-shape.png';

function Footer(){
    const { t } = useTranslation();

    return (
        <>
        <footer className="footer-section-1 fix footer-bg bg-cover" style={{ backgroundImage: `url(${FooterBgImage})` }}>
            <span className="circle-shape"></span>
            <span className="circle-shape-2"></span>
            <div className="auto-container">
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
                            <p>{t('footerSection.description')}</p>
                            <div className="social-icon">
                            <Link href="https://facebook.com" target="_blank"><i className="fa-brands fa-facebook-f"></i></Link>
                            <Link href="https://twitter.com" target="_blank"><i className="fa-brands fa-x-twitter"></i></Link>
                            <Link href="https://instagram.com" target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <h3 className="font-size-24 text-white font-weight-500">{t('footerSection.company')}</h3>
                        </div>
                        <ul className="user-links">
                            <li><Link href="/">{t('footerSection.home')}</Link></li>
                            <li><Link href="/about">{t('footerSection.about')}</Link></li>
                            <li><Link href="/catalog">{t('footerSection.services')}</Link></li>
                            <li><Link href="/contact">{t('footerSection.contactUs')}</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".6s">
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
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay=".8s">
                        <div className="footer-widget-items mt-30">
                        <div className="widget-title mb-25">
                            <h3 className="font-size-24 text-white font-weight-500">{t('footerSection.contactTitle')}</h3>
                        </div>
                        <ul className="contact-list">
                            <li>
                            <i className="lnr-icon-phone-handset"></i>
                            <p><Link href="tel:+998712334567">+998 (71) 233-45-67</Link></p>
                            </li>
                            <li>
                            <i className="lnr-icon-envelope"></i>
                            <p><Link href="mailto:info@kutubxona.uz">info@kutubxona.uz</Link></p>
                            </li>
                            <li>
                            <i className="lnr-icon-map-marker"></i>
                            <p>{t('footer.address')}</p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-bottom">
                <div className="auto-container">
                    <p className="wow fadeInUp" data-wow-delay=".3s">{t('footer.copyright')} © 2026 Kutubxona. {t('footerSection.copyright')}</p>
                </div>
            </div>
        </footer>
        </>
    );
};

export default Footer;
import React from "react";
import Link from "next/link";

const NewsSection = () => {
  return (
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="row g-4">
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-01.jpg" alt="img"/>
                  <img src="images/home-1/news/news-01.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">20</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Errors with financial 
                      consequences in tax ?</Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-02.jpg" alt="img"/>
                  <img src="images/home-1/news/news-02.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">25</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Achieving Work Life Balance in a Hectic World</Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-03.jpg" alt="img"/>
                  <img src="images/home-1/news/news-03.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">30</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Mastering Work-Life On
                      Target Business Goal </Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-03.jpg" alt="img"/>
                  <img src="images/home-1/news/news-03.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">30</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Mastering Work-Life On
                      Target Business Goal </Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-02.jpg" alt="img"/>
                  <img src="images/home-1/news/news-02.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">25</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Achieving Work Life Balance in a Hectic World</Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="news-box-items mt-0">
                <div className="news-image">
                  <img src="images/home-1/news/news-01.jpg" alt="img"/>
                  <img src="images/home-1/news/news-01.jpg" alt="img"/>
                  <span className="post-box">
                    <span className="date">20</span>
                    <span className="month">March</span>
                  </span>
                </div>
                <div className="news-content">
                  <ul className="comments-list">
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path opacity="0.5" d="M9 9C10.2426 9 11.25 7.99264 11.25 6.75C11.25 5.50736 10.2426 4.5 9 4.5C7.75736 4.5 6.75 5.50736 6.75 6.75C6.75 7.99264 7.75736 9 9 9Z" stroke="#144443"/>
                        <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#144443"/>
                        <path opacity="0.5" d="M13.4772 15C13.3579 12.8314 12.6939 11.25 9.00029 11.25C5.30678 11.25 4.6428 12.8314 4.52344 15" stroke="#144443" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.42865 5.05957H14.5696C16.4442 5.07375 17.9525 6.60465 17.9387 8.47921V12.6312C17.9453 13.5316 17.594 14.3977 16.9619 15.039C16.33 15.6802 15.4691 16.0443 14.5687 16.0508H8.42865L5.05869 17.9396V8.47921C5.05207 7.57884 5.40341 6.71274 6.0354 6.07142C6.66741 5.43011 7.52828 5.06613 8.42865 5.05957Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.90039 10.5802C6.90039 10.072 7.31229 9.66016 7.82039 9.66016C8.3285 9.66016 8.74039 10.072 8.74039 10.5802C8.74039 11.0883 8.3285 11.5002 7.82039 11.5002C7.5764 11.5002 7.34239 11.4032 7.16985 11.2307C6.99732 11.0582 6.90039 10.8241 6.90039 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5801 10.5802C10.5801 10.072 10.992 9.66016 11.5001 9.66016C12.0082 9.66016 12.4201 10.072 12.4201 10.5802C12.4201 11.0883 12.0082 11.5002 11.5001 11.5002C10.992 11.5002 10.5801 11.0883 10.5801 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2598 10.5802C14.2598 10.072 14.6716 9.66016 15.1798 9.66016C15.6879 9.66016 16.0998 10.072 16.0998 10.5802C16.0998 11.0883 15.6879 11.5002 15.1798 11.5002C14.6716 11.5002 14.2598 11.0883 14.2598 10.5802Z" stroke="#144443" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      3 Comments
                    </li>
                  </ul>
                  <h3>
                    <Link href="/news-details">Errors with financial 
                      consequences in tax ?</Link>
                  </h3>
                      <Link href="/news-details" className="link-btn">
                        Learn More
                        <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                      </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default NewsSection;

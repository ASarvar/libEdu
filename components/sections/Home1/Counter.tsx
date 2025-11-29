"use client";
import React from "react";
import { useTranslation } from 'react-i18next';
import CounterUp from '../../elements/CounterUp';

function Counter (){
    const { t } = useTranslation();
    
    return (
    <section className="counter-section section-padding pt-0">
        <div className="auto-container">
          <div className="counter-wrapper">
            <div className="counter-box-1 wow bounceInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="count-box">
                <h2><span className="count-text"><CounterUp end={50} /></span>K+</h2>
                <p>{t('counter.books.label')}</p>
              </div>
            </div>
            <div className="counter-box-1 wow bounceInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="count-box">
                <h2><span className="count-text"><CounterUp end={15} /></span>K+</h2>
                <p>{t('counter.members.label')}</p>
              </div>
            </div>
            <div className="counter-box-1 wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="count-box">
                <h2><span className="count-text"><CounterUp end={200} /></span>+</h2>
                <p>{t('counter.events.label')}</p>
              </div>
            </div>
            <div className="counter-box-1 wow bounceInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
              <div className="count-box">
                <h2>
                  <span className="count-text"><CounterUp end={23} /></span>
                </h2>
                <p>{t('counter.branches.label')}</p>
              </div>
            </div>
          </div>
        </div>
    </section>
    );
};
export default Counter;
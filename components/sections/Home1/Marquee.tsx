"use client";
import React from "react";
import { useTranslation } from 'react-i18next';

function Marquee() {
  const { t } = useTranslation();

  return (
      <div className="marquee-section fix section-padding pt-0">
        <div className="marquee">
          <div className="marquee-group">
            <div className="text">{t('marquee.word1')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word2')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word3')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word4')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word5')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
          </div>
          <div className="marquee-group">
            <div className="text">{t('marquee.word1')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word2')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word3')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word4')}</div>
            <div className="text">
              <img src="images/home-1/dawn.png" alt="img" />
            </div>
            <div className="text">{t('marquee.word5')}</div>
          </div>
        </div>
      </div>
  );
}

export default Marquee;
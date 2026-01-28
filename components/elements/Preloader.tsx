"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<string>('Uz');
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get saved language from localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') || 'Uz';
      setCurrentLanguage(savedLang);
    }

    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    // Wait for actual document load state
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const handleLoad = () => {
        setLoading(false);
      };

      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
        i18n.off('languageChanged', handleLanguageChange);
      };
    }
  }, [i18n]);

  if (!loading) return null;

  // Get the current language's loading text
  const getLoadingText = () => {
    if (currentLanguage === 'Uz') return 'Yuklanmoqda...';
    if (currentLanguage === 'Ru') return 'Загрузка...';
    return 'Loading...';
  };

  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="preloader-visual" aria-hidden="true">
          <div className="spinner" />
          <div className="preloader-logo">
            <Image
              src="/images/logo_short.svg"
              alt="Library Logo"
              width={80}
              height={80}
              priority
            />
          </div>
        </div>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-left">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg"></div>
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}


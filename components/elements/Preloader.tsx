"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for actual document load state
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const handleLoad = () => {
        setLoading(false);
      };

      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="F" className="letters-loading">
            F
          </span>
          <span data-text-preloader="I" className="letters-loading">
            I
          </span>
          <span data-text-preloader="N" className="letters-loading">
            N
          </span>
          <span data-text-preloader="C" className="letters-loading">
            C
          </span>
          <span data-text-preloader="L" className="letters-loading">
            L
          </span>
          <span data-text-preloader="I" className="letters-loading">
            I
          </span>
          <span data-text-preloader="X" className="letters-loading">
            X
          </span>
        </div>
        <p className="text-center">Loading</p>
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


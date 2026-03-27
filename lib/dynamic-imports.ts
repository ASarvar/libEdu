/**
 * Dynamic imports for heavy animation libraries
 * Use these instead of direct imports to reduce bundle size
 */

import dynamic from 'next/dynamic';
import React from 'react';

// Swiper - only load when needed (public site)
export const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
  ssr: false,
  loading: () => React.createElement('div', { className: 'swiper-loading' }, 'Loading slider...'),
});

export const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), {
  ssr: false,
});

// GSAP - only load when needed (public site animations)
export const loadGsap = async () => {
  const gsap = await import('gsap');
  return gsap.default;
};

export const loadScrollTrigger = async () => {
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  return ScrollTrigger;
};

// Framer Motion - load dynamically (keep as function, not component)
export const loadFramerMotion = async () => {
  const framerMotion = await import('framer-motion');
  return framerMotion;
};

// WOW.js - only for public site
export const initWow = async () => {
  if (typeof window !== 'undefined') {
    const { default: WOW } = await import('wowjs');
    return new WOW.WOW({ live: false });
  }
  return null;
};

// CountUp - used in both public and admin
export const CountUp = dynamic(() => import('react-countup'), {
  ssr: false,
  loading: () => React.createElement('span', {}, '0'),
});

// Chart.js for admin dashboard
export const loadChart = async () => {
  // @ts-ignore - chart.js may not be installed yet
  const chartModule = await import('chart.js');
  const { Chart, registerables } = chartModule;
  Chart.register(...registerables);
  return Chart;
};

// React Circular Progressbar - admin only
export const CircularProgressbar = dynamic(
  () => import('react-circular-progressbar').then(mod => mod.CircularProgressbar),
  {
    ssr: false,
    loading: () => React.createElement('div', { className: 'progress-loading' }, 'Loading...'),
  }
);

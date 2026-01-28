/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimize images
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Experimental features for App Router
  experimental: {
    optimizePackageImports: ["swiper", "framer-motion", "react-i18next", "i18next"],
  },

  // Turbopack configuration for Next.js 16+
  turbopack: {},
};

export default nextConfig;

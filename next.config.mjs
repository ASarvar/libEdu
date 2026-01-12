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
    // Recommended to keep this true in production to catch type errors
    ignoreBuildErrors: false,
  },

  // Experimental features for App Router
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["swiper", "framer-motion"],
  },
};

export default nextConfig;

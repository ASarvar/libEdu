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

  // ESLint configuration
  eslint: {
    // Recommended to keep this false to ensure code quality
    ignoreDuringBuilds: false,
  },

  // Experimental features for App Router
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["swiper", "framer-motion"],
  },
};

export default nextConfig;

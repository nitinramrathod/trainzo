import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['protonity.onrender.com', 'images.unsplash.com'],
  },
  env: {
    API_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;

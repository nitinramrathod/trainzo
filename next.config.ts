import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [     
      {
        protocol: 'https',
        hostname: 'protonity.onrender.com',
        pathname: '/**', // Match all paths
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Match all paths
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**', // Match all paths
      },
    ],

  },
  env: {
    API_URL: process.env.BACKEND_URL,
  },
};

export default nextConfig;

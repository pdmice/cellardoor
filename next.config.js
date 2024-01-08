/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
};

module.exports = nextConfig;

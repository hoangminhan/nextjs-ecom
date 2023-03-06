/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/phuockaito/image/upload/**",
      },
    ],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;

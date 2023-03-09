/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: "https://www.kaitoshop.tk/",
  },
};

module.exports = nextConfig;

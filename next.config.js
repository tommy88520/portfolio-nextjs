/** @type {import('next').NextConfig} */
const path = require('path');
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: false,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    API_URL: process.env.BACKEND_BASE_URL,
  },
  images: {
    // These are the default device/image sizes provided by Next.js.  Leaving them here for easier experimentation.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["lh3.googleusercontent.com", "i.imgur.com", "i.ibb.co"],
  },
}

module.exports = nextConfig

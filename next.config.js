/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    API: process.env.NODE_ENV =='development' ? 'https://www.api.sellingcompetition.com':'http://localhost:3000',
  }
}
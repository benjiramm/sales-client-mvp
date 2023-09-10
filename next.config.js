/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    API: process.env.NODE_ENV =='development' ? 'http://localhost:3000':'https://www.api.sellingcompetition.com',
  }
}
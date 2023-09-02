/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    API: 'http://www.api.sellingcompetition.com',
    //API: 'http://localhost:3000'
  }
}
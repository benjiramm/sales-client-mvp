/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  env: {
    API: 'https://sales-app-v2-server-d4fa7347984d.herokuapp.com',
    //API: 'http://localhost:3000'
  }
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

require('dotenv').config()

module.exports = {
  env: {
    API: "https://sales-app-v2-server-d4fa7347984d.herokuapp.com",
  },
};
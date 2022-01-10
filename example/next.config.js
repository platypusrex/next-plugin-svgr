/** @type {import('next').NextConfig} */
const withSvgr = require('next-plugin-svgr');

const nextConfig = {
  reactStrictMode: true,
  fileLoader: true,
}

module.exports = withSvgr(nextConfig);

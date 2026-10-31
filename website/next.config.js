const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['bd-geo-info'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'bd-geo-info': path.resolve(__dirname, '../src/index.ts'),
    };
    return config;
  },
};

module.exports = nextConfig;

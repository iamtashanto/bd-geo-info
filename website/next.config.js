/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile the local bd-geo-info package
  transpilePackages: ['bd-geo-info'],
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [];
  },
};

module.exports = {
  ...nextConfig,
  serverOptions: {
    port: 4000
  }
} 
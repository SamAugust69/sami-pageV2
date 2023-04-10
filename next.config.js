
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true
})

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
})

module.exports = nextConfig




const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true
})

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  }
}

module.exports = withPWA(nextConfig)



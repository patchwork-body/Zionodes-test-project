/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  publicRuntimeConfig: {
    DB_VERSION: process.env.DB_VERSION ?? 1,
  },
};

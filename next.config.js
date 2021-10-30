/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    DB_VERSION: process.env.DB_VERSION ?? 1,
  },
};

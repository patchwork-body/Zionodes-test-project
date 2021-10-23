/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    STORE_NAME: process.env.STORE_NAME ?? 'todos',
    DB_VERSION: process.env.DB_VERSION ?? 1,
  },
};

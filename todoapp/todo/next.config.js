// /** @type {import('next').NextConfig} */

// const runtimeCaching = require("next-pwa/cache");
// const withPWA=require('next-pwa');

// module.exports =withPWA({
//   pwa: {
//     dest:"public",
//     runtimeCaching,
//     register:true,
//     skipWaiting:true,
//     disable: process.env.NODE_ENV === 'development',
//   },
// })

// `next-pwa` config should be passed here
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

// Use `withPWA` and pass general Next.js config
module.exports = withPWA({    
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
  },
  output: "standalone"
});

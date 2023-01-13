/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "occ-0-4796-988.1.nflxso.net",
      "image.tmdb.org",
    ],
  },
};

module.exports = nextConfig;

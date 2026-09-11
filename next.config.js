/** @type {import('next').NextConfig} */
const nextConfig = {
  // Verification builds can be pointed at a throwaway directory so they never
  // clobber the chunks a running `next dev` is serving from .next.
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

module.exports = nextConfig;

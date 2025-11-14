/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Local dev images (adjust port if different)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // Cloudinary
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // Optional: bypass Sharp while debugging image pipeline crashes
    // unoptimized: true,
  },
  // Optional example:
  // experimental: { optimizePackageImports: ['lucide-react'] },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: 'http://localhost:5000/admin/:path*',
      },
    ];
  },
};

export default nextConfig;

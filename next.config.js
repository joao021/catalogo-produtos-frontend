/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.allugator.com",
      "yacare-products-image.s3.sa-east-1.amazonaws.com",
    ],
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

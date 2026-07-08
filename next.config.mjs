/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5006", pathname: "/uploads/**" },
    ],
    // Backend runs on localhost in dev, which Next 16 treats as a local IP and
    // blocks from image optimization by default (security restriction).
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;

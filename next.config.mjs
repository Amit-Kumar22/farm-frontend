import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
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

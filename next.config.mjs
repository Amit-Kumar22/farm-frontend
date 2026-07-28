import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The backend that serves /uploads/** can be a different host per environment
// (localhost in dev, the real API domain in production). Next's image
// optimizer 400s on any remote host not explicitly whitelisted here, so we
// derive a pattern from NEXT_PUBLIC_API_URL (the same env var the app already
// uses to reach the API) instead of hardcoding just the dev host.
function apiUploadsPattern() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;
  try {
    const { protocol, hostname, port } = new URL(apiUrl);
    return { protocol: protocol.replace(":", ""), hostname, port, pathname: "/uploads/**" };
  } catch {
    return null;
  }
}

const remotePatterns = [
  { protocol: "http", hostname: "localhost", port: "5006", pathname: "/uploads/**" },
  // Static fallback for the production API host in case NEXT_PUBLIC_API_URL
  // isn't set at build time on the hosting platform (see cookie domain in
  // farm-backend/src/controllers/auth.controller.js).
  { protocol: "https", hostname: "**.maifarm.org", pathname: "/uploads/**" },
];
const apiPattern = apiUploadsPattern();
if (apiPattern) remotePatterns.push(apiPattern);

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns,
    // Backend runs on localhost in dev, which Next 16 treats as a local IP and
    // blocks from image optimization by default (security restriction).
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;

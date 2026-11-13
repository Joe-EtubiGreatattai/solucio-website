import type { NextConfig } from "next";

// The booking backend runs on the Solucio server. When BOOKING_API_ORIGIN is set (on Vercel, or locally),
// the site sends /api requests there instead of handling them itself.
const apiOrigin = (process.env.BOOKING_API_ORIGIN || "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // `STANDALONE=1 npm run build` makes a self-contained server bundle for the Solucio server
  output: process.env.STANDALONE ? "standalone" : undefined,
  async rewrites() {
    if (!apiOrigin) return [];
    return { beforeFiles: [{ source: "/api/:path*", destination: `${apiOrigin}/api/:path*` }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;

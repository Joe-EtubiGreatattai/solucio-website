// Small helpers shared by the API routes.
import type { NextRequest } from "next/server";

export const clientIp = (req: NextRequest) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

export const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "Cache-Control": "no-store" } });

/** Changes from the front desk must come from this site's own pages. */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from older browsers may omit it; the SameSite cookie still applies
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

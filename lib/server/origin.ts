/** Requests that change things must come from this site: its own host, or one of the site addresses
 *  that pass requests through to this backend (ALLOWED_ORIGINS, comma separated). */
export function originAllowed(origin: string | null, host: string | null, allowed: string[]): boolean {
  if (!origin) return true; // same-origin requests from some browsers omit it; the SameSite cookie still applies
  let o: URL;
  try { o = new URL(origin); } catch { return false; }
  if (host && o.host === host) return true;
  return allowed.some((a) => a.replace(/\/+$/, "") === o.origin);
}

export const allowedOrigins = () => (process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

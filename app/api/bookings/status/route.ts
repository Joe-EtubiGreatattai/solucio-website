// GET /api/bookings/status?ref=BK-2026-00001&phone=0803... — a patient checks their own request.
import type { NextRequest } from "next/server";
import { allowRequest, findStatus } from "@/lib/server/bookings";
import { clientIp, json } from "@/lib/server/request";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref") || "";
  const phone = req.nextUrl.searchParams.get("phone") || "";
  try {
    if (!(await allowRequest(`status:${clientIp(req)}`, 20, 15 * 60_000))) return json({ error: "Too many checks. Try again later." }, 429);
    const found = await findStatus(ref, phone);
    if (!found) return json({ error: "We couldn’t find a request with that reference and phone number." }, 404);
    return json(found);
  } catch {
    return json({ error: "Status check is unavailable right now. Please call us." }, 503);
  }
}

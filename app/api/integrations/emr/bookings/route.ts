// EMR reception worklist reads the website's existing booking records through this key-protected API.
import type { NextRequest } from "next/server";
import { counts, listBookings } from "@/lib/server/bookings";
import { hasEmrKey } from "@/lib/server/integration-auth";
import { json } from "@/lib/server/request";

export async function GET(req: NextRequest) {
  if (!hasEmrKey(req)) return json({ error: "Not allowed" }, 401);
  const status = req.nextUrl.searchParams.get("status") || undefined;
  const q = req.nextUrl.searchParams.get("q") || undefined;
  const [items, totals] = await Promise.all([listBookings({ status, q }), counts()]);
  return json({ items, counts: totals });
}

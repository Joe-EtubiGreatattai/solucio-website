// GET /api/desk/bookings?status=&q= — the front desk's list of requests.
import type { NextRequest } from "next/server";
import { isDesk } from "@/lib/server/desk-auth";
import { counts, listBookings } from "@/lib/server/bookings";
import { json } from "@/lib/server/request";

export async function GET(req: NextRequest) {
  if (!(await isDesk())) return json({ error: "Sign in to the front desk" }, 401);
  const status = req.nextUrl.searchParams.get("status") || undefined;
  const q = req.nextUrl.searchParams.get("q") || undefined;
  const [items, totals] = await Promise.all([listBookings({ status, q }), counts()]);
  return json({ items, counts: totals });
}

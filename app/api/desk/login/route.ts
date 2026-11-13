// POST /api/desk/login {password} — front-desk sign-in. DELETE signs out.
import type { NextRequest } from "next/server";
import { passwordMatches } from "@/lib/server/session";
import { deskConfigured, endDeskSession, startDeskSession } from "@/lib/server/desk-auth";
import { allowRequest } from "@/lib/server/bookings";
import { clientIp, json, sameOrigin } from "@/lib/server/request";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return json({ error: "Not allowed" }, 403);
  if (!deskConfigured()) return json({ error: "The front desk isn’t set up yet (DESK_PASSWORD and DESK_SECRET)." }, 503);
  if (!(await allowRequest(`desk-login:${clientIp(req)}`, 10, 15 * 60_000))) return json({ error: "Too many attempts. Wait 15 minutes." }, 429);
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!passwordMatches(String(password ?? ""), process.env.DESK_PASSWORD!)) return json({ error: "Wrong password" }, 401);
  await startDeskSession();
  return json({ ok: true });
}

export async function DELETE() {
  await endDeskSession();
  return json({ ok: true });
}

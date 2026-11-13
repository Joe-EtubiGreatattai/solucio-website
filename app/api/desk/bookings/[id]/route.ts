// PATCH /api/desk/bookings/:id {action, ...} — contact, confirm, complete, cancel or note a request.
import type { NextRequest } from "next/server";
import { isDesk } from "@/lib/server/desk-auth";
import { BookingError, updateBooking, type DeskAction } from "@/lib/server/bookings";
import { messagesFor } from "@/lib/server/mail-templates";
import { mailOptions, sendAll } from "@/lib/server/mail";
import { json, sameOrigin } from "@/lib/server/request";

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/desk/bookings/[id]">) {
  if (!sameOrigin(req)) return json({ error: "Not allowed" }, 403);
  if (!(await isDesk())) return json({ error: "Sign in to the front desk" }, 401);
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as DeskAction & { by?: string; notify?: boolean };
  try {
    const by = String(body.by || "Front desk").slice(0, 60);
    const updated = await updateBooking(id, body, by);
    if (updated && body.notify !== false) await sendAll(messagesFor(body.action, updated, mailOptions()));
    return json(updated);
  } catch (err) {
    if (err instanceof BookingError) return json({ error: err.message }, err.status);
    throw err;
  }
}

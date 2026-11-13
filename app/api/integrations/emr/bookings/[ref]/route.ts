// EMR reception updates are applied to the booking record so patient status checks and emails stay in sync.
import type { NextRequest } from "next/server";
import { BookingError, updateBooking, type DeskAction } from "@/lib/server/bookings";
import { hasEmrKey } from "@/lib/server/integration-auth";
import { messagesFor } from "@/lib/server/mail-templates";
import { mailOptions, sendAll } from "@/lib/server/mail";
import { json } from "@/lib/server/request";

export async function PATCH(req: NextRequest, ctx: RouteContext<"/api/integrations/emr/bookings/[ref]">) {
  if (!hasEmrKey(req)) return json({ error: "Not allowed" }, 401);
  const { ref } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as DeskAction;
  try {
    const updated = await updateBooking(ref, body, "EMR reception");
    if (updated) await sendAll(messagesFor(body.action, updated, mailOptions()));
    return json(updated, updated ? 200 : 404);
  } catch (err) {
    if (err instanceof BookingError) return json({ error: err.message }, err.status);
    throw err;
  }
}

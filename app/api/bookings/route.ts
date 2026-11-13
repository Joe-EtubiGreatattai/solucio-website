// POST /api/bookings — a patient asks for an appointment from the website.
import type { NextRequest } from "next/server";
import { departments } from "@/lib/data/departments";
import { validateBooking } from "@/lib/booking-rules";
import { allowRequest, createBooking } from "@/lib/server/bookings";
import { messagesFor } from "@/lib/server/mail-templates";
import { mailOptions, sendAll } from "@/lib/server/mail";
import { clientIp, json } from "@/lib/server/request";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return json({ error: "Send the form as JSON" }, 400);
  const v = validateBooking(body, departments.map((d) => d.name));
  if (!v.ok) {
    // Bots get a normal-looking answer so they don't learn anything
    if (v.bot) return json({ ref: "BK-0000-00000" }, 201);
    return json({ error: "Please check these details", fields: v.errors }, 400);
  }
  const ip = clientIp(req);
  try {
    if (!(await allowRequest(`book:${ip}`, 5, 15 * 60_000))) {
      return json({ error: "Too many requests from your connection. Please call us instead." }, 429);
    }
    const booking = await createBooking(v.data, { ip });
    await sendAll(messagesFor("requested", booking, mailOptions()));
    return json({ ref: booking.ref, emailed: Boolean(process.env.SMTP_HOST) }, 201);
  } catch (err) {
    console.error("[bookings] could not save request:", (err as Error).message);
    return json({ error: "We couldn’t save your request just now. Please call or WhatsApp us." }, 503);
  }
}

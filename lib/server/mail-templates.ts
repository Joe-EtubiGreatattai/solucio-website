// Email wording for appointment requests. Pure, so it can be tested without sending anything.
import { slotLabel } from "../booking-rules.ts";

type B = { ref: string; fullName: string; phone: string; email: string; department: string; specialist?: string; date: string; timeSlot: string; reason: string; confirmed?: { date: string; timeSlot: string } | null; cancelReason?: string };
export type Message = { to: string; subject: string; text: string; html: string };
type Opts = { clinicEmail: string; siteUrl: string };

const CLINIC = "Solucio Specialist Clinic";
const PHONE = "0706 681 9213";
const longDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const first = (n: string) => n.split(" ")[0];

function message(to: string, subject: string, lines: string[]): Message {
  const text = lines.join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#202722;max-width:560px">${lines
    .map((l) => (l ? `<p style="margin:0 0 10px">${esc(l)}</p>` : ""))
    .join("")}<p style="margin-top:24px;color:#6b756f;font-size:12px">${CLINIC}</p></div>`;
  return { to, subject, text, html };
}

/** Which emails to send for an event. Empty when nothing needs sending. */
export function messagesFor(event: "requested" | "confirm" | "cancel" | string, b: B, opts: Opts): Message[] {
  const statusLink = opts.siteUrl ? `Check your request any time: ${opts.siteUrl}/book/status (reference ${b.ref} and your phone number).` : "";
  if (event === "requested") {
    const out = [
      message(b.email, `We received your appointment request (${b.ref})`, [
        `Dear ${first(b.fullName)},`,
        `Thank you. We received your request to see ${b.department} on ${longDate(b.date)}, ${slotLabel(b.timeSlot).toLowerCase()}.`,
        `Our front desk will call you on ${b.phone} to confirm the exact time. This request is not yet a confirmed appointment.`,
        `Your reference is ${b.ref}.`,
        statusLink,
        `For an emergency, call ${PHONE} at any time.`,
      ]),
    ];
    if (opts.clinicEmail) {
      out.push(message(opts.clinicEmail, `New appointment request ${b.ref}: ${b.department}`, [
        `New request from the website.`,
        `Patient: ${b.fullName}`,
        `Phone: ${b.phone}`,
        `Email: ${b.email}`,
        `Department: ${b.department}${b.specialist ? ` (asked for ${b.specialist})` : ""}`,
        `Preferred: ${longDate(b.date)}, ${slotLabel(b.timeSlot)}`,
        `Reason: ${b.reason}`,
        opts.siteUrl ? `Open the front desk: ${opts.siteUrl}/desk` : "",
      ]));
    }
    return out;
  }
  if (event === "confirm" && b.confirmed) {
    return [message(b.email, `Your appointment is confirmed (${b.ref})`, [
      `Dear ${first(b.fullName)},`,
      `Your ${b.department} appointment is confirmed for ${longDate(b.confirmed.date)}, ${slotLabel(b.confirmed.timeSlot)}.`,
      `Please arrive 15 minutes early and bring any previous results or medication you take. If you have an HMO, bring your card.`,
      `To change or cancel, call ${PHONE} and quote ${b.ref}.`,
    ])];
  }
  if (event === "cancel") {
    return [message(b.email, `Your appointment request was cancelled (${b.ref})`, [
      `Dear ${first(b.fullName)},`,
      `Your ${b.department} appointment request (${b.ref}) has been cancelled.${b.cancelReason ? ` Reason: ${b.cancelReason}` : ""}`,
      `To book again, visit our website or call ${PHONE}.`,
    ])];
  }
  return [];
}

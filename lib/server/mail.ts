// Sends email through SMTP when it's set up; otherwise logs, so nothing breaks without it.
import nodemailer from "nodemailer";
import type { Message } from "./mail-templates.ts";

let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (!process.env.SMTP_HOST) return null;
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  return transport;
}

/** Never throws: an email problem must not lose a patient's booking. */
export async function sendAll(messages: Message[]) {
  const t = getTransport();
  for (const m of messages) {
    if (!m.to) continue;
    if (!t) { console.log(`[mail] (not sent, SMTP not set up) to=${m.to} subject="${m.subject}"`); continue; }
    try {
      await t.sendMail({ from: process.env.MAIL_FROM || process.env.SMTP_USER, ...m });
    } catch (err) {
      console.error(`[mail] failed to=${m.to}: ${(err as Error).message}`);
    }
  }
}

export const mailOptions = () => ({
  clinicEmail: process.env.CLINIC_EMAIL || "",
  siteUrl: (process.env.SITE_URL || "").replace(/\/+$/, ""),
});

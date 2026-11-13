// GET /api/desk/session — is this browser signed in to the front desk? (Answered by the backend,
// so the website itself never needs the desk password or secret.)
import { deskConfigured, isDesk } from "@/lib/server/desk-auth";
import { json } from "@/lib/server/request";

export async function GET() {
  return json({ configured: deskConfigured(), signedIn: await isDesk(), emailOn: Boolean(process.env.SMTP_HOST) });
}

import { json } from "@/lib/server/request";

export function GET() {
  return json({ ok: true });
}

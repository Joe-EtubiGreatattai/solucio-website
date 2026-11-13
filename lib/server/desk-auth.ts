// Front-desk sign-in: one shared password (DESK_PASSWORD) and a signed cookie (DESK_SECRET).
import { cookies } from "next/headers";
import { signSession, verifySession } from "./session.ts";

export const DESK_COOKIE = "solucio_desk";
const TTL = 12 * 3600;

export const deskConfigured = () => Boolean(process.env.DESK_PASSWORD && (process.env.DESK_SECRET || "").length >= 32);

export async function isDesk(): Promise<boolean> {
  if (!deskConfigured()) return false;
  const jar = await cookies();
  return verifySession(jar.get(DESK_COOKIE)?.value, process.env.DESK_SECRET!);
}

export async function startDeskSession() {
  const jar = await cookies();
  jar.set(DESK_COOKIE, signSession(process.env.DESK_SECRET!, new Date(), TTL), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: TTL,
  });
}

export async function endDeskSession() {
  (await cookies()).delete(DESK_COOKIE);
}

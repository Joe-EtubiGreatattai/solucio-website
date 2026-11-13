// Front-desk sign-in token: "<expiry ms>.<HMAC>". Stateless, so it works on serverless hosting.
import crypto from "node:crypto";

const mac = (secret: string, payload: string) => crypto.createHmac("sha256", secret).update(payload).digest("base64url");

export function signSession(secret: string, now = new Date(), ttlSeconds = 12 * 3600): string {
  const exp = String(now.getTime() + ttlSeconds * 1000);
  return `${exp}.${mac(secret, exp)}`;
}

export function verifySession(token: string | undefined, secret: string, now = new Date()): boolean {
  if (!token || !secret) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  const expected = Buffer.from(mac(secret, exp));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return false;
  return Number(exp) > now.getTime();
}

/** Compares a typed password with the configured one without leaking timing. */
export function passwordMatches(given: string, expected: string): boolean {
  if (!expected) return false;
  const a = crypto.createHash("sha256").update(String(given)).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

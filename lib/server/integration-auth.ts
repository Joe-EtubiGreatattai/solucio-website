import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export function hasEmrKey(req: NextRequest): boolean {
  const expected = process.env.EMR_INTEGRATION_KEY || "";
  const provided = req.headers.get("x-integration-key") || "";
  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  if (expectedBytes.length < 32 || providedBytes.length !== expectedBytes.length) return false;
  return timingSafeEqual(providedBytes, expectedBytes);
}

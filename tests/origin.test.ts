import { test } from "node:test";
import assert from "node:assert/strict";
import { originAllowed } from "../lib/server/origin.ts";

test("same host is allowed; listed site origins are allowed; others are refused", () => {
  assert.equal(originAllowed("https://api.example.test", "api.example.test", []), true);
  assert.equal(originAllowed("https://solucio-website.vercel.app", "api.example.test", ["https://solucio-website.vercel.app"]), true);
  assert.equal(originAllowed("https://evil.example", "api.example.test", ["https://solucio-website.vercel.app"]), false);
  assert.equal(originAllowed("not a url", "api.example.test", []), false);
  assert.equal(originAllowed(null, "api.example.test", []), true);
});

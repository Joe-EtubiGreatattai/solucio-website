import { test } from "node:test";
import assert from "node:assert/strict";
import { formatRef, lagosToday, normalisePhone, TIME_SLOTS, validateBooking } from "../lib/booking-rules.ts";
import { signSession, verifySession } from "../lib/server/session.ts";

const DEPTS = ["General Surgery", "Ophthalmology"];
const NOW = new Date("2026-11-13T10:00:00Z"); // Friday
const good = {
  fullName: "Ada Obi", phone: "0803 123 4567", email: "ada@example.com", department: "Ophthalmology",
  specialist: "", date: "2026-11-16", timeSlot: "morning", reason: "Blurry vision for two weeks", website: "",
};

test("a complete request is accepted and cleaned up", () => {
  const r = validateBooking({ ...good, fullName: "  Ada   Obi " }, DEPTS, NOW);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.data.fullName, "Ada Obi");
    assert.equal(r.data.phone, "+2348031234567");
    assert.equal(r.data.timeSlot, "morning");
  }
});

test("each field is checked with a message a patient understands", () => {
  const r = validateBooking({ ...good, fullName: "A", phone: "12", email: "nope", department: "Cardiology", reason: "hi", timeSlot: "midnight" }, DEPTS, NOW);
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["department", "email", "fullName", "phone", "reason", "timeSlot"]);
});

test("dates: not in the past, not on Sunday, not more than 6 months ahead, today is fine", () => {
  const bad = (date: string) => { const r = validateBooking({ ...good, date }, DEPTS, NOW); return r.ok ? null : r.errors.date; };
  assert.match(bad("2026-11-12")!, /past/);
  assert.match(bad("2026-11-15")!, /Sunday/);
  assert.match(bad("2027-06-01")!, /6 months/);
  assert.match(bad("13/11/2026")!, /date/);
  assert.equal(bad("2026-11-13"), null);
});

test("a filled-in hidden field marks the request as a bot", () => {
  const r = validateBooking({ ...good, website: "http://spam" }, DEPTS, NOW);
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.bot, true);
});

test("phone numbers in Nigerian formats become one form", () => {
  for (const p of ["08031234567", "+234 803 123 4567", "2348031234567", "803-123-4567"]) assert.equal(normalisePhone(p), "+2348031234567");
  assert.equal(normalisePhone("+44 20 7946 0958"), "+442079460958");
  assert.equal(normalisePhone("123"), null);
});

test("references and Lagos dates", () => {
  assert.equal(formatRef(2026, 42), "BK-2026-00042");
  assert.equal(lagosToday(new Date("2026-11-13T23:30:00Z")), "2026-11-14");
  assert.equal(TIME_SLOTS.length, 3);
});

test("front-desk session tokens expire and can't be forged", () => {
  const t = signSession("secret-1", NOW, 60);
  assert.equal(verifySession(t, "secret-1", NOW), true);
  assert.equal(verifySession(t, "secret-2", NOW), false);
  assert.equal(verifySession(t, "secret-1", new Date(NOW.getTime() + 61_000)), false);
  assert.equal(verifySession(t.replace(/^\d+/, "9999999999999"), "secret-1", NOW), false);
  assert.equal(verifySession("", "secret-1", NOW), false);
});

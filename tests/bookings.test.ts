// Runs against the local MongoDB, in a throwaway database.
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

process.env.MONGODB_URI = `mongodb://127.0.0.1:27017/website_test_${crypto.randomBytes(4).toString("hex")}`;
const { getDb, closeDb } = await import("../lib/server/db.ts");
const { allowRequest, createBooking, findStatus, listBookings, updateBooking } = await import("../lib/server/bookings.ts");

const data = { fullName: "Ada Obi", phone: "+2348031234567", email: "ada@example.com", department: "Ophthalmology", specialist: "", date: "2026-11-16", timeSlot: "morning" as const, reason: "Blurry vision" };

before(async () => { await getDb(); });
after(async () => { await (await getDb()).dropDatabase(); await closeDb(); });
beforeEach(async () => { const db = await getDb(); await Promise.all((await db.collections()).map((c) => c.deleteMany({}))); });

test("a new request gets the next reference and starts as new", async () => {
  const a = await createBooking(data, { ip: "1.1.1.1" });
  const b = await createBooking(data, { ip: "1.1.1.1" });
  assert.match(a.ref, /^BK-\d{4}-00001$/);
  assert.match(b.ref, /^BK-\d{4}-00002$/);
  assert.equal(a.status, "new");
});

test("the desk confirms a request with the actual slot; the history records it", async () => {
  const b = await createBooking(data, {});
  const c = await updateBooking(b._id.toString(), { action: "confirm", date: "2026-11-17", timeSlot: "afternoon", note: "Dr Eze" }, "Front desk");
  assert.equal(c!.status, "confirmed");
  assert.equal(c!.confirmed!.date, "2026-11-17");
  assert.equal(c!.history.at(-1)!.action, "confirm");
});

test("cancel needs a reason; finished requests can't be changed", async () => {
  const b = await createBooking(data, {});
  await assert.rejects(updateBooking(b._id.toString(), { action: "cancel", reason: "" }, "Desk"), /reason/i);
  await updateBooking(b._id.toString(), { action: "cancel", reason: "Patient asked" }, "Desk");
  await assert.rejects(updateBooking(b._id.toString(), { action: "confirm", date: "2026-11-17", timeSlot: "morning" }, "Desk"), /cancelled/i);
});

test("list filters by status and searches name, phone and reference", async () => {
  const a = await createBooking(data, {});
  await createBooking({ ...data, fullName: "Bayo Ade", phone: "+2348055550000" }, {});
  await updateBooking(a._id.toString(), { action: "contacted" }, "Desk");
  assert.equal((await listBookings({ status: "new" })).length, 1);
  assert.equal((await listBookings({ q: "bayo" })).length, 1);
  assert.equal((await listBookings({ q: "08055550000" })).length, 1);
  assert.equal((await listBookings({ q: a.ref })).length, 1);
});

test("patients can check status with reference + phone; wrong phone tells nothing", async () => {
  const b = await createBooking(data, {});
  const s = await findStatus(b.ref, "0803 123 4567");
  assert.equal(s!.status, "new");
  assert.equal((s as Record<string, unknown>).email, undefined);
  assert.equal(await findStatus(b.ref, "08099999999"), null);
});

test("rate limit: 5 requests per window per key", async () => {
  const results = [];
  for (let i = 0; i < 6; i++) results.push(await allowRequest("ip:9.9.9.9", 5, 60_000));
  assert.deepEqual(results, [true, true, true, true, true, false]);
  assert.equal(await allowRequest("ip:8.8.8.8", 5, 60_000), true);
});

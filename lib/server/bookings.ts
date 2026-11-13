// Appointment requests from the website, and what the front desk does with them.
import { ObjectId } from "mongodb";
import { getDb } from "./db.ts";
import { formatRef, normalisePhone, TIME_SLOTS, type BookingData, type TimeSlotId } from "../booking-rules.ts";

export const STATUSES = ["new", "contacted", "confirmed", "completed", "cancelled"] as const;
export type Status = (typeof STATUSES)[number];
export type HistoryEntry = { at: Date; by: string; action: string; note?: string };
export type Booking = BookingData & {
  _id: ObjectId; ref: string; status: Status; createdAt: Date; updatedAt: Date; ip?: string;
  confirmed?: { date: string; timeSlot: TimeSlotId }; cancelReason?: string; notes?: string; history: HistoryEntry[];
};
export type DeskAction =
  | { action: "contacted"; note?: string }
  | { action: "confirm"; date: string; timeSlot: string; note?: string }
  | { action: "complete"; note?: string }
  | { action: "cancel"; reason: string }
  | { action: "note"; note: string };

export class BookingError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

let indexed = false;
async function bookings() {
  const db = await getDb();
  const col = db.collection<Booking>("bookings");
  if (!indexed) {
    indexed = true;
    await Promise.all([
      col.createIndex({ ref: 1 }, { unique: true }),
      col.createIndex({ status: 1, createdAt: -1 }),
      db.collection("ratelimits").createIndex({ at: 1 }, { expireAfterSeconds: 3600 }),
    ]);
  }
  return col;
}

async function nextRef(): Promise<string> {
  const db = await getDb();
  const year = new Date().getFullYear();
  const c = await db.collection<{ _id: string; seq: number }>("counters").findOneAndUpdate(
    { _id: `booking-${year}` }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" },
  );
  return formatRef(year, c!.seq);
}

export async function createBooking(data: BookingData, meta: { ip?: string }): Promise<Booking> {
  const col = await bookings();
  const now = new Date();
  const doc = {
    ...data, ref: await nextRef(), status: "new" as Status, createdAt: now, updatedAt: now, ip: meta.ip,
    history: [{ at: now, by: "Patient (website)", action: "requested" }],
  };
  const r = await col.insertOne(doc as Booking);
  return { ...doc, _id: r.insertedId } as Booking;
}

/** Simple sliding window per key (e.g. an IP address), stored in MongoDB so it works on serverless hosting. */
export async function allowRequest(key: string, max: number, windowMs: number): Promise<boolean> {
  await bookings(); // makes sure the TTL index exists
  const col = (await getDb()).collection<{ key: string; at: Date }>("ratelimits");
  const since = new Date(Date.now() - windowMs);
  if ((await col.countDocuments({ key, at: { $gte: since } })) >= max) return false;
  await col.insertOne({ key, at: new Date() });
  return true;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function listBookings({ status, q, limit = 200 }: { status?: string; q?: string; limit?: number }) {
  const col = await bookings();
  const where: Record<string, unknown> = {};
  if (status && STATUSES.includes(status as Status)) where.status = status;
  const text = String(q ?? "").trim();
  if (text) {
    const phone = normalisePhone(text);
    const rx = new RegExp(escape(text), "i");
    where.$or = [{ fullName: rx }, { ref: rx }, { email: rx }, ...(phone ? [{ phone }] : [])];
  }
  return col.find(where, { projection: { ip: 0 } }).sort({ createdAt: -1 }).limit(limit).toArray();
}

export async function counts() {
  const col = await bookings();
  const rows = await col.aggregate<{ _id: Status; n: number }>([{ $group: { _id: "$status", n: { $sum: 1 } } }]).toArray();
  return Object.fromEntries(STATUSES.map((s) => [s, rows.find((r) => r._id === s)?.n ?? 0])) as Record<Status, number>;
}

export async function updateBooking(id: string, change: DeskAction, by: string): Promise<Booking | null> {
  const col = await bookings();
  const b = ObjectId.isValid(id)
    ? await col.findOne({ _id: new ObjectId(id) })
    : await col.findOne({ ref: String(id).trim().toUpperCase() });
  if (!b) throw new BookingError("Request not found", 404);
  if (b.status === "cancelled" && change.action !== "note") throw new BookingError("This request was cancelled", 409);
  if (b.status === "completed" && change.action !== "note") throw new BookingError("This visit is already completed", 409);

  const now = new Date();
  const set: Record<string, unknown> = { updatedAt: now };
  const entry: HistoryEntry = { at: now, by, action: change.action };
  switch (change.action) {
    case "contacted":
      if (b.status === "new") set.status = "contacted";
      entry.note = change.note;
      break;
    case "confirm": {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(change.date ?? "")) throw new BookingError("Choose the appointment date");
      if (!TIME_SLOTS.some((s) => s.id === change.timeSlot)) throw new BookingError("Choose the time of day");
      set.status = "confirmed";
      set.confirmed = { date: change.date, timeSlot: change.timeSlot };
      entry.note = change.note;
      break;
    }
    case "complete":
      set.status = "completed";
      entry.note = change.note;
      break;
    case "cancel":
      if (!String(change.reason ?? "").trim()) throw new BookingError("Give a reason for cancelling");
      set.status = "cancelled";
      set.cancelReason = change.reason.trim();
      entry.note = change.reason.trim();
      break;
    case "note":
      if (!String(change.note ?? "").trim()) throw new BookingError("Write a note");
      entry.note = change.note.trim();
      break;
    default:
      throw new BookingError("Unknown action");
  }
  return col.findOneAndUpdate({ _id: b._id }, { $set: set, $push: { history: entry } }, { returnDocument: "after" });
}

/** What a patient may see about their own request: reference + the phone they gave. */
export async function findStatus(ref: string, phone: string) {
  const p = normalisePhone(phone);
  if (!p || !/^BK-\d{4}-\d{5}$/i.test(String(ref).trim())) return null;
  const col = await bookings();
  const b = await col.findOne({ ref: String(ref).trim().toUpperCase(), phone: p });
  if (!b) return null;
  return { ref: b.ref, status: b.status, department: b.department, requested: { date: b.date, timeSlot: b.timeSlot }, confirmed: b.confirmed ?? null, firstName: b.fullName.split(" ")[0] };
}

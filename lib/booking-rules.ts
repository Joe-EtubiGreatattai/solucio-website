// Rules for an online appointment request. Pure functions: used by the API and its tests.

export const TIME_SLOTS = [
  { id: "morning", label: "Morning (8:00 AM – 12:00 PM)" },
  { id: "afternoon", label: "Afternoon (12:00 PM – 4:00 PM)" },
  { id: "evening", label: "Evening (4:00 PM – 8:00 PM)" },
] as const;
export type TimeSlotId = (typeof TIME_SLOTS)[number]["id"];
export const slotLabel = (id: string) => TIME_SLOTS.find((s) => s.id === id)?.label ?? id;

export type BookingInput = {
  fullName: string; phone: string; email: string; department: string; specialist?: string;
  date: string; timeSlot: string; reason: string; website?: string;
};
export type BookingData = Omit<BookingInput, "website" | "timeSlot"> & { timeSlot: TimeSlotId; specialist: string };
export type Validation = { ok: true; data: BookingData } | { ok: false; errors: Record<string, string>; bot?: boolean };

const LAGOS_MS = 60 * 60 * 1000; // Lagos is UTC+1 all year
/** Today's date in Lagos, YYYY-MM-DD. */
export const lagosToday = (now = new Date()) => new Date(now.getTime() + LAGOS_MS).toISOString().slice(0, 10);

/** +2348031234567 for Nigerian numbers in any common format; other international numbers kept with +. */
export function normalisePhone(raw: string): string | null {
  const hasPlus = String(raw ?? "").trim().startsWith("+");
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.startsWith("0") && d.length === 11) d = "234" + d.slice(1);
  else if (d.length === 10 && /^[789]/.test(d)) d = "234" + d;
  if (d.startsWith("234")) return d.length === 13 ? `+${d}` : null;
  if (hasPlus && d.length >= 8 && d.length <= 15) return `+${d}`;
  return null;
}

export const formatRef = (year: number, n: number) => `BK-${year}-${String(n).padStart(5, "0")}`;

const clean = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim();
const DAY = 86_400_000;

export function validateBooking(input: Partial<BookingInput>, departments: string[], now = new Date()): Validation {
  if (clean(input.website)) return { ok: false, errors: { form: "Request not accepted" }, bot: true };
  const errors: Record<string, string> = {};
  const fullName = clean(input.fullName);
  const email = clean(input.email).toLowerCase();
  const department = clean(input.department);
  const specialist = clean(input.specialist).slice(0, 100);
  const reason = String(input.reason ?? "").trim();
  const date = clean(input.date);
  const timeSlot = clean(input.timeSlot);
  const phone = normalisePhone(String(input.phone ?? ""));

  if (fullName.length < 3 || fullName.length > 100) errors.fullName = "Enter your full name";
  if (!phone) errors.phone = "Enter a phone number we can call, e.g. 0803 123 4567";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 200) errors.email = "Enter a valid email address";
  if (!departments.includes(department)) errors.department = "Choose a department from the list";
  if (reason.length < 5) errors.reason = "Tell us briefly why you’re coming in";
  else if (reason.length > 1000) errors.reason = "Please keep the reason under 1,000 characters";
  if (!TIME_SLOTS.some((s) => s.id === timeSlot)) errors.timeSlot = "Choose a time of day";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    errors.date = "Choose a date";
  } else {
    const today = lagosToday(now);
    const day = new Date(`${date}T00:00:00Z`);
    if (date < today) errors.date = "That date is in the past";
    else if (day.getUTCDay() === 0) errors.date = "We don’t hold consultations on Sunday. For emergencies, call us any time.";
    else if (day.getTime() - Date.parse(`${today}T00:00:00Z`) > 183 * DAY) errors.date = "Choose a date within the next 6 months";
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { fullName, phone: phone!, email, department, specialist, date, timeSlot: timeSlot as TimeSlotId, reason } };
}

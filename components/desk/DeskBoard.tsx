"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slotLabel, TIME_SLOTS } from "@/lib/booking-rules";

type Booking = {
  _id: string; ref: string; status: string; fullName: string; phone: string; email: string; department: string; specialist?: string;
  date: string; timeSlot: string; reason: string; createdAt: string; confirmed?: { date: string; timeSlot: string }; cancelReason?: string;
  history: { at: string; by: string; action: string; note?: string }[];
};
const TABS = [
  ["new", "New"], ["contacted", "Contacted"], ["confirmed", "Confirmed"], ["completed", "Completed"], ["cancelled", "Cancelled"], ["", "All"],
] as const;
const STATUS_STYLE: Record<string, string> = {
  new: "bg-accent-50 text-accent-800", contacted: "bg-warm-100 text-warm-900", confirmed: "bg-primary-100 text-primary-900",
  completed: "bg-warm-100 text-warm-800", cancelled: "bg-warm-100 text-warm-800 line-through",
};
const ACTION_WORD: Record<string, string> = { requested: "Requested online", contacted: "Contacted", confirm: "Confirmed", complete: "Completed", cancel: "Cancelled", note: "Note" };
const shortDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const when = (d: string) => new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const NAME_KEY = "solucio_desk_name";

export default function DeskBoard({ emailOn }: { emailOn: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<string>("new");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Booking[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => { try { setName(localStorage.getItem(NAME_KEY) || ""); } catch { /* private mode */ } }, []);
  const saveName = (v: string) => { setName(v); try { localStorage.setItem(NAME_KEY, v); } catch { /* ignore */ } };

  const load = useCallback(async () => {
    const res = await fetch(`/api/desk/bookings?status=${tab}&q=${encodeURIComponent(q)}`, { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    const data = await res.json();
    setItems(data.items || []);
    setCounts(data.counts || {});
    setLoading(false);
  }, [tab, q, router]);

  useEffect(() => {
    const t = setTimeout(load, q ? 250 : 0);
    const every = setInterval(load, 60_000); // new requests appear without reloading
    return () => { clearTimeout(t); clearInterval(every); };
  }, [load, q]);

  async function signOut() {
    await fetch("/api/desk/login", { method: "DELETE" });
    router.refresh();
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-overline">Front desk</p>
          <h1 className="text-4xl font-semibold tracking-tight text-primary-900">Appointment requests</h1>
          <p className="mt-1 text-sm text-warm-800">Call the patient, agree a time, then confirm it here. {emailOn ? "They’re emailed when you confirm or cancel." : "Email isn’t set up yet, so let the patient know by phone or WhatsApp."}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <label className="flex items-center gap-2 text-warm-800">Your name
            <input value={name} onChange={(e) => saveName(e.target.value)} placeholder="e.g. Grace" className="w-32 border border-primary-200 bg-white px-3 py-2" />
          </label>
          <button onClick={signOut} className="border border-primary-300 bg-white px-4 py-2 font-bold text-primary-900 hover:bg-primary-50">Sign out</button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {TABS.map(([value, label]) => (
          <button key={value} onClick={() => { setTab(value); setOpen(null); }}
            className={`px-4 py-2 text-sm font-bold border ${tab === value ? "bg-primary-800 text-white border-primary-800" : "bg-white text-warm-900 border-primary-200 hover:bg-primary-50"}`}>
            {label} <span className="ml-1 opacity-70">{value ? counts[value] ?? 0 : total}</span>
          </button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone or reference" aria-label="Search"
          className="ml-auto w-full sm:w-72 border border-primary-200 bg-white px-4 py-2 text-sm" />
      </div>

      {loading ? (
        <p className="py-16 text-center text-warm-800">Loading…</p>
      ) : !items.length ? (
        <p className="border border-primary-200 bg-white py-16 text-center text-warm-800">{q ? "Nothing matches your search." : tab === "new" ? "No new requests. New ones appear here by themselves." : "Nothing here."}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((b) => (
            <li key={b._id} className="border border-primary-200 bg-white">
              <button onClick={() => setOpen(open === b._id ? null : b._id)} className="grid w-full gap-2 px-5 py-4 text-left sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center hover:bg-warm-50">
                <span>
                  <span className="block font-bold text-primary-900">{b.fullName}</span>
                  <span className="block text-xs text-warm-800">{b.ref} · requested {when(b.createdAt)}</span>
                </span>
                <span className="text-sm">{b.department}</span>
                <span className="text-sm">
                  {b.confirmed ? <><b>{shortDate(b.confirmed.date)}</b> · {slotLabel(b.confirmed.timeSlot).split(" (")[0]}</> : <>Wants {shortDate(b.date)} · {slotLabel(b.timeSlot).split(" (")[0]}</>}
                </span>
                <span className={`justify-self-start px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${STATUS_STYLE[b.status]}`}>{b.status}</span>
              </button>
              {open === b._id && <Detail b={b} by={name || "Front desk"} emailOn={emailOn} onChanged={load} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Detail({ b, by, emailOn, onChanged }: { b: Booking; by: string; emailOn: boolean; onChanged: () => void }) {
  const [mode, setMode] = useState<"" | "confirm" | "cancel" | "note">("");
  const [date, setDate] = useState(b.confirmed?.date || b.date);
  const [slot, setSlot] = useState(b.confirmed?.timeSlot || b.timeSlot);
  const [text, setText] = useState("");
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const done = ["completed", "cancelled"].includes(b.status);

  async function act(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/desk/bookings/${b._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ by, notify, ...body }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error || "Couldn’t save");
    setMode("");
    setText("");
    onChanged();
  }

  const btn = "border border-primary-300 bg-white px-4 py-2 text-sm font-bold text-primary-900 hover:bg-primary-50 disabled:opacity-50";
  return (
    <div className="grid gap-6 border-t border-primary-100 px-5 py-5 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-3 text-sm">
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${b.phone}`} className="bg-primary-800 px-4 py-2 font-bold text-white hover:bg-primary-900">Call {b.phone}</a>
          <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={btn}>WhatsApp</a>
          <a href={`mailto:${b.email}`} className={btn}>Email</a>
        </div>
        <p><span className="text-warm-800">Reason:</span> {b.reason}</p>
        {b.specialist && <p><span className="text-warm-800">Asked for:</span> {b.specialist}</p>}
        <p><span className="text-warm-800">Email:</span> {b.email}</p>
        {b.cancelReason && <p><span className="text-warm-800">Cancelled:</span> {b.cancelReason}</p>}
        <ol className="mt-4 space-y-1.5 border-t border-warm-200 pt-3 text-xs text-warm-800">
          {b.history.map((h, i) => <li key={i}><b className="text-warm-900">{ACTION_WORD[h.action] || h.action}</b> · {when(h.at)} · {h.by}{h.note ? ` — ${h.note}` : ""}</li>)}
        </ol>
      </div>

      <div className="space-y-3">
        {!done && mode === "" && (
          <div className="flex flex-wrap gap-2">
            {b.status === "new" && <button disabled={busy} className={btn} onClick={() => act({ action: "contacted" })}>Mark contacted</button>}
            <button disabled={busy} className="bg-primary-800 px-4 py-2 text-sm font-bold text-white hover:bg-primary-900" onClick={() => setMode("confirm")}>{b.status === "confirmed" ? "Change time" : "Confirm"}</button>
            {b.status === "confirmed" && <button disabled={busy} className={btn} onClick={() => act({ action: "complete" })}>Patient came</button>}
            <button disabled={busy} className={btn} onClick={() => setMode("cancel")}>Cancel</button>
            <button disabled={busy} className={btn} onClick={() => setMode("note")}>Add note</button>
          </div>
        )}
        {done && mode === "" && <button className={btn} onClick={() => setMode("note")}>Add note</button>}

        {mode === "confirm" && (
          <div className="space-y-3 border border-primary-200 p-4">
            <p className="text-sm font-bold">Confirm the appointment</p>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-primary-200 px-3 py-2 text-sm" />
              <select value={slot} onChange={(e) => setSlot(e.target.value)} className="border border-primary-200 px-3 py-2 text-sm">
                {TIME_SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Note (optional), e.g. with Dr Eze" className="w-full border border-primary-200 px-3 py-2 text-sm" />
            {emailOn && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} /> Email the patient</label>}
            <div className="flex gap-2"><button disabled={busy} className="bg-primary-800 px-4 py-2 text-sm font-bold text-white" onClick={() => act({ action: "confirm", date, timeSlot: slot, note: text })}>Confirm</button><button className={btn} onClick={() => setMode("")}>Back</button></div>
          </div>
        )}
        {mode === "cancel" && (
          <div className="space-y-3 border border-primary-200 p-4">
            <p className="text-sm font-bold">Cancel this request</p>
            <input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Reason, e.g. patient asked to cancel" className="w-full border border-primary-200 px-3 py-2 text-sm" />
            {emailOn && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} /> Email the patient</label>}
            <div className="flex gap-2"><button disabled={busy || !text.trim()} className="bg-accent-700 px-4 py-2 text-sm font-bold text-white disabled:opacity-50" onClick={() => act({ action: "cancel", reason: text })}>Cancel request</button><button className={btn} onClick={() => setMode("")}>Back</button></div>
          </div>
        )}
        {mode === "note" && (
          <div className="space-y-3 border border-primary-200 p-4">
            <textarea autoFocus rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. No answer, will try again at 2pm" className="w-full border border-primary-200 px-3 py-2 text-sm" />
            <div className="flex gap-2"><button disabled={busy || !text.trim()} className="bg-primary-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-50" onClick={() => act({ action: "note", note: text, notify: false })}>Save note</button><button className={btn} onClick={() => setMode("")}>Back</button></div>
          </div>
        )}
        {error && <p role="alert" className="text-sm font-semibold text-accent-700">{error}</p>}
      </div>
    </div>
  );
}

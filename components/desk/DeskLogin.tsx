"use client";

import { useState, type FormEvent } from "react";

export default function DeskLogin({ configured, onSignedIn }: { configured: boolean; onSignedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/desk/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error || "Couldn’t sign in");
    onSignedIn();
  }

  return (
    <div className="mx-auto max-w-sm border border-primary-200 bg-white p-8">
      <p className="section-overline">Staff only</p>
      <h1 className="text-3xl font-semibold tracking-tight text-primary-900">Front desk</h1>
      <p className="mt-2 text-sm text-warm-800">Appointment requests from the website.</p>
      {!configured ? (
        <p className="mt-6 text-sm text-accent-700">Not set up yet. Add DESK_PASSWORD and DESK_SECRET (32+ characters) to the site’s environment variables.</p>
      ) : (
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <label className="block text-sm font-bold text-primary-900">Password
            <input type="password" autoFocus required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border-2 border-primary-200 bg-white px-4 py-3 text-base" />
          </label>
          {error && <p role="alert" className="text-sm font-semibold text-accent-700">{error}</p>}
          <button disabled={busy} className="w-full bg-primary-800 px-6 py-3 font-bold text-white hover:bg-primary-900 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
        </form>
      )}
    </div>
  );
}

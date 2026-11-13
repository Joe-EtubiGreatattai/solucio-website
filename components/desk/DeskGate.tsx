"use client";

import { useCallback, useEffect, useState } from "react";
import DeskBoard from "./DeskBoard";
import DeskLogin from "./DeskLogin";

type Session = { configured: boolean; signedIn: boolean; emailOn: boolean };

export default function DeskGate() {
  const [s, setS] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const check = useCallback(async () => {
    try {
      const res = await fetch("/api/desk/session", { cache: "no-store" });
      setS(await res.json());
      setError("");
    } catch {
      setError("The front desk can’t reach the server. Check your connection and reload.");
    }
  }, []);
  useEffect(() => { check(); }, [check]);

  if (error) return <p className="py-16 text-center text-accent-700">{error}</p>;
  if (!s) return <p className="py-16 text-center text-warm-800">Loading…</p>;
  return s.signedIn ? <DeskBoard emailOn={s.emailOn} onSignedOut={check} /> : <DeskLogin configured={s.configured} onSignedIn={check} />;
}

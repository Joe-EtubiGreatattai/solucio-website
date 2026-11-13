import { test } from "node:test";
import assert from "node:assert/strict";
import { messagesFor } from "../lib/server/mail-templates.ts";

const b = { ref: "BK-2026-00007", fullName: "Ada Obi", phone: "+2348031234567", email: "ada@example.com", department: "Ophthalmology", specialist: "", date: "2026-11-16", timeSlot: "morning", reason: "Blurry <b>vision</b>", confirmed: { date: "2026-11-17", timeSlot: "afternoon" }, cancelReason: "Doctor away" };

test("a new request emails the patient a receipt and the clinic an alert", () => {
  const [patient, clinic] = messagesFor("requested", b, { clinicEmail: "desk@solucio.test", siteUrl: "https://x.test" });
  assert.equal(patient.to, "ada@example.com");
  assert.match(patient.subject, /BK-2026-00007/);
  assert.match(patient.text, /Monday, 16 November 2026/);
  assert.match(patient.text, /https:\/\/x\.test\/book\/status/);
  assert.equal(clinic.to, "desk@solucio.test");
  assert.match(clinic.text, /\+2348031234567/);
  assert.doesNotMatch(clinic.html, /<b>vision/, "patient text is escaped in HTML");
});

test("no clinic address → only the patient is emailed", () => {
  assert.equal(messagesFor("requested", b, { clinicEmail: "", siteUrl: "" }).length, 1);
});

test("confirmation shows the confirmed slot, cancellation the reason", () => {
  const [c] = messagesFor("confirm", b, { clinicEmail: "", siteUrl: "" });
  assert.match(c.text, /Tuesday, 17 November 2026/);
  assert.match(c.text, /Afternoon/);
  const [x] = messagesFor("cancel", b, { clinicEmail: "", siteUrl: "" });
  assert.match(x.text, /Doctor away/);
  assert.equal(messagesFor("note", b, { clinicEmail: "", siteUrl: "" }).length, 0);
});

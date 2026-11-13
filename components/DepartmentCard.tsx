"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Department } from "@/lib/data/departments";

const PREVIEW = 4;

export default function DepartmentCard({ department, index }: { department: Department; index: number }) {
  const [open, setOpen] = useState(false);
  const count = department.services.length;
  const bookHref = `/book?department=${encodeURIComponent(department.name)}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <article className="dept-card">
        <div className="dept-card__top">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{count > 0 ? `${count} procedure${count === 1 ? "" : "s"}` : "Consultant-led"}</span>
        </div>

        <h3>{department.name}</h3>
        <p className="dept-card__summary">{department.summary}</p>

        {count > 0 ? (
          <ul className="dept-card__services">
            {department.services.slice(0, PREVIEW).map((service) => (
              <li key={service} title={service}>{service}</li>
            ))}
            {count > PREVIEW && (
              <li className="dept-card__more">
                <button type="button" onClick={() => setOpen(true)}>+ {count - PREVIEW} more</button>
              </li>
            )}
          </ul>
        ) : (
          <p className="dept-card__note">Treatment is planned with the consultant at your first visit.</p>
        )}

        <div className="dept-card__actions">
          {count > 0 ? (
            <button type="button" onClick={() => setOpen(true)}>
              All procedures <span>→</span>
            </button>
          ) : (
            <span />
          )}
          <Link href={bookHref}>
            Book visit <span>↗</span>
          </Link>
        </div>
      </article>

      {open && (
        <div className="dept-modal" role="dialog" aria-modal="true" aria-labelledby={`dept-${department.slug}`} onClick={() => setOpen(false)}>
          <div className="dept-modal__panel" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="dept-modal__close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            <span className="section-overline">{count} procedures</span>
            <h3 id={`dept-${department.slug}`}>{department.name}</h3>
            <p className="dept-modal__summary">{department.summary}</p>
            <ol className="dept-modal__list">
              {department.services.map((service, i) => (
                <li key={service}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {service}
                </li>
              ))}
            </ol>
            <div className="dept-modal__actions">
              <button type="button" onClick={() => setOpen(false)}>Close</button>
              <Link href={bookHref} className="reference-button dept-modal__book" onClick={() => setOpen(false)}>
                BOOK A VISIT <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

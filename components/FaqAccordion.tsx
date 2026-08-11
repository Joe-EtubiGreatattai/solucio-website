"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/data/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-primary-100 rounded-2xl border border-primary-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-primary-900">{item.question}</span>
              <span className="text-primary-700 text-xl leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="px-6 pb-5 text-warm-900/70 leading-relaxed">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

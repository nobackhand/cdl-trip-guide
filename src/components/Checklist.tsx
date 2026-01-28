"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";

const items = [
  { id: "hotel", label: "Book La Quinta Uptown" },
  { id: "tickets", label: "CDL tickets purchased" },
  { id: "uber", label: "Uber app ready" },
  { id: "jacket", label: "Jacket for 55\u00b0F weather" },
  { id: "charger", label: "Charger / battery pack" },
  { id: "id", label: "ID + cash for bars" },
];

export default function Checklist() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(
    "cdl_checklist",
    {}
  );

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section id="checklist" className="my-5">
      <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
        {"\u2705"} Trip Checklist
      </h2>
      <div className="section-divider" />
      <div className="rounded-xl border-l-4 border-cod-green glass-card p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2.5 border-b border-cod-dark2 py-2.5 last:border-b-0"
          >
            <button
              onClick={() => toggle(item.id)}
              className={`flex h-[22px] w-[22px] shrink-0 cursor-pointer items-center justify-center rounded border-2 border-cod-green text-[14px] font-bold text-white ${
                checked[item.id] ? "bg-cod-green" : "bg-transparent"
              }`}
            >
              {checked[item.id] ? "\u2713" : ""}
            </button>
            <span
              className={`flex-1 text-[13px] ${
                checked[item.id]
                  ? "text-cod-gray line-through"
                  : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

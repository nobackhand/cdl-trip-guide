export default function CostSplitter() {
  const costs = [
    { icon: "\ud83c\udfe8", label: "Hotel (2 nights)", value: "$236" },
    { icon: "\ud83c\udd7f\ufe0f", label: "Parking", value: "FREE", isFree: true },
    { icon: "\ud83d\ude97", label: "Uber (est. 4 trips)", value: "~$40" },
  ];

  return (
    <section id="splitter" className="my-5">
      <h2 className="cdl-section-header">
        {"\ud83d\udcb0"} Trip Cost Splitter
      </h2>
      <div className="section-divider" />
      <div className="rounded-sm glass-card p-4">
        <div className="mb-4 text-center">
          <div className="text-[11px] text-cod-gray">TOTAL TRIP COST (Est.)</div>
          <div className="text-[42px] font-bold text-cod-lime text-glow text-shadow-subtle">$276</div>
        </div>
        {costs.map((c) => (
          <div
            key={c.label}
            className="flex justify-between border-b border-cod-dark2 py-2 text-[13px] last:border-b-0"
          >
            <span className="text-cod-gray">
              {c.icon} {c.label}
            </span>
            <span className={`font-semibold ${c.isFree ? "text-cod-lime" : ""}`}>
              {c.value}
            </span>
          </div>
        ))}
        <div className="mt-3 rounded-sm bg-cod-green/80 p-3 text-center">
          <div className="text-[11px] opacity-90">PER PERSON (2 people)</div>
          <div className="text-[24px] font-bold">$138</div>
        </div>
      </div>
      <div className="mt-2 text-center text-[10px] text-cod-gray">
        * Excludes food, drinks, tickets, merch
      </div>
    </section>
  );
}

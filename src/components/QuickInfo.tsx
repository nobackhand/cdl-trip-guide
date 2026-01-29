import WeatherCard from "@/components/WeatherCard";

export default function QuickInfo() {
  return (
    <section id="info" className="my-5">
      <h2 className="cdl-section-header">
        {"\u2139\ufe0f"} Quick Info
      </h2>
      <div className="section-divider" />

      <div className="grid grid-cols-2 gap-2.5">
        <WeatherCard />

        {/* Emergency */}
        <div className="rounded-sm border-l-4 border-cod-green glass-card p-4">
          <div className="mb-2 text-[10px] text-cod-gray">EMERGENCY</div>
          <div className="text-[12px]">
            <a
              href="tel:911"
              className="mb-1 block text-cod-red no-underline"
            >
              {"\ud83d\udea8"} 911
            </a>
            <a
              href="tel:2148231800"
              className="block text-[11px] text-white no-underline"
            >
              {"\ud83c\udfe8"} Hotel: (214) 823-1800
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

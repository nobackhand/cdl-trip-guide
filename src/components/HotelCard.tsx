"use client";

import { useState } from "react";
import { LINKS } from "@/lib/constants";

export default function HotelCard() {
  const [otherOpen, setOtherOpen] = useState(false);

  return (
    <section id="hotel" className="my-5">
      <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
        {"\ud83c\udfe8"} Hotel
      </h2>
      <div className="section-divider" />

      {/* Recommended */}
      <div className="mb-2.5 rounded-xl border border-cod-lime/50 glass-card card-lift p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[15px] font-bold">La Quinta Dallas Uptown</span>
          <span className="rounded bg-cod-lime px-2 py-0.5 text-[9px] font-bold uppercase text-cod-black">
            Best Value
          </span>
        </div>
        <div className="mb-2 text-[12px] text-cod-gray">
          Budget-friendly on US-75. Walk to Knox bars, $10 Uber to venue.
        </div>
        <div className="text-[22px] font-bold text-cod-lime text-glow">
          $236 <span className="text-[11px] font-normal text-cod-gray">total (2 nights)</span>
        </div>
        <div className="mt-2.5 text-[12px] text-cod-lime">
          <div>{"\u2713"} FREE parking & breakfast</div>
          <div>{"\u2713"} Walk to Knox-Henderson (0.5 mi)</div>
          <div>{"\u2713"} $10 Uber to venue (1.7 mi)</div>
        </div>
        <a
          href={LINKS.hotelMap}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center gap-2.5 rounded-lg glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
        >
          <span className="w-7 text-center text-[18px]">{"\ud83d\udccd"}</span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Open in Maps</div>
            <div className="text-[10px] text-cod-gray">4440 N Central Expressway</div>
          </div>
          <span className="text-cod-gray">{"\u2192"}</span>
        </a>
      </div>

      {/* Other Options */}
      <div className="rounded-xl border-l-4 border-cod-green glass-card p-4">
        <button
          onClick={() => setOtherOpen(!otherOpen)}
          className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent text-white"
        >
          <span className="text-[15px] font-bold">Other Options</span>
          <span className="text-cod-gray">{otherOpen ? "\u25b2" : "\u25bc"}</span>
        </button>
        {otherOpen && (
          <div className="mt-3 border-t border-cod-dark2 pt-3 text-[12px]">
            <div className="mb-2.5">
              <strong className="text-cod-yellow">Canopy by Hilton Uptown - $710</strong>
              <div className="text-cod-gray">Bougie rooftop vibes. $790 with parking.</div>
            </div>
            <div>
              <strong className="text-cod-yellow">Kimpton Pittman (Deep Ellum) - $520</strong>
              <div className="text-cod-gray">Party central, walk to 30+ venues.</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { LocationAnalysis } from "@/lib/location-tips";

interface DynamicHotelCardProps {
  locationAnalysis: LocationAnalysis;
}

export default function DynamicHotelCard({
  locationAnalysis,
}: DynamicHotelCardProps) {
  const { locationName, neighborhood, tips, proTip, coordinates } =
    locationAnalysis;

  // Build Google Maps link for user's location
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  return (
    <section className="my-5">
      <h2 className="cdl-section-header">{"\u{1F4CD}"} Your Location</h2>
      <div className="section-divider" />

      <div className="rounded-sm border border-cod-lime/50 glass-card p-4">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[15px] font-bold">{locationName}</span>
          {neighborhood && (
            <span className="rounded-sm bg-cod-lime/20 px-2 py-0.5 text-[9px] text-cod-lime">
              {neighborhood}
            </span>
          )}
        </div>

        {/* Generated Tips */}
        <div className="space-y-1.5 text-[12px] text-cod-lime">
          {tips.slice(0, 5).map((tip, i) => (
            <div key={i}>
              {tip.icon} {tip.text}
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-3 rounded-sm border border-cod-lime/30 bg-cod-lime/10 p-3">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-cod-lime">
            {"\u{1F4A1}"} Pro Tip
          </div>
          <div className="text-[12px] text-white">{proTip}</div>
        </div>

        {/* Open in Maps button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2.5 rounded-sm glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
        >
          <span className="w-7 text-center text-[18px]">{"\u{1F4CD}"}</span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Open in Maps</div>
            <div className="text-[10px] text-cod-gray">View your location</div>
          </div>
          <span className="text-cod-gray">{"\u2192"}</span>
        </a>
      </div>
    </section>
  );
}

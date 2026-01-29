"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";
import { WeatherCardSkeleton } from "@/components/ui/Skeleton";

export default function WeatherCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 30 * 60 * 1000, // 30 min
    retry: 1,
  });

  if (isLoading) return <WeatherCardSkeleton />;

  if (!data) {
    // Fallback static
    return <StaticWeather />;
  }

  return (
    <div className="rounded-sm border-l-4 border-cod-green glass-card p-4 text-center">
      <div className="flex items-center justify-center gap-1 text-[10px] text-cod-gray">
        {data.source === "live" && (
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
        )}
        {data.source === "live" ? "LIVE WEATHER" : "WEATHER (CACHED)"}
      </div>
      <div className="text-[28px] font-bold text-shadow-subtle">{data.temp}&deg;F</div>
      <div className="text-[10px] text-cod-gray">
        Feels {data.feelsLike}&deg; &bull; {data.description}
      </div>
      <div className="text-[10px] text-cod-gray">
        High {data.high}&deg; / Low {data.low}&deg; &bull; {data.rainChance}% rain
      </div>
      {data.hourly.length > 0 && (
        <div className="mt-2 border-t border-cod-dark2 pt-2">
          <div className="text-[9px] text-cod-gray">UPCOMING</div>
          <div className="mt-1 flex justify-center gap-3">
            {data.hourly.slice(0, 4).map((h, i) => (
              <div key={i} className="text-center">
                <div className="text-[9px] text-cod-gray">{h.time}</div>
                <div className="text-[12px] font-bold">{h.temp}&deg;</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-1.5 text-[11px] text-cod-yellow">
        {"\ud83e\udde5"} Bring jacket!
      </div>
    </div>
  );
}

function StaticWeather() {
  return (
    <div className="rounded-sm border-l-4 border-cod-green glass-card p-4 text-center">
      <div className="text-[10px] text-cod-gray">WEATHER</div>
      <div className="text-[28px] font-bold text-shadow-subtle">55&deg;F</div>
      <div className="text-[10px] text-cod-gray">Low 35&deg; &bull; 17% rain</div>
      <div className="mt-1.5 text-[11px] text-cod-yellow">
        {"\ud83e\udde5"} Bring jacket!
      </div>
    </div>
  );
}

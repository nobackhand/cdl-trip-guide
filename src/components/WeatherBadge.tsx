"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/api";

export default function WeatherBadge() {
  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes garbage collection
    retry: 1,
  });

  if (isLoading) {
    return <div className="text-[10px] text-cod-gray">...</div>;
  }

  const temp = data?.temp ?? 55;
  const desc = data?.description ?? "Clouds";

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-cod-gray">
      <span className="text-cod-lime font-bold">{temp}°F</span>
      <span className="text-cod-gray/70">•</span>
      <span>{desc}</span>
    </div>
  );
}

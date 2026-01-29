export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  high: number;
  low: number;
  rainChance: number;
  hourly: { time: string; temp: number; description: string }[];
  source: "live" | "fallback";
}

export interface UberEstimate {
  destination: string;
  lowEstimate: number;
  highEstimate: number;
  surgeMultiplier: number;
  duration: string;
  distance: string;
  deepLink: string;
}

export async function fetchWeather(): Promise<WeatherData> {
  const res = await fetch(`/api/weather?_t=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}

export async function fetchUberEstimates(
  coords?: { lat: number; lng: number }
): Promise<UberEstimate[]> {
  const url = coords
    ? `/api/uber?lat=${coords.lat}&lng=${coords.lng}`
    : "/api/uber";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Uber fetch failed");
  return res.json();
}

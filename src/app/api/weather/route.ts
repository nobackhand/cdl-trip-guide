import { NextResponse } from "next/server";

const DALLAS_COORDS = { lat: 32.8412, lon: -96.7837 };

// Demo fallback data when API key is not configured
const DEMO_DATA = {
  temp: 55,
  feelsLike: 52,
  description: "Clouds",
  icon: "04d",
  high: 55,
  low: 35,
  rainChance: 17,
  hourly: [],
  source: "demo" as const,
};

export async function GET() {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  // Return demo data if no API key (works without configuration)
  if (!API_KEY) {
    return NextResponse.json(DEMO_DATA);
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${DALLAS_COORDS.lat}&lon=${DALLAS_COORDS.lon}&appid=${API_KEY}&units=imperial`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`OpenWeather API error: ${res.status}`);
    }

    const data = await res.json();
    const current = data.list[0];

    // Extract hourly forecasts for the next 24h
    const hourly = data.list.slice(0, 8).map((item: Record<string, unknown>) => ({
      time: new Date((item.dt as number) * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/Chicago",
      }),
      temp: Math.round((item.main as Record<string, number>).temp),
      description: ((item.weather as Record<string, string>[])[0]).main,
    }));

    // Get daily high/low from forecast entries
    const temps = data.list.slice(0, 8).map((item: Record<string, unknown>) => (item.main as Record<string, number>).temp);
    const rainEntries = data.list.slice(0, 8).filter((item: Record<string, unknown>) => (item.pop as number) > 0);

    return NextResponse.json({
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      description: current.weather[0].main,
      icon: current.weather[0].icon,
      high: Math.round(Math.max(...temps)),
      low: Math.round(Math.min(...temps)),
      rainChance: rainEntries.length > 0
        ? Math.round(Math.max(...rainEntries.map((e: Record<string, unknown>) => (e.pop as number) * 100)))
        : 0,
      hourly,
      source: "live",
    });
  } catch (error) {
    console.error("Weather API error:", error instanceof Error ? error.message : error);
    // Fallback static data
    return NextResponse.json({
      temp: 55,
      feelsLike: 52,
      description: "Clouds",
      icon: "04d",
      high: 55,
      low: 35,
      rainChance: 17,
      hourly: [],
      source: "fallback",
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { calculateDistance } from "@/lib/utils";

// Pricing constants
const BASE_FARE = 2.5;
const PER_MILE_RATE = 1.5;
const PER_MINUTE_RATE = 0.2;
const MIN_FARE = 7;
const AVG_SPEED_MPH = 20;

const DESTINATIONS = [
  {
    destination: "Venue (Moody Coliseum)",
    baseLow: 8,
    baseHigh: 12,
    fallbackDuration: "6 min",
    fallbackDistance: "1.7 mi",
    lat: 32.8371,
    lng: -96.7832,
    dropoffAddress: "Moody Coliseum, Dallas, TX",
  },
  {
    destination: "Deep Ellum",
    baseLow: 12,
    baseHigh: 18,
    fallbackDuration: "12 min",
    fallbackDistance: "4 mi",
    lat: 32.7837,
    lng: -96.7844,
    dropoffAddress: "Deep Ellum, Dallas, TX",
  },
  {
    destination: "Pecan Lodge",
    baseLow: 10,
    baseHigh: 15,
    fallbackDuration: "10 min",
    fallbackDistance: "3.5 mi",
    lat: 32.7836,
    lng: -96.7853,
    dropoffAddress: "Pecan Lodge, Dallas, TX",
  },
];

function getSurgeMultiplier(hour: number): number {
  // Peak hours: after matches end (6-8pm), late night (11pm-2am)
  if (hour >= 18 && hour <= 20) return 1.5;
  if (hour >= 23 || hour <= 2) return 1.8;
  if (hour >= 16 && hour < 18) return 1.2;
  return 1.0;
}

function estimateDuration(miles: number): string {
  const minutes = Math.round((miles / AVG_SPEED_MPH) * 60);
  return `${minutes} min`;
}

function calculateFareRange(
  miles: number,
  surge: number
): { low: number; high: number } {
  const baseFare = BASE_FARE + miles * PER_MILE_RATE + (miles / AVG_SPEED_MPH) * 60 * PER_MINUTE_RATE;
  const low = Math.max(MIN_FARE, Math.round(baseFare * 0.85 * surge));
  const high = Math.max(MIN_FARE, Math.round(baseFare * 1.15 * surge));
  return { low, high };
}

function buildDeepLink(
  dropoffAddress: string,
  pickupCoords?: { lat: number; lng: number }
): string {
  const encodedDropoff = encodeURIComponent(dropoffAddress);
  const base = "https://m.uber.com/ul/?action=setPickup";

  if (pickupCoords) {
    return `${base}&pickup[latitude]=${pickupCoords.lat}&pickup[longitude]=${pickupCoords.lng}&dropoff[formatted_address]=${encodedDropoff}`;
  }
  return `${base}&pickup=my_location&dropoff[formatted_address]=${encodedDropoff}`;
}

export async function GET(request: NextRequest) {
  // Use Dallas local time
  const now = new Date();
  const dallasHour = parseInt(
    now.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "America/Chicago" })
  );

  const surge = getSurgeMultiplier(dallasHour);

  // Parse optional geolocation query params
  const { searchParams } = request.nextUrl;
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");

  const hasCoords =
    latStr !== null &&
    lngStr !== null &&
    !isNaN(Number(latStr)) &&
    !isNaN(Number(lngStr));

  const pickupCoords = hasCoords
    ? { lat: Number(latStr), lng: Number(lngStr) }
    : undefined;

  const estimates = DESTINATIONS.map((dest) => {
    if (pickupCoords) {
      const miles = calculateDistance(pickupCoords, { lat: dest.lat, lng: dest.lng });
      const fare = calculateFareRange(miles, surge);
      return {
        destination: dest.destination,
        lowEstimate: fare.low,
        highEstimate: fare.high,
        surgeMultiplier: surge,
        duration: estimateDuration(miles),
        distance: `${miles.toFixed(1)} mi`,
        deepLink: buildDeepLink(dest.dropoffAddress, pickupCoords),
      };
    }

    // Fallback: no coords — use hardcoded values
    return {
      destination: dest.destination,
      lowEstimate: Math.round(dest.baseLow * surge),
      highEstimate: Math.round(dest.baseHigh * surge),
      surgeMultiplier: surge,
      duration: dest.fallbackDuration,
      distance: dest.fallbackDistance,
      deepLink: buildDeepLink(dest.dropoffAddress),
    };
  });

  return NextResponse.json(estimates, {
    headers: { "Cache-Control": "public, s-maxage=300" }, // Cache 5 min
  });
}

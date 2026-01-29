import { calculateDistance } from "./utils";

// Pricing constants (synced with API)
export const BASE_FARE = 2.5;
export const PER_MILE_RATE = 1.5;
export const PER_MINUTE_RATE = 0.2;
export const MIN_FARE = 7;
export const AVG_SPEED_MPH = 20;

// Destination coordinates in Dallas area
export const DESTINATIONS = {
  moody: {
    name: "Moody Coliseum",
    icon: "🏟️",
    address: "3100 Dyer St, Dallas, TX 75205",
    lat: 32.8371,
    lng: -96.7832,
  },
  deepEllum: {
    name: "Deep Ellum",
    icon: "🎸",
    address: "2800 Main St, Dallas, TX 75226",
    lat: 32.7837,
    lng: -96.7814,
  },
  knoxHenderson: {
    name: "Knox-Henderson",
    icon: "🍺",
    address: "Knox St & Henderson Ave, Dallas, TX",
    lat: 32.8279,
    lng: -96.7891,
  },
} as const;

export type DestinationKey = keyof typeof DESTINATIONS;

export interface Coords {
  lat: number;
  lng: number;
}

export interface FareRange {
  low: number;
  high: number;
}

/**
 * Get surge multiplier based on Dallas local hour
 * Peak times: post-match (6-8pm), late night (11pm-2am)
 */
export function getSurgeMultiplier(hour: number): number {
  if (hour >= 18 && hour <= 20) return 1.5;
  if (hour >= 23 || hour <= 2) return 1.8;
  if (hour >= 16 && hour < 18) return 1.2;
  return 1.0;
}

/**
 * Get current Dallas hour (CST/CDT)
 */
export function getDallasHour(): number {
  const now = new Date();
  return parseInt(
    now.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "America/Chicago" })
  );
}

/**
 * Calculate fare range for a given distance and surge
 */
export function calculateFareRange(miles: number, surge: number): FareRange {
  const minutesDriving = (miles / AVG_SPEED_MPH) * 60;
  const baseFare = BASE_FARE + miles * PER_MILE_RATE + minutesDriving * PER_MINUTE_RATE;
  const low = Math.max(MIN_FARE, Math.round(baseFare * 0.85 * surge));
  const high = Math.max(MIN_FARE, Math.round(baseFare * 1.15 * surge));
  return { low, high };
}

/**
 * Estimate travel duration in minutes
 */
export function estimateDuration(miles: number): number {
  return Math.round((miles / AVG_SPEED_MPH) * 60);
}

/**
 * Build Uber deep link with optional pickup coordinates
 */
export function buildDeepLink(
  dropoffAddress: string,
  pickupCoords?: Coords
): string {
  const encodedDropoff = encodeURIComponent(dropoffAddress);
  const base = "https://m.uber.com/ul/?action=setPickup";

  if (pickupCoords) {
    return `${base}&pickup[latitude]=${pickupCoords.lat}&pickup[longitude]=${pickupCoords.lng}&dropoff[formatted_address]=${encodedDropoff}`;
  }
  return `${base}&pickup=my_location&dropoff[formatted_address]=${encodedDropoff}`;
}

export interface UberEstimate {
  key: string;
  icon: string;
  name: string;
  address: string;
  miles: number;
  duration: number;
  fareRange: FareRange;
  deepLink: string;
}

/**
 * Calculate estimates from a pickup location to all standard destinations
 */
export function calculateEstimates(pickupCoords: Coords, surge: number): UberEstimate[] {
  return Object.entries(DESTINATIONS).map(([key, dest]) => {
    const miles = calculateDistance(pickupCoords, { lat: dest.lat, lng: dest.lng });
    const fareRange = calculateFareRange(miles, surge);
    const duration = estimateDuration(miles);

    return {
      key,
      icon: dest.icon,
      name: dest.name,
      address: dest.address,
      miles: Math.round(miles * 10) / 10,
      duration,
      fareRange,
      deepLink: buildDeepLink(dest.address, pickupCoords),
    };
  });
}

/**
 * Calculate estimate from pickup to a custom destination (e.g., user's hotel)
 */
export function calculateSingleEstimate(
  pickupCoords: Coords,
  destination: { name: string; icon: string; address: string; lat: number; lng: number },
  surge: number
): UberEstimate {
  const miles = calculateDistance(pickupCoords, { lat: destination.lat, lng: destination.lng });
  const fareRange = calculateFareRange(miles, surge);
  const duration = estimateDuration(miles);

  return {
    key: "hotel",
    icon: destination.icon,
    name: destination.name,
    address: destination.address,
    miles: Math.round(miles * 10) / 10,
    duration,
    fareRange,
    deepLink: buildDeepLink(destination.address, pickupCoords),
  };
}

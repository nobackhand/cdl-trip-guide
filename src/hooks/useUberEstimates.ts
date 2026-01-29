"use client";

import { useMemo } from "react";
import { useGeolocation, GeoCoords } from "./useGeolocation";
import { useHotel } from "@/components/HotelProvider";
import {
  calculateEstimates,
  calculateSingleEstimate,
  getDallasHour,
  getSurgeMultiplier,
  DESTINATIONS,
  UberEstimate,
  buildDeepLink,
  calculateFareRange,
} from "@/lib/uber-pricing";

export type LocationSource = "gps" | "hotel" | "custom" | "default";

interface UseUberEstimatesResult {
  estimates: UberEstimate[];
  hotelEstimate: UberEstimate | null;
  locationSource: LocationSource;
  locationLoading: boolean;
  locationError: string | null;
  locationDenied: boolean; // GPS was explicitly denied
  surge: number;
}

// Default estimates when no location is available (from La Quinta Uptown area)
const DEFAULT_COORDS: GeoCoords = { lat: 32.8177, lng: -96.7873 };

export function useUberEstimates(): UseUberEstimatesResult {
  const { location, loading: gpsLoading, error: gpsError } = useGeolocation();
  const { selectedHotel, customCoords, customAddress, hasSelectedHotel } = useHotel();

  // Check if GPS was explicitly denied (error message contains "denied" or error code 1)
  const locationDenied = !gpsLoading && gpsError !== null &&
    (gpsError.toLowerCase().includes("denied") || gpsError.toLowerCase().includes("permission"));

  const result = useMemo(() => {
    const hour = getDallasHour();
    const surge = getSurgeMultiplier(hour);

    // Determine pickup location with priority: GPS > Custom Coords > Hotel > Default
    let pickupCoords: GeoCoords;
    let locationSource: LocationSource;

    if (location) {
      pickupCoords = location;
      locationSource = "gps";
    } else if (customCoords) {
      // User used "Use my location" or geocoded address for "Other" location
      pickupCoords = { lat: customCoords.lat, lng: customCoords.lng };
      locationSource = "custom";
    } else if (hasSelectedHotel && selectedHotel && selectedHotel.id !== "other" && selectedHotel.lat !== 0) {
      pickupCoords = { lat: selectedHotel.lat, lng: selectedHotel.lng };
      locationSource = "hotel";
    } else {
      pickupCoords = DEFAULT_COORDS;
      locationSource = "default";
    }

    // Calculate estimates to standard destinations
    const estimates = calculateEstimates(pickupCoords, surge);

    // Calculate "My Hotel" estimate if user has selected a known hotel
    // OR if they have custom coordinates (they can get back to venue from their location)
    let hotelEstimate: UberEstimate | null = null;

    if (hasSelectedHotel && selectedHotel && selectedHotel.id !== "other" && selectedHotel.lat !== 0) {
      // Known hotel selected - calculate estimate to get back there
      if (location) {
        // From current GPS location to hotel
        hotelEstimate = calculateSingleEstimate(
          location,
          {
            name: "My Hotel",
            icon: "🏨",
            address: selectedHotel.address,
            lat: selectedHotel.lat,
            lng: selectedHotel.lng,
          },
          surge
        );
      } else {
        // No GPS - from venue to hotel (common: getting home after event)
        const moodyCoords = { lat: DESTINATIONS.moody.lat, lng: DESTINATIONS.moody.lng };
        hotelEstimate = calculateSingleEstimate(
          moodyCoords,
          {
            name: location ? "My Hotel" : "Venue → My Hotel",
            icon: "🏨",
            address: selectedHotel.address,
            lat: selectedHotel.lat,
            lng: selectedHotel.lng,
          },
          surge
        );
      }
    } else if (customCoords) {
      // "Other" location with GPS coords - show "My Location" card (venue → their spot)
      const moodyCoords = { lat: DESTINATIONS.moody.lat, lng: DESTINATIONS.moody.lng };
      hotelEstimate = calculateSingleEstimate(
        moodyCoords,
        {
          name: "Venue → My Location",
          icon: "📍",
          address: customAddress || "My Current Location",
          lat: customCoords.lat,
          lng: customCoords.lng,
        },
        surge
      );
    }

    return {
      estimates,
      hotelEstimate,
      locationSource,
      surge,
    };
  }, [location, selectedHotel, customCoords, customAddress, hasSelectedHotel]);

  return {
    ...result,
    locationLoading: gpsLoading,
    locationError: gpsError,
    locationDenied,
  };
}

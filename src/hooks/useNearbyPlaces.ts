"use client";

import { useMemo } from "react";
import { useGeolocation, GeoCoords } from "./useGeolocation";
import { PlaceLocation } from "@/data/locations";
import { calculateDistance } from "@/lib/utils";

export interface NearbyPlace extends PlaceLocation {
  distance: number;
}

interface NearbyPlacesResult {
  nearby: NearbyPlace[];
  userLocation: GeoCoords | null;
  loading: boolean;
  error: string | null;
}

export function useNearbyPlaces(
  places: PlaceLocation[],
  maxDistance = 1 // miles
): NearbyPlacesResult {
  const { location, error, loading } = useGeolocation();

  const nearby = useMemo(() => {
    if (!location) return [];

    return places
      .map((place) => ({
        ...place,
        distance: calculateDistance(location, { lat: place.lat, lng: place.lng }),
      }))
      .filter((p) => p.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }, [location, places, maxDistance]);

  return { nearby, userLocation: location, loading, error };
}

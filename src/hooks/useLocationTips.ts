import { useMemo } from "react";
import { generateLocationTips, LocationAnalysis } from "@/lib/location-tips";
import { getSurgeMultiplier, getDallasHour } from "@/lib/uber-pricing";

interface UseLocationTipsParams {
  coords: { lat: number; lng: number } | null;
  locationName: string;
}

interface UseLocationTipsResult {
  analysis: LocationAnalysis | null;
}

/**
 * Hook to generate personalized location tips based on coordinates
 */
export function useLocationTips({
  coords,
  locationName,
}: UseLocationTipsParams): UseLocationTipsResult {
  const analysis = useMemo(() => {
    if (!coords) return null;

    // Get current surge multiplier for accurate estimates
    const surge = getSurgeMultiplier(getDallasHour());

    return generateLocationTips(coords, locationName, surge);
  }, [coords, locationName]);

  return { analysis };
}

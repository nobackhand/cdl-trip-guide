import { calculateDistance } from "./utils";
import { calculateFareRange, estimateDuration, FareRange } from "./uber-pricing";

// Extended POI definitions for Dallas
export const DALLAS_POIS = {
  venue: {
    name: "Moody Coliseum",
    lat: 32.8371,
    lng: -96.7832,
    type: "venue" as const,
  },
  knoxHenderson: {
    name: "Knox-Henderson",
    lat: 32.8279,
    lng: -96.7891,
    type: "nightlife" as const,
    description: "Best bars & restaurants",
  },
  deepEllum: {
    name: "Deep Ellum",
    lat: 32.7837,
    lng: -96.7814,
    type: "nightlife" as const,
    description: "Live music & dive bars",
  },
  uptown: {
    name: "Uptown Dallas",
    lat: 32.802,
    lng: -96.8005,
    type: "neighborhood" as const,
  },
  downtown: {
    name: "Downtown Dallas",
    lat: 32.7767,
    lng: -96.797,
    type: "neighborhood" as const,
  },
  dfw: {
    name: "DFW Airport",
    lat: 32.8998,
    lng: -97.0403,
    type: "airport" as const,
  },
  loveField: {
    name: "Love Field",
    lat: 32.8481,
    lng: -96.8512,
    type: "airport" as const,
  },
} as const;

// Distance thresholds in miles
export const DISTANCE_THRESHOLDS = {
  walkable: 0.5,
  shortUber: 2.0,
  mediumUber: 5.0,
  farUber: 10.0,
};

export interface DistanceInfo {
  miles: number;
  uberCost: FareRange;
  duration: number;
}

export interface GeneratedTip {
  icon: string;
  text: string;
  priority: number; // 1 = highest priority
}

export interface AllDistances {
  venue: DistanceInfo;
  knoxHenderson: DistanceInfo;
  deepEllum: DistanceInfo;
  uptown: DistanceInfo;
  downtown: DistanceInfo;
  dfw: DistanceInfo;
  loveField: DistanceInfo;
}

export interface LocationAnalysis {
  coordinates: { lat: number; lng: number };
  locationName: string;
  neighborhood: string | null;
  distances: AllDistances;
  tips: GeneratedTip[];
  proTip: string;
}

/**
 * Calculate distance info from user coords to a POI
 */
function getDistanceInfo(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
  surge: number = 1.0
): DistanceInfo {
  const miles = Math.round(calculateDistance(from, to) * 10) / 10;
  const uberCost = calculateFareRange(miles, surge);
  const duration = estimateDuration(miles);
  return { miles, uberCost, duration };
}

/**
 * Calculate distances to all POIs from user location
 */
function calculateAllDistances(
  coords: { lat: number; lng: number },
  surge: number = 1.0
): AllDistances {
  return {
    venue: getDistanceInfo(coords, DALLAS_POIS.venue, surge),
    knoxHenderson: getDistanceInfo(coords, DALLAS_POIS.knoxHenderson, surge),
    deepEllum: getDistanceInfo(coords, DALLAS_POIS.deepEllum, surge),
    uptown: getDistanceInfo(coords, DALLAS_POIS.uptown, surge),
    downtown: getDistanceInfo(coords, DALLAS_POIS.downtown, surge),
    dfw: getDistanceInfo(coords, DALLAS_POIS.dfw, surge),
    loveField: getDistanceInfo(coords, DALLAS_POIS.loveField, surge),
  };
}

/**
 * Detect which neighborhood the user is likely in based on proximity
 */
function detectNeighborhood(
  coords: { lat: number; lng: number },
  distances: AllDistances
): string | null {
  // Check if user is within key areas (within ~0.5mi)
  if (distances.knoxHenderson.miles <= 0.5) return "Knox-Henderson";
  if (distances.deepEllum.miles <= 0.5) return "Deep Ellum";
  if (distances.uptown.miles <= 0.8) return "Uptown";
  if (distances.downtown.miles <= 0.6) return "Downtown";

  // Check SMU area (close to venue)
  if (distances.venue.miles <= 0.8) return "SMU Area";

  // Check broader areas
  if (distances.uptown.miles <= 1.5) return "Near Uptown";
  if (distances.knoxHenderson.miles <= 1.0) return "Near Knox";

  return null;
}

/**
 * Generate venue distance tip
 */
function getVenueTip(d: DistanceInfo): GeneratedTip {
  if (d.miles <= 0.5) {
    return {
      icon: "\u{1F6B6}",
      text: `Walking distance to venue! Just ${d.miles} mi`,
      priority: 1,
    };
  }
  if (d.miles <= DISTANCE_THRESHOLDS.shortUber) {
    return {
      icon: "\u2713",
      text: `${d.miles} mi from Moody Coliseum (~$${d.uberCost.low} Uber, ${d.duration} min)`,
      priority: 1,
    };
  }
  if (d.miles <= DISTANCE_THRESHOLDS.mediumUber) {
    return {
      icon: "\u{1F697}",
      text: `${d.miles} mi from venue (~$${d.uberCost.low}-${d.uberCost.high} Uber, ${d.duration} min)`,
      priority: 1,
    };
  }
  return {
    icon: "\u{1F4CD}",
    text: `${d.miles} mi from venue - plan ${d.duration}+ min for Uber ($${d.uberCost.low}-${d.uberCost.high})`,
    priority: 1,
  };
}

/**
 * Generate nightlife proximity tip
 */
function getNightlifeTip(
  knoxDist: DistanceInfo,
  deepEllumDist: DistanceInfo
): GeneratedTip {
  const isKnoxCloser = knoxDist.miles < deepEllumDist.miles;
  const nearestBar = isKnoxCloser ? "Knox-Henderson" : "Deep Ellum";
  const nearestDist = isKnoxCloser ? knoxDist : deepEllumDist;
  const otherBar = isKnoxCloser ? "Deep Ellum" : "Knox-Henderson";
  const otherDist = isKnoxCloser ? deepEllumDist : knoxDist;

  if (nearestDist.miles <= 0.3) {
    return {
      icon: "\u{1F37A}",
      text: `You're IN ${nearestBar}! Walk to 20+ bars`,
      priority: 2,
    };
  }
  if (nearestDist.miles <= 0.6) {
    return {
      icon: "\u{1F6B6}",
      text: `Walk to ${nearestBar} nightlife (${nearestDist.miles} mi)`,
      priority: 2,
    };
  }
  if (nearestDist.miles <= DISTANCE_THRESHOLDS.shortUber) {
    return {
      icon: "\u{1F37A}",
      text: `${nearestBar} is ${nearestDist.miles} mi away (~$${nearestDist.uberCost.low} Uber)`,
      priority: 3,
    };
  }
  // Both areas are further away
  return {
    icon: "\u{1F697}",
    text: `Nightlife requires Uber - Knox (${knoxDist.miles} mi) or Deep Ellum (${deepEllumDist.miles} mi)`,
    priority: 3,
  };
}

/**
 * Generate second nightlife option tip if relevant
 */
function getSecondNightlifeTip(
  knoxDist: DistanceInfo,
  deepEllumDist: DistanceInfo
): GeneratedTip | null {
  const isKnoxCloser = knoxDist.miles < deepEllumDist.miles;
  const otherBar = isKnoxCloser ? "Deep Ellum" : "Knox-Henderson";
  const otherDist = isKnoxCloser ? deepEllumDist : knoxDist;

  // Only show if the second option is reasonably close
  if (otherDist.miles <= DISTANCE_THRESHOLDS.mediumUber) {
    return {
      icon: "\u{1F3B8}",
      text: `${otherBar} is ${otherDist.miles} mi away (~$${otherDist.uberCost.low} Uber)`,
      priority: 4,
    };
  }
  return null;
}

/**
 * Generate transport/parking tip
 */
function getTransportTip(
  venueDist: DistanceInfo,
  neighborhood: string | null
): GeneratedTip {
  if (venueDist.miles <= 1.0) {
    return {
      icon: "\u{1F17F}\uFE0F",
      text: "Close enough to consider SMU parking ($20/day)",
      priority: 4,
    };
  }
  if (neighborhood === "Deep Ellum" || neighborhood === "Downtown") {
    return {
      icon: "\u{1F697}",
      text: "Limited street parking - Uber strongly recommended",
      priority: 4,
    };
  }
  return {
    icon: "\u{1F4A1}",
    text: "Uber to venue recommended - parking at SMU fills up",
    priority: 4,
  };
}

/**
 * Generate airport tip if relevant
 */
function getAirportTip(
  dfwDist: DistanceInfo,
  loveFieldDist: DistanceInfo
): GeneratedTip | null {
  const closerAirport = dfwDist.miles < loveFieldDist.miles ? "DFW" : "Love Field";
  const closerDist = dfwDist.miles < loveFieldDist.miles ? dfwDist : loveFieldDist;

  // Only show airport tip if it's relevant (within reasonable distance)
  if (closerDist.miles <= 20) {
    return {
      icon: "\u2708\uFE0F",
      text: `${closerAirport} Airport: ${closerDist.miles} mi (~$${closerDist.uberCost.low}-${closerDist.uberCost.high} Uber)`,
      priority: 5,
    };
  }
  return null;
}

/**
 * Generate all contextual tips
 */
function generateTips(
  distances: AllDistances,
  neighborhood: string | null
): GeneratedTip[] {
  const tips: GeneratedTip[] = [];

  // Always add venue tip (highest priority)
  tips.push(getVenueTip(distances.venue));

  // Nightlife tips
  tips.push(getNightlifeTip(distances.knoxHenderson, distances.deepEllum));

  const secondNightlife = getSecondNightlifeTip(
    distances.knoxHenderson,
    distances.deepEllum
  );
  if (secondNightlife) {
    tips.push(secondNightlife);
  }

  // Transport tip
  tips.push(getTransportTip(distances.venue, neighborhood));

  // Airport tip (optional)
  const airportTip = getAirportTip(distances.dfw, distances.loveField);
  if (airportTip) {
    tips.push(airportTip);
  }

  return tips.sort((a, b) => a.priority - b.priority);
}

/**
 * Generate personalized pro tip based on location
 */
function generateProTip(
  distances: AllDistances,
  neighborhood: string | null
): string {
  // Knox-Henderson sweet spot
  if (
    distances.knoxHenderson.miles <= 0.5 &&
    distances.venue.miles <= 2.5
  ) {
    return "You're in the sweet spot! Walk to Knox bars after matches, quick Uber to venue. Perfect location.";
  }

  // Deep Ellum party zone
  if (distances.deepEllum.miles <= 0.5) {
    return "You picked party central! Walk everywhere at night, Uber to day matches. Expect surge pricing after 11pm.";
  }

  // Very close to venue
  if (distances.venue.miles <= 1.0) {
    return "Super close to venue! Consider walking to matches. Knox-Henderson is your best bet for post-match food & drinks.";
  }

  // Uptown balanced
  if (neighborhood === "Uptown" || neighborhood === "Near Uptown") {
    return "Great central location! Quick Uber to venue, easy access to both Knox-Henderson and Deep Ellum nightlife.";
  }

  // Near Knox
  if (neighborhood === "Near Knox" || distances.knoxHenderson.miles <= 1.5) {
    return "Solid choice near Knox! Walk to great restaurants, short Uber to matches. This is where most CDL fans hang.";
  }

  // SMU Area
  if (neighborhood === "SMU Area") {
    return "You're in the action! Walk to venue, quick ride to Knox-Henderson for nightlife. College town vibes.";
  }

  // Far out
  if (distances.venue.miles >= 5.0) {
    return `You're ${distances.venue.miles} mi out - budget extra time and $${distances.venue.uberCost.low}-${distances.venue.uberCost.high} per Uber. Consider carpooling with other fans!`;
  }

  // Default
  return `${distances.venue.duration} min Uber to venue. Check Knox-Henderson for the best post-match scene!`;
}

/**
 * Main function: Generate complete location analysis with personalized tips
 */
export function generateLocationTips(
  coords: { lat: number; lng: number },
  locationName: string,
  surge: number = 1.0
): LocationAnalysis {
  // Calculate all distances
  const distances = calculateAllDistances(coords, surge);

  // Detect neighborhood
  const neighborhood = detectNeighborhood(coords, distances);

  // Generate tips
  const tips = generateTips(distances, neighborhood);

  // Generate pro tip
  const proTip = generateProTip(distances, neighborhood);

  return {
    coordinates: coords,
    locationName,
    neighborhood,
    distances,
    tips,
    proTip,
  };
}
